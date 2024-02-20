"use client";

import clsx from "clsx";
import useConversation from "@/hooks/useConversation";
import EmptyState from "@/components/layout/sidebar/EmptyState";

const ConversationsPage = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(`h-full lg:block lg:pl-80`, isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
