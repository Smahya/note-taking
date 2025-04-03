"use client";

import SunIcon from "@/assets/icons/sun.svg";
import FontIcon from "@/assets/icons/type.svg";
import LockIcon from "@/assets/icons/lock.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import { cn } from "@/lib/utils";
import { Text } from "@/components/Text";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { SidebarItem } from "@/features/dashboard/components/SidebarItem";
import { useLogout } from "@/hooks/useLogout";

export const SettingsSidebar = forwardRef<
  HTMLDivElement,
  { className?: string; onClick?: () => void }
>(({ className }, ref) => {
  const pathname = usePathname();
  const logout = useLogout();
  return (
    <div
      ref={ref}
      className={cn(
        "grid content-start gap-1 pl-8 p-4 border-r border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      <Text variant="h1" className="block md:hidden mb-2">
        Settings
      </Text>
      <div className="grid content-start gap-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
            isActive={item.href === pathname}
          />
        ))}
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-2 group/item hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md"
          )}
        >
          <LogoutIcon />
          <Text className="ml-2" variant="body1">
            Logout
          </Text>
        </button>
      </div>
    </div>
  );
});

SettingsSidebar.displayName = "SettingsSidebar";

const sidebarItems = [
  {
    label: "Color Theme",
    href: "/settings",
    icon: <SunIcon />,
  },
  {
    label: "Font Theme",
    href: "/settings/font-theme",
    icon: <FontIcon />,
  },
  {
    label: "Change Password",
    href: "/settings/change-password",
    icon: <LockIcon />,
  },
];
