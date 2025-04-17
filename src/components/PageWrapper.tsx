"use client";
import { Text } from "./Text";
import SettingsIcon from "@/assets/icons/settings.svg";
import { useRouter } from "next/navigation";
import AppLogo from "./Logo";

export const PageWrapper = ({
  children,
  navbarRight,
  title,
}: {
  children: React.ReactNode;
  title: string;
  navbarRight?: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[max-content_1fr] app-background h-full overflow-y-auto">
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 app-background flex flex-wrap items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center">
          <Text variant="h1" className="hidden lg:block">
            {title}
          </Text>
          <div
            className="mb-2 mt-2 ml-2 cursor-pointer flex lg:hidden"
            onClick={() => router.push("/")}
          >
            <AppLogo />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {navbarRight}
          <SettingsIcon
            className="cursor-pointer hidden lg:block"
            onClick={() => router.push("/settings")}
          />
        </div>
      </div>

      <div className="h-[calc(100vh-80px)] overflow-y-auto">{children}</div>
    </div>
  );
};
