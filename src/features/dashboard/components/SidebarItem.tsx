import { Text } from "@/components";
import { cn } from "@/lib/utils";
import ChevronRightMdIcon from "@/assets/icons/chevron-right-md.svg";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(href);
        onClick?.();
      }}
      className={cn(
        "flex items-center justify-between gap-2 group/item hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md !cursor-pointer",
        isActive && "bg-neutral-100 dark:bg-neutral-800"
      )}
    >
      <div className="flex items-center gap-2 pointer-events-none">
        <span className="group-hover/item:text-blue-500">{icon}</span>
        <Text variant="body1">{label}</Text>
      </div>
      <ChevronRightMdIcon />
    </button>
  );
};
