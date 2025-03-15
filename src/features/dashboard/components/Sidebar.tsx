"use client";

import HomeIcon from "@/assets/icons/home.svg";
import ArchiveIcon from "@/assets/icons/archive.svg";
import AppLogo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./SidebarItem";

import { SidebarTags } from "./SidebarTags";
import { usePathname } from "next/navigation";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "grid content-start p-4 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      <AppLogo className="mb-4 ml-4" />
      <div className="grid content-start gap-1 py-4">
        {sidebarItems.map((item) => {
          return (
            <SidebarItem
              key={item.href}
              isActive={item.href === pathname}
              {...item}
            />
          );
        })}
        <SidebarTags />
      </div>
    </div>
  );
}

const sidebarItems: {
  label: string;
  icon: React.ReactNode;
  href: string;
}[] = [
  {
    label: "All Notes",
    icon: <HomeIcon />,
    href: "/dashboard",
  },
  {
    label: "Archived Notes",
    icon: <ArchiveIcon />,
    href: "/dashboard/archived",
  },
];
