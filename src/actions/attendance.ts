"use server";

import {
  AttendedTypeEnum,
  CallStatusEnum,
  CtaTypeEnum,
} from "@/generated/prisma";
import { prismaClient } from "@/lib/prismaClient";
import { AttendanceData } from "@/lib/type";
import { revalidatePath } from "next/cache";

export const getWebinarAttendance = async (
  webinarId: string,
  options: {
    includeUsers?: boolean;
    userLimit?: number;
  } = { includeUsers: true, userLimit: 100 }
) => {
  try {
    const webinar = await prismaClient.webinar.findUnique({
      where: { id: webinarId },
      select: {
        id: true,
        ctaType: true,
        tags: true,
        presenter: true,
        _count: {
          select: {
            attendances: true,
          },
        },
      },
    });

    if (!webinar) {
      return {
        success: false,
        status: 404,
        error: "Webinar not found",
      };
    }

    const attendanceCounts = await prismaClient.attendance.groupBy({
      by: ["attendedType"],
      where: {
        webinarId,
      },
      _count: {
        attendedType: true,
      },
    });

    const result: Record<AttendedTypeEnum, AttendanceData> = {} as Record<
      AttendedTypeEnum,
      AttendanceData
    >;

    for (const type of Object.values(AttendedTypeEnum)) {
      if (
        type === AttendedTypeEnum.ADDED_TO_CART &&
        webinar.ctaType === CtaTypeEnum.BOOK_A_CALL
      )
        continue;

      if (
        type === AttendedTypeEnum.BREAKOUT_ROOM &&
        webinar.ctaType !== CtaTypeEnum.BOOK_A_CALL
      )
        continue;

      const countItem = attendanceCounts.find((item) => {
        if (
          webinar.ctaType === CtaTypeEnum.BOOK_A_CALL &&
          type == AttendedTypeEnum.BREAKOUT_ROOM &&
          item.attendedType === AttendedTypeEnum.ADDED_TO_CART
        ) {
          return true;
        }
        return item.attendedType === type;
      });
      result[type] = {
        count: countItem ? countItem._count.attendedType : 0,
        users: [],
      };

      if (options.includeUsers) {
        for (const type of Object.values(AttendedTypeEnum)) {
          if (
            (type === AttendedTypeEnum.ADDED_TO_CART &&
              webinar.ctaType === CtaTypeEnum.BOOK_A_CALL) ||
            (type === AttendedTypeEnum.BREAKOUT_ROOM &&
              webinar.ctaType !== CtaTypeEnum.BOOK_A_CALL)
          ) {
            continue;
          }
          const queryType =
            webinar.ctaType === CtaTypeEnum.BOOK_A_CALL &&
            type == AttendedTypeEnum.BREAKOUT_ROOM
              ? AttendedTypeEnum.ADDED_TO_CART
              : type;

          if (result[type] && result[type].count > 0) {
            const attendances = await prismaClient.attendance.findMany({
              where: {
                webinarId,
                attendedType: queryType,
              },
              include: {
                user: true,
              },
              take: options.userLimit, // limit the number of users returned
              orderBy: {
                joinedAt: "desc", // Most recent first
              },
            });

            result[type].users = attendances.map((attendance) => ({
              id: attendance.user.id,
              name: attendance.user.name,
              email: attendance.user.email,
              createdAt: attendance.user.createdAt,
              updatedAt: attendance.user.updatedAt,
              callStatus: attendance.user.callStatus,
            }));
          }
        }
      }
    }
    return {
      success: true,
      data: result,
      ctaType: webinar.ctaType,
      webinarTags: webinar.tags || [],
      presenter: webinar.presenter,
    };
  } catch (error) {
    console.error("Failed to fetch attendance data:", error);
    return {
      success: false,
      error: "Failed to fetch attendance data",
    };
  }
};

export const registerAttendee = async ({
  webinarId,
  email,
  name,
}: {
  webinarId: string;
  email: string;
  name: string;
}) => {
  try {
    if (!webinarId || !email) {
      return {
        success: false,
        status: 400,
        message: "Missing required parameters",
      };
    }
    const webinar = await prismaClient.webinar.findUnique({
      where: { id: webinarId },
    });
    if (!webinar) {
      return { success: false, status: 404, message: "Webinar not found" };
    }

    // Find or create the attendee by email
    let attendee = await prismaClient.attendee.findUnique({
      where: { email },
    });

    if (!attendee) {
      try {
        attendee = await prismaClient.attendee.create({
          data: { email, name },
        });
      } catch (err) {
        console.error("Failed to create attendee:", err);
        throw new Error("Failed to create attendee");
      }
    }

    // Check for existing attendance
    let existingAttendance;
    try {
      existingAttendance = await prismaClient.attendance.findFirst({
        where: {
          attendeeId: attendee.id,
          webinarId: webinarId,
        },
        include: {
          user: true,
        },
      });
    } catch (err) {
      console.error("Failed to query attendance:", err);
      throw new Error("Failed to query attendance");
    }

    if (existingAttendance) {
      return {
        success: true,
        status: 200,
        data: existingAttendance,
        message: "You are already registered for this webinar",
      };
    }

    // Create attendance record
    let attendance;
    try {
      attendance = await prismaClient.attendance.create({
        data: {
          attendedType: AttendedTypeEnum.REGISTERED,
          attendeeId: attendee.id,
          webinarId: webinarId,
        },
        include: {
          user: true,
        },
      });
    } catch (err) {
      console.error("Failed to create attendance:", err);
      throw new Error("Failed to create attendance record");
    }

    revalidatePath(`/${webinarId}`);

    return {
      success: true,
      status: 200,
      data: attendance,
      message: "Successfully Registered",
    };
  } catch (error) {
    console.error("Registration error", error);
    return {
      success: false,
      status: 500,
      error: error,
      message: "Something went wrong",
    };
  }
};

