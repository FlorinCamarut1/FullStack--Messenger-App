"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import React from "react";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const { routes } = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] bg-white lg:hidden">
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          active={item.active}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
