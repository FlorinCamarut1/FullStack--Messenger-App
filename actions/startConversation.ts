"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export const startConversation = async (body: {
  userId?: string;
  isGroup?: boolean;
  members?: Record<string, any>;
  name?: string;
}) => {
  try {
    const session = await auth();
    const currentUser = session?.user;

    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return { error: "Unauthorized!" };
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return { error: "Invalid data!" };
    }
    /**
     * for group chat
     */
    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members?.map((member: { value: string }) => ({
                id: member.value,
              })),
              { id: currentUser.id },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      const pusherConversation = newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return pusherConversation;
    }
    /**
     * for single conversation
     */
    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId as string],
            },
          },
          {
            userIds: {
              equals: [userId as string, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return singleConversation;
    }

    const newConversation = await prisma?.conversation.create({
      data: {
        users: {
          connect: [
            { id: currentUser.id },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation?.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return newConversation;
  } catch (err) {
    console.log(err);
    return { error: "Internal error" };
  }
};
