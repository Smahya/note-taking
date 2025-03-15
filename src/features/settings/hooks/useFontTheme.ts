"use client";

import { useState } from "react";
import { FontTheme } from "@/types/utils";

export const useFontTheme = () => {
  const [activeFont, setActiveFont] = useState<FontTheme>("inter");

  function handleFontChange(font: "inter" | "noto-serif" | "source-code-pro") {
    const documentBody = document.body;
    documentBody.style.fontFamily = `var(--font-${font})`;
  }

  return {
    activeFont,
    setActiveFont,
    handleFontChange,
  };
};
