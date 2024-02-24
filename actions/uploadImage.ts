"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export const uploadImage = async (image: any, conversationId: string) => {
  const session = await auth();
  const currentUser = session?.user;

  try {
    await db.message.create({
      data: {
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser?.id,
          },
        },
        seen: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });
  } catch (err) {
    console.log(err);
    return new Error("There was a problem uploading this image!");
  }
};
