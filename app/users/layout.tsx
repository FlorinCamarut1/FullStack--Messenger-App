import Sidebar from "@/components/layout/sidebar/Sidebar";
import React from "react";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className=" h-full">{children}</div>
    </Sidebar>
  );
};

export default UsersLayout;
