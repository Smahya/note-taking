"use client";

import { useAppColorTheme } from "@/hooks/useColorTheme";
import { createContext, useContext } from "react";

const ColorThemeContext = createContext<ReturnType<typeof useAppColorTheme>>(
  {} as ReturnType<typeof useAppColorTheme>
);

export const ColorThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const themeContext = useAppColorTheme();

  if (!themeContext) {
    return null;
  }
  return (
    <ColorThemeContext.Provider value={themeContext}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};
