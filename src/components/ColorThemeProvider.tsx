"use client";

import { useColorTheme } from "@/features/settings/hooks/useColorTheme";

export function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useColorTheme();
  return <>{children}</>;
}
