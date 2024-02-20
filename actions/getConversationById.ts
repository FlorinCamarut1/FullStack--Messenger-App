"use server";

import { auth } from "@/auth";

import db from "@/lib/db";

export const getConversationById = async (ConversationId: string) => {
  try {
    const session = await auth();
    const currentUser = session?.user;
    if (!currentUser?.email) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: ConversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (err) {
    console.log(err);
    return null;
  }
};
