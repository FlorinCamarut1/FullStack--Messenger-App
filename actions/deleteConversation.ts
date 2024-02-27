"use server";

import db from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";
import { pusherServer } from "@/lib/pusher";

export const deleteConversation = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return { error: "Unauthorized!" };
    }

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return { error: "Invalid conversation!" };
    }

    const deleteConversation = await db.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation,
        );
      }
    });

    return { success: "conversation deleted", deleteConversation };
  } catch (error) {
    return null;
  }
};
