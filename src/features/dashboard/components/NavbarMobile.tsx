"use client";

import HomeIcon from "@/assets/icons/home.svg";
import ArchiveIcon from "@/assets/icons/archive.svg";
import TagIcon from "@/assets/icons/tag.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Text } from "@/components";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { SidebarTags } from "./SidebarTags";

export const NavbarMobile = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(4,1fr)] py-3 divide-x divide-neutral-200 dark:divide-neutral-800 gap-4 border-t border-custom app-background lg:hidden z-50",
        className
      )}
    >
      {routesItems.map((item) => {
        return (
          <div key={item.href}>
            {item.label === "Tags" ? (
              <button
                onClick={() => setOpen(true)}
                className="bg-transparent focus text-neutral-400 dark:text-neutral-600 flex flex-col gap-1 items-center justify-center w-full"
              >
                {item.icon}
                <Text variant="small">{item.label}</Text>
              </button>
            ) : (
              <Link
                href={item.href}
                className="text-neutral-400 dark:text-neutral-600 flex flex-col gap-1 items-center justify-center w-full"
              >
                {item.icon}
                <Text variant="small">{item.label}</Text>
              </Link>
            )}
          </div>
        );
      })}
      <TagsMobileDrawer
        open={open}
        setOpen={(open) => {
          setOpen(open);
        }}
      />
    </div>
  );
};

export const TagsMobileDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => (
  <AlertDialog.Root open={open} onOpenChange={setOpen}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay
        onClick={() => setOpen(false)}
        className="bg-black/50 fixed inset-0 z-50"
      />
      <AlertDialog.Content
        onClick={() => setOpen(false)}
        className="fixed left-0 top-0 z-50 grid"
      >
        <AlertDialog.Title />
        <AlertDialog.Description />

        <div
          onClick={(e) => e.stopPropagation()}
          className="h-screen px-4 grid bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-800 w-[240px] m-auto rounded-lg"
        >
          <SidebarTags onClick={() => setOpen(false)} />
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

const routesItems = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  // {
  //   label: "Search",
  //   href: "/search",
  //   icon: <SearchIcon />,
  // },
  {
    label: "Archive",
    href: "/archived",
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
