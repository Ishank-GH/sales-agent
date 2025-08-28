import {
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
} from "@stream-io/video-react-sdk";
import { User } from "@/generated/prisma";
import { WebinarWithPresenter } from "@/lib/type";
import React, { useState } from "react";
import CustomLiveStreamPlayer from "./CustomLiveStreamPlayer";

type Props = {
  apiKey: string;
  callId: string;
  webinar: WebinarWithPresenter;
  user: User;
};

const hostUser: StreamUser = { id: process.env.NEXT_PUBLIC_STREAM_USER_ID! };

const LiveStreamState = ({ apiKey, token, callId, webinar, user }: Props) => {

  const [hostToken, setHostToken] = useState<string | null>(null)
  const client = new StreamVideoClient({ apiKey, user: hostUser, token });

  return (
    <StreamVideo client={client}>
      <CustomLiveStreamPlayer
        callId={callId}
        callType="livestream"
        webinar={webinar}
        username={user.name}
        token={token}
      />
    </StreamVideo>
  );
};

export default LiveStreamState;
