"use client";

import { useState, useEffect, useCallback } from "react";
import { FontTheme } from "@/types/utils";
import { useDocument } from "@/hooks/useDocument";
import Cookies from "js-cookie";

export const useAppFontTheme = () => {
  const { _document } = useDocument();
  const [activeFont, setActiveFont] = useState<FontTheme>(() => {
    return Cookies.get("font")! as FontTheme;
  });

  const applyFont = useCallback(
    (font: FontTheme) => {
      const documentBody = _document?.body;
      if (documentBody) {
        documentBody.style.fontFamily = `var(--font-${font})`;
      }
    },
    [_document]
  );

  function handleFontChange(font: "inter" | "noto-serif" | "source-code-pro") {
    applyFont(font);
    Cookies.set("font", font);
  }

  useEffect(() => {
    const savedFont = Cookies.get("font");
    if (savedFont) {
      setActiveFont(savedFont as FontTheme);
      applyFont(savedFont as FontTheme);
    } else {
      setActiveFont("inter");
      applyFont("inter");
    }
  }, [applyFont]);

  return {
    activeFont,
    setActiveFont,
    handleFontChange,
  };
};
