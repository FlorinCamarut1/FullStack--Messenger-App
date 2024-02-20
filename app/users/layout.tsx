import { getUsers } from "@/actions/getUsers";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import UserList from "@/components/users/UserList";
import React from "react";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();

  return (
    <div className="  h-full">
      <Sidebar>
        <UserList items={users!} />
        {children}
      </Sidebar>
    </div>
  );
};

export default UsersLayout;
