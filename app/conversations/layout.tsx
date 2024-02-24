import { getConversations } from "@/actions/getConversations";
import { getUsers } from "@/actions/getUsers";

import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/layout/sidebar/Sidebar";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations!} users={users!} />

        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
