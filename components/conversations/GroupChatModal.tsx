"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  const router = useRouter();

  return <div></div>;
};

export default GroupChatModal;
