"use server";

import { WebinarFormState } from "@/store/useWebinarStore";
import { onAuthenticateUser } from "./auth";
import { prismaClient } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { WebinarStatusEnum } from "@/generated/prisma";

export const createWebinar = async (formData: WebinarFormState) => {
  try {
    const user = await onAuthenticateUser();
    if (!user.user) {
      return { status: 401, message: "Unauthorized" };
    }

    const presenterId = user.user.id;

    if (!formData.basicInfo.webinarName) {
      return { status: 404, message: "Webinar name is required" };
    }

    // CHANGED: We now expect a single dateTimeISO string from the client.
    if (!formData.basicInfo.dateTimeISO) {
      return { status: 404, message: "Webinar date and time are required" };
    }

    // CHANGED: Create a Date object directly from the universal ISO string.
    const combinedDateTime = new Date(formData.basicInfo.dateTimeISO);
    const now = new Date(); // The current time on the server (in UTC).
    
    if (combinedDateTime < now) {
      return {
        status: 400,
        message: "Webinar date and time cannot be in the past",
      };
    }

    const webinar = await prismaClient.webinar.create({
      data: {
        title: formData.basicInfo.webinarName,
        description: formData.basicInfo.description || "",
        startTime: combinedDateTime, // This is now a correct UTC-aware date.
        tags: formData.cta.tags || [],
        ctaLabel: formData.cta.ctaLabel,
        ctaType: formData.cta.ctaType,
        aiAgentId: formData.cta.aiAgent || null,
        priceId: null,
        lockChat: formData.additionalInfo.lockChat || false,
        couponCode: formData.additionalInfo.couponEnabled
          ? formData.additionalInfo.couponCode
          : null,
        couponEnabled: formData.additionalInfo.couponEnabled || false,
        presenterId: presenterId,
      },
    });

    // Automatically add creator as attendee and attendance
    let attendee = await prismaClient.attendee.findUnique({
      where: { email: user.user.email },
    });
    if (!attendee) {
      attendee = await prismaClient.attendee.create({
        data: { email: user.user.email, name: user.user.name },
      });
    }
    await prismaClient.attendance.create({
      data: {
        attendedType: "REGISTERED",
        attendeeId: attendee.id,
        webinarId: webinar.id,
      },
    });

    revalidatePath("/");
    return {
      status: 200,
      message: "Webinar created successfully",
      webinarId: webinar.id,
      webinarLink: `/webinar/${webinar.id}`,
    };
  } catch (error) {
    console.error("Error creating webinar:", error);
    return {
      status: 500,
      message: "Failed to create webinar. Please try again.",
    };
  }
};

export const getWebinarByPresenterId = async (
  presenterId: string,
  webinarStatus?: string
) => {
  try {
    let statusFilter: WebinarStatusEnum | undefined;
    switch (webinarStatus) {
      case "upcoming":
        statusFilter = WebinarStatusEnum.SCHEDULED;
        break;
      case "ended":
        statusFilter = WebinarStatusEnum.ENDED;
        break;
      default:
        statusFilter = undefined;
    }
    const webinars = await prismaClient.webinar.findMany({
      where: { presenterId, webinarStatus: statusFilter },
      include: {
        presenter: {
          select: {
            name: true,
            stripeConnectId: true,
            id: true,
          },
        },
      },
    });

    return webinars;
  } catch (error) {
    console.error("Error getting webinars:", error);
    return [];
  }
};

export const getWebinarById = async (webinarId: string) => {
  try {
    const webinar = await prismaClient.webinar.findUnique({
      where: { id: webinarId },
      include: {
        presenter: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
      },
    });
    return webinar;
  } catch (error) {
    console.error("Error fetching webinar:", error);
    throw new Error("Failed to fetch webinar");
  }
};

export const changeWebinarStatus = async (
  webinarId: string,
  status: WebinarStatusEnum
) => {
  try {
    const webinar = await prismaClient.webinar.update({
      where: {
        id: webinarId,
      },
      data: {
        webinarStatus: status,
      },
    });
    return {
      status: 200,
      success: true,
      message: "Webinar status updated successfully",
      data: webinar,
    };
  } catch (error) {
    console.error("Error updating webinar status:", error);
    return {
      status: 500,
      success: false,
      message: "Failed to update webinar status. Please try again.",
    };
  }
};
