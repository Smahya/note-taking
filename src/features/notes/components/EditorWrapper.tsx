import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
export const EditorWrapper = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useState(Cookies.get("theme") || "dark");

  useEffect(() => {
    setColorMode(Cookies.get("theme")!);
  }, []);

  useEffect(() => {
    if (colorMode === "system") {
      setColorMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, [colorMode]);

  return (
    <div className="max-w-[400px] content-start" data-color-mode={colorMode}>
      {children}
    </div>
  );
};
