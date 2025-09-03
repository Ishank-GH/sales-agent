import { getAttendeeById, getOrCreateAttendeeForWebinar } from "@/actions/attendance";
import { getWebinarById } from "@/actions/webinar";
import { CallStatusEnum, WebinarStatusEnum } from "@/generated/prisma";
import { WebinarWithPresenter } from "@/lib/type";
import { redirect } from "next/navigation";
import React from "react";
import AutoConnectCall from "./_components/AutoConnectCall";

type Props = {
  params: Promise<{ liveWebinarId: string }>;
  searchParams: Promise<{ attendeeId: string }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { liveWebinarId } = await params;
  const { attendeeId } = await searchParams;

  if (!liveWebinarId) {
    redirect("/404");
  }

  let attendance;

  // If attendeeId supplied, try to fetch; otherwise attempt to get or create one
  if (attendeeId) {
    attendance = await getAttendeeById(attendeeId, liveWebinarId);
  }

  if (!attendance || !attendance.data) {
    // Try to create or get a guest attendee for this webinar
    const created = await getOrCreateAttendeeForWebinar(liveWebinarId, {});
    if (!created || !created.data) {
      redirect(`/live-webinar/${liveWebinarId}?error=attendee-not-found`);
    }

    // Redirect to same page with attendeeId set so client components can use it
    const newAttendeeId = created.data.attendeeId || created.data.user?.id || created.data.user?.id || created.data.user?.id;
    if (!newAttendeeId) {
      redirect(`/live-webinar/${liveWebinarId}?error=attendee-not-found`);
    }

    return redirect(
      `/live-webinar/${liveWebinarId}/call?attendeeId=${newAttendeeId}`
    );
  }

  const webinar = await getWebinarById(liveWebinarId);
  if (!webinar) {
    redirect("/404");
  }
  if (
    webinar.webinarStatus === WebinarStatusEnum.WAITING_ROOM ||
    webinar.webinarStatus === WebinarStatusEnum.SCHEDULED
  ) {
    redirect(`/live-webinar/${liveWebinarId}?error=webinar-not-started`);
  }
  if (
    webinar.ctaType !== "BOOK_A_CALL" ||
    !webinar.aiAgentId
  ) {
    redirect(`/live-webinar/${liveWebinarId}?error=cannot-book-a-call`);
  }

  if (attendance.data && attendance.data.user.callStatus === CallStatusEnum.COMPLETED) {
    redirect(`/live-webinar/${liveWebinarId}?error=call-not-pending`);
  }

  return(
    <AutoConnectCall
      userName={attendance.data.user.name}
      assistantId={webinar.aiAgentId}
      webinar={webinar as WebinarWithPresenter}
      userId={attendeeId}
    />
  );
};

export default page;
