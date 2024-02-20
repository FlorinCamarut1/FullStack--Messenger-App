import { auth } from "@/auth";

import db from "@/lib/db";

export const getConversations = async () => {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser?.id) return [];

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser?.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (err) {
    console.log(err);
    return null;
  }
};
