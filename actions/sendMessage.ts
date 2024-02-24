"use server";
import { auth } from "@/auth";
import { MessageSchema } from "@/schemas";

import db from "@/lib/db";

import * as z from "zod";


export const sendMessage = async (
  values: z.infer<typeof MessageSchema>,
  conversationId: string,
) => {
  const session = await auth();
  const currentUser = session?.user;

  const validatedFields = MessageSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid field!" };

  const { message } = validatedFields.data;

  if (!currentUser?.id || !currentUser.email) {
    return { error: "Unauthorized" };
  }

  const newMessage = await db.message.create({
    data: {
      body: message,
      image: null,
      conversation: {
        connect: {
          id: conversationId,
        },
      },
      sender: {
        connect: {
          id: currentUser.id,
        },
      },
      seen: {
        connect: {
          id: currentUser.id,
        },
      },
    },
    include: {
      seen: true,
      sender: true,
    },
  });

  const updatedConversation = await db.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      lastMessageAt: new Date(),
      messages: {
        connect: {
          id: newMessage.id,
        },
      },
    },
    include: {
      users: true,
      messages: {
        include: {
          seen: true,
        },
      },
    },
  });

  return { success: "Message sent!", newMessage };
};
