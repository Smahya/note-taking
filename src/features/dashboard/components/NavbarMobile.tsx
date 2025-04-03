"use client";

import HomeIcon from "@/assets/icons/home.svg";
import SearchIcon from "@/assets/icons/search.svg";
import ArchiveIcon from "@/assets/icons/archive.svg";
import TagIcon from "@/assets/icons/tag.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Text } from "@/components";

export const NavbarMobile = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(5,1fr)] py-3 divide-x divide-neutral-200 dark:divide-neutral-800 gap-4 border-t border-custom app-background lg:hidden z-50",
        className
      )}
    >
      {routesItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-neutral-400 dark:text-neutral-600 flex flex-col gap-1 items-center justify-center w-full"
        >
          {item.icon}
          <Text variant="small">{item.label}</Text>
        </Link>
      ))}
    </div>
  );
};

const routesItems = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Search",
    href: "/search",
    icon: <SearchIcon />,
  },
  {
    label: "Archive",
    href: "/archive",
    icon: <ArchiveIcon />,
  },
  {
    label: "Tags",
    href: "/tags",
    icon: <TagIcon />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
];
