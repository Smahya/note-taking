"use client";

import HomeIcon from "@/assets/icons/home.svg";
import ArchiveIcon from "@/assets/icons/archive.svg";
import AppLogo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./SidebarItem";

import { SidebarTags } from "./SidebarTags";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={cn(
        "grid content-start p-4 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      <div
        className="mb-2 mt-2 ml-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <AppLogo />
      </div>

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
    href: "/",
  },
  {
    label: "Archived Notes",
    icon: <ArchiveIcon />,
    href: "/archived",
  },
];
