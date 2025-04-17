"use client";

import { PageWrapper } from "@/components";
import { DeviceProvider } from "@/components/Device";
import { cn } from "@/lib/utils";
import ChevronRightMd from "@/assets/icons/chevron-right-md.svg";
import { SettingsSidebar } from "./Sidebar";
import { parseAsString, useQueryStates } from "nuqs";

interface DeviceContentProps {
  children: React.ReactNode;
  isMobile?: boolean;
  setIsMobile?: (isMobile: boolean) => void;
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

const DeviceContent = ({ children, isMobile }: DeviceContentProps) => {
  return (
    <>
      {isMobile ? (
        <SettingsMobile>{children}</SettingsMobile>
      ) : (
        <SettingsDesktop>{children}</SettingsDesktop>
      )}
    </>
  );
};

const SettingsDesktop = ({ children }: { children: React.ReactNode }) => (
  <div className="grid md:grid-cols-[258px_1fr] h-screen">
    <SettingsSidebar />
    <div className="w-full p-6 grid gap-1 content-start md:max-w-[520px]">
      {children}
    </div>
  </div>
);

const SettingsMobile = ({ children }: { children: React.ReactNode }) => {
  const [screen, setScreen] = useQueryStates({
    screen: parseAsString.withDefault("content"),
  });

  return (
    <div>
      <SettingsSidebar
        className={screen.screen === "sidebar" ? "block" : "hidden"}
      />
      <div
        className={cn(
          "w-full p-6 grid gap-1 content-start md:max-w-[520px]",
          screen.screen === "content" ? "block" : "hidden"
        )}
      >
        <button
          className="flex items-center lg:hidden mb-2"
          onClick={() => setScreen({ screen: "sidebar" })}
        >
          <ChevronRightMd className="-rotate-180 relative -left-2" />
          Settings
        </button>
        {children}
      </div>
    </div>
  );
};
