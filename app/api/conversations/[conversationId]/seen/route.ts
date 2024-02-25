import { getCurrentUser } from "@/actions/getCurrentUser";

import db from "@/lib/db";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) return Response.json("Invalid ID", { status: 400 });

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) return Response.json(conversation);

    const updatedMessage = await prisma?.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
    });

    return Response.json(updatedMessage, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal error!" }, { status: 500 });
  }
}
