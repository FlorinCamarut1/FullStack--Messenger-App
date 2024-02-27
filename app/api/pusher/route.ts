import { NextApiRequest, NextApiResponse } from "next";

import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export default async function POST(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session = await auth(request, response);

  if (!session?.user?.email) {
    return response.status(401);
  }

  const socketId = request.body.socketId;
  const channel = request.body.chanelName;
  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(
    socketId as string,
    channel as string,
    data,
  );
  return response.send(authResponse);
}
