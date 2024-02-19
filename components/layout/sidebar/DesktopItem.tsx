"use client";

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface DesktopItemsProps {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  active,
}: DesktopItemsProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black`,
          active && "bg-gray-100 text-gray-900",
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className=" sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
