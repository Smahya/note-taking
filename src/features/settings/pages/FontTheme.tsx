"use client";

import { Text } from "@/components/Text";
import SansSerifIcon from "@/assets/icons/sans-serif.svg";
import SerifIcon from "@/assets/icons/serif.svg";
import MonospaceIcon from "@/assets/icons/mono.svg";
import { ThemeSelectorButton } from "../components/ThemeButton";
import { useState } from "react";
import { Button } from "@/components";
import { useFontTheme } from "../hooks/useFontTheme";
import { FontTheme } from "@/types/utils";

export default function SettingsFontThemePage() {
  const { activeFont, handleFontChange } = useFontTheme();
  const [selected, setSelected] = useState<FontTheme>(activeFont);
  return (
    <div className="">
      <Text variant="h3" className="mb-1">
        Font Theme
      </Text>
      <Text variant="body2">Choose your font theme:</Text>
      <div className="grid gap-4 my-6">
        {themeOptions.map((theme) => (
          <ThemeSelectorButton
            key={theme.value}
            theme={theme}
            activeTheme={selected}
            handleThemeChange={() => setSelected(theme.value)}
          />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={() => handleFontChange(selected!)}>
          Apply Changes
        </Button>
      </div>
    </div>
  );
}

const themeOptions: {
  name: string;
  description: string;
  value: FontTheme;
  icon: React.ReactNode;
}[] = [
  {
    name: "Sans-serif",
    description: "Clean and modern, easy to read.",
    value: "inter",
    icon: <SansSerifIcon />,
  },
  {
    name: "Serif",
    description: "Classic and elegant for a timeless feel.",
    value: "noto-serif",
    icon: <SerifIcon />,
  },
  {
    name: "Monospace",
    description: "Code-like, great for a technical vibe.",
    value: "source-code-pro",
    icon: <MonospaceIcon />,
  },
];
