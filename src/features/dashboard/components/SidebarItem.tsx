import { Text } from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ChevronRightMdIcon from "@/assets/icons/chevron-right-md.svg";

export const SidebarItem = ({
  label,
  icon,
  href,
  isActive,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between gap-2 group/item hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md",
        isActive && "bg-neutral-100 dark:bg-neutral-800"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <span className="group-hover/item:text-blue-500">{icon}</span>
        <Text variant="body1">{label}</Text>
      </div>
      <ChevronRightMdIcon />
    </Link>
  );
};
