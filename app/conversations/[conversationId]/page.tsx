import { Conversation, User } from "@prisma/client";
import { getConversationById } from "@/actions/getConversationById";
import { getMessages } from "@/data";

import Header from "@/components/conversations/Header";
import EmptyState from "@/components/layout/sidebar/EmptyState";
import Body from "@/components/conversations/Body";
import ConversationForm from "@/components/conversations/ConversationForm";

interface IParams {
  conversationId: string;
}
const ConversationPage = async ({ params }: { params: IParams }) => {
  const conversations = await getConversationById(params?.conversationId);
  const messages = await getMessages(params?.conversationId);

  if (!conversations) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversations} />
        <Body initialMessages={messages!} />
        <ConversationForm />
      </div>
    </div>
  );
};

export default ConversationPage;
