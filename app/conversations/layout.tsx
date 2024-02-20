import { getConversations } from "@/actions/getConversations";

import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/layout/sidebar/Sidebar";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations!} />

        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
