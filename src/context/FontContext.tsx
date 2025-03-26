"use client";

import { createContext, useContext } from "react";
import { useAppFontTheme } from "@/hooks/useFontTheme";

export const FontContext = createContext<ReturnType<typeof useAppFontTheme>>(
  {} as ReturnType<typeof useAppFontTheme>
);

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const fontContext = useAppFontTheme();

  return (
    <FontContext.Provider value={fontContext}>{children}</FontContext.Provider>
  );
};

export const useFontTheme = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFontTheme must be used within a FontProvider");
  }
  return context;
};
