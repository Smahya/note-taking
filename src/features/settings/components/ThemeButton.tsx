"use client";

import { Text } from "@/components/Text";
import { cn } from "@/lib/utils";

export function ThemeSelectorButton({
  theme,
  activeTheme,
  handleThemeChange,
}: {
  theme: {
    name: string;
    value: string;
    description: string;
    icon: React.ReactNode;
  };
  activeTheme: string;
  handleThemeChange: (theme: string) => void;
}) {
  return (
    <button
      onClick={() => handleThemeChange(theme.value)}
      type="button"
      key={theme.value}
      className={cn(
        "relative flex items-center text-left gap-3 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4",
        activeTheme === theme.value
          ? "bg-neutral-100 dark:bg-neutral-800"
          : "bg-white dark:bg-neutral-950"
      )}
    >
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center justify-center w-10 h-10">
        {theme.icon}
      </div>
      <div>
        <Text variant="body1">{theme.name}</Text>
        <Text variant="small">{theme.description}</Text>
      </div>
      <div className="absolute right-4 top-6.5">
        <div
          className={cn(
            "bg-white dark:bg-neutral-950 rounded-full w-4 h-4 ",
            activeTheme === theme.value
              ? "border-4 border-blue-500 dark:bg-neutral-800"
              : "border-2 border-neutral-200 dark:border-neutral-700"
          )}
        ></div>
      </div>
    </button>
  );
}