export const changeAttendanceType = async (
  attendeeId: string,
  webinarId: string,
  attendedType: AttendedTypeEnum
) => {
  try {
    const attendance = await prismaClient.attendance.update({
      where: {
        attendeeId_webinarId: {
          attendeeId,
          webinarId,
        },
      },
      data: {
        attendedType,
      },
    });
    return {
      sucess: true,
      status: 200,
      message: "Attendance type updated successfully",
      data: attendance,
    };
  } catch (error) {
    console.error("Error updating attendance type: ", error);
    return {
      success: false,
      status: 500,
      message: "Failed to update attendance type",
      error,
    };
  }
};

export const getAttendeeById = async (id: string, webinarId: string) => {
  try {
    const attendance = await prismaClient.attendance.findFirst({
      where: {
        attendeeId: id,
        webinarId: webinarId,
      },
      include: {
        user: true,
      },
    });

    if (!attendance) {
      return {
        status: 404,
        success: false,
        message: "Attendee not found",
      };
    }
    return {
      status: 200,
      success: true,
      message: "Get attendee details successful",
      data: attendance,
    };
  } catch (error) {
    console.error("Error", error);
    return {
      status: 500,
      success: false,
      message: "Something went wrong",
    };
  }
};

export const changeCallStatus = async (
  attendeeId: string,
  callStatus: CallStatusEnum
) => {
  try {
    const attendee = await prismaClient.attendee.update({
      where: {
        id: attendeeId,
      },
      data: {
        callStatus: callStatus,
      },
    });

    return {
      success: true,
      status: 200,
      message: "Call status updated successfully",
      data: attendee,
    };
  } catch (error) {
    console.error("Error updating call status:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to update call status",
      error,
    };
  }
};

export const getOrCreateAttendeeForWebinar = async (
  webinarId: string,
  options?: { attendeeId?: string; email?: string; name?: string }
) => {
  try {
    if (!webinarId) {
      return { success: false, status: 400, message: "Missing webinarId" };
    }

    const webinar = await prismaClient.webinar.findUnique({
      where: { id: webinarId },
    });
    if (!webinar) {
      return { success: false, status: 404, message: "Webinar not found" };
    }

    // If an attendeeId was supplied, prefer it.
    if (options?.attendeeId) {
      // Check if attendance exists for that attendee
      const existingAttendance = await prismaClient.attendance.findFirst({
        where: { attendeeId: options.attendeeId, webinarId },
        include: { user: true },
      });
      if (existingAttendance) {
        return { success: true, status: 200, data: existingAttendance };
      }

      // If attendee exists but has no attendance record, create one
      const existingAttendee = await prismaClient.attendee.findUnique({
        where: { id: options.attendeeId },
      });
      if (existingAttendee) {
        const attendance = await prismaClient.attendance.create({
          data: {
            attendedType: AttendedTypeEnum.REGISTERED,
            attendeeId: existingAttendee.id,
            webinarId,
          },
          include: { user: true },
        });
        return { success: true, status: 200, data: attendance };
      }
      // Fall through to create a new attendee if attendeeId provided but not found
    }

    // Create a guest attendee with a unique email if none supplied
    const guestEmail =
      options?.email || `guest+${webinarId}-${Date.now()}@example.com`;
    const guestName = options?.name || "Guest";
    const attendee = await prismaClient.attendee.create({
      data: { email: guestEmail, name: guestName },
    });

    const attendance = await prismaClient.attendance.create({
      data: {
        attendedType: AttendedTypeEnum.REGISTERED,
        attendeeId: attendee.id,
        webinarId,
      },
      include: { user: true },
    });

    return { success: true, status: 200, data: attendance };
  } catch (error) {
    console.error("getOrCreateAttendeeForWebinar error:", error);
    return { success: false, status: 500, message: "Internal server error" };
  }
};
