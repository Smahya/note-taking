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
      <div className="sticky top-0 z-50 app-background flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center">
          <Text variant="h1" className="hidden lg:block">
            {title}
          </Text>
          <AppLogo className="lg:hidden" />
        </div>
        <div className="flex items-center gap-4">
          {navbarRight}

          <SettingsIcon
            className="cursor-pointer hidden lg:block"
            onClick={() => router.push("/settings")}
          />
        </div>
      </div>
      {/* <Text variant="h1" className="block md:hidden pl-8 pt-4">
        {title}
      </Text> */}
      {/* CONTENT */}
      <div>{children}</div>
    </div>
  );
};
