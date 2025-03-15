"use client";

import ChevronRightMd from "@/assets/icons/chevron-right-md.svg";

import { PageWrapper } from "@/components";
import { SettingsSidebar } from "./Sidebar";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";

export function SettingsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [isOpen, setIsOpen] = useState<boolean>(isSmallDevice);

  return (
    <PageWrapper title="Settings">
      {/* <pre>{isSmallDevice?.toString()}</pre> */}
      <div className="grid md:grid-cols-[258px_1fr] h-screen">
        <SettingsSidebar
          className={cn("hidden md:block", isOpen ? "block" : "hidden")}
          onClick={() => setIsOpen(true)}
        />
        <div
          className={cn(
            "w-full p-6 grid gap-1 content-start  md:max-w-[520px]",
            isOpen ? "hidden" : "block"
          )}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center md:hidden mb-2"
          >
            <ChevronRightMd className="-rotate-180 relative -left-2" />
            Settings
          </button>
          {children}
        </div>
      </div>
    </PageWrapper>
  );
}
