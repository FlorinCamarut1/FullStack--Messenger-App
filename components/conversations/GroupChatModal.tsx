"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return <div></div>;
};

export default GroupChatModal;
