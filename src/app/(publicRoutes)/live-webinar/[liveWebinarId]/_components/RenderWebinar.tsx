"use client";
import { User, WebinarStatusEnum } from "@/generated/prisma";
import React, { useEffect } from "react";
import WebinarUpcomingState from "./UpcomingWebinar/WebinarUpcomingState";
import { usePathname, useRouter } from "next/navigation";
import { useAttendeeStore } from "@/store/useAttendeeStore";
import { toast } from "sonner";
import LiveStreamState from "./LiveWebinar/LiveStreamState";
import Participant from "./Participant/Participant";
import { StreamCallRecording, WebinarWithPresenter } from "@/lib/type";

type Props = {
  error: string | undefined;
  user: User | null;
  webinar: WebinarWithPresenter;
  apiKey: string;
  recording?: StreamCallRecording | null;
};

const RenderWebinar = ({ error, user, webinar, apiKey, recording }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { attendee } = useAttendeeStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.push(pathname);
    }
  }, [error, pathname, router]);

  return (
    <React.Fragment>
      {webinar.webinarStatus === WebinarStatusEnum.LIVE ? (
        <React.Fragment>
          {user?.id === webinar.presenterId ? (
            <LiveStreamState
              apiKey={apiKey}
              webinar={webinar}
              callId={webinar.id}
              user={user}
            />
          ) : attendee ? (
            <Participant
              apiKey={apiKey}
              webinar={webinar}
              callId={webinar.id}
            />
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
      ) : webinar.webinarStatus === WebinarStatusEnum.ENDED ? (
        recording?.url ? (
          'This is the video'
          // <video
          //   className="w-full h-full rounded-lg"
          //   controls
          //   src={recording?.url}
          // />
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <div className="text-center space-y-4">
              <h3 className="text-4xl font-semibold text-primary">
                {webinar?.title}
              </h3>
              <p className="text-muted-foreground text-x1">
                This webinar has ended. No recording is available.
              </p>
            </div>
          </div>
        )
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
