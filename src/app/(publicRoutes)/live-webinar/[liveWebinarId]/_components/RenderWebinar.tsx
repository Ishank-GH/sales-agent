"use client";
import { User, Webinar, WebinarStatusEnum } from "@/generated/prisma";
import React, { useEffect } from "react";
import WebinarUpcomingState from "./UpcomingWebinar/WebinarUpcomingState";
import { usePathname, useRouter } from "next/navigation";
import { useAttendeeStore } from "@/store/useAttendeeStore";
import { toast } from "sonner";
import LiveStreamState from "./LiveWebinar/LiveStreamState";
import Participant from "./Participant/Participant";

type Props = {
  error: string | undefined;
  user: User | null;
  webinar: Webinar;
  apiKey: string;
  token: string;
  callId: string;
};

const RenderWebinar = ({
  error,
  user,
  webinar,
  apiKey,
  token,
  callId,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { attendee } = useAttendeeStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.push(pathname);
    }
  }, [error]);

  return (
    // TODO: build Waiting room and live
    <React.Fragment>
      {webinar.webinarStatus === WebinarStatusEnum.SCHEDULED ? (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null} />
      ) : webinar.webinarStatus === WebinarStatusEnum.WAITING_ROOM ? (
        <WebinarUpcomingState webinar={webinar} currentUser={user || null} />
      ) : webinar.webinarStatus === WebinarStatusEnum.LIVE ? (
        //TODO: Add Livestream component and webinar

        <React.Fragment>
          {user?.id === webinar.presenterId ? (
            <LiveStreamState apikey={apiKey} token={token} callId={callId} webinar={webinar} user={user}/>
          ) : //TODO:  Only show the participant view if they've registered
          attendee ? (
            <Participant apikey={apiKey} webinar={webinar} callId={callId} />
          ) : (
            <WebinarUpcomingState
              webinar={webinar}
              currentUser={user || null}
            />
          )}
        </React.Fragment>
      ) : webinar.webinarStatus === WebinarStatusEnum.CANCELLED ? (
        <div className="flex justify-center items-center h-full w-full">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-primary">
              {webinar?.title}
            </h3>
            <p className="text-muted-foreground text-xs">
              This webinar has been cancelled.
            </p>
          </div>
        </div>
      ) : (
         <WebinarUpcomingState
              webinar={webinar}
              currentUser={user || null}
            />
      )}
    </React.Fragment>
  );
};

export default RenderWebinar;
