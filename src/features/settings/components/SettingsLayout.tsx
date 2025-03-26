"use client";

import { PageWrapper } from "@/components";
import { DeviceProvider } from "@/components/Device";
import { cn } from "@/lib/utils";
import ChevronRightMd from "@/assets/icons/chevron-right-md.svg";
import { SettingsSidebar } from "./Sidebar";

interface DeviceContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function SettingsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper title="Settings">
      <DeviceProvider>
        <DeviceContent>{children}</DeviceContent>
      </DeviceProvider>
    </PageWrapper>
  );
}

const DeviceContent = ({ children, isOpen, setIsOpen }: DeviceContentProps) => (
  <div className="grid md:grid-cols-[258px_1fr] h-screen">
    <SettingsSidebar
      className={cn("hidden md:block", isOpen ? "block" : "hidden")}
      onClick={() => setIsOpen?.(true)}
    />
    <div
      className={cn(
        "w-full p-6 grid gap-1 content-start md:max-w-[520px]",
        isOpen ? "hidden" : "block"
      )}
    >
      <button
        onClick={() => setIsOpen?.(!isOpen)}
        className="flex items-center md:hidden mb-2"
      >
        <ChevronRightMd className="-rotate-180 relative -left-2" />
        Settings
      </button>
      {children}
    </div>
  </div>
);
