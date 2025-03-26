"use client";

import { Text } from "@/components/Text";
import SunIcon from "@/assets/icons/sun.svg";
import MoonIcon from "@/assets/icons/moon.svg";
import SunMoonIcon from "@/assets/icons/sun-moon.svg";
import { ThemeSelectorButton } from "../components/ThemeButton";
import { Button } from "@/components";
import { useState } from "react";
import { useColorTheme } from "@/context/ColorContext";

export default function SettingsColorThemePage() {
  const { activeTheme, handleThemeChange } = useColorTheme();
  const [selected, setSelected] = useState<string>(activeTheme);
  return (
    <div className="">
      <Text variant="h3" className="mb-1">
        Color Theme
      </Text>
      <Text variant="body2">Choose your color theme:</Text>
      <div className="grid gap-4 my-6">
        {themeOptions.map((theme) => (
          <ThemeSelectorButton
            key={theme.value}
            theme={theme}
            activeTheme={selected!}
            handleThemeChange={() => setSelected(theme.value)}
          />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={() => handleThemeChange(selected!)}>
          Apply Changes
        </Button>
      </div>
    </div>
  );
}

const themeOptions = [
  {
    name: "Light Mode",
    description: "Pick a clean and classic light theme",
    value: "light",
    icon: <SunIcon />,
  },
  {
    name: "Dark Mode",
    description: "Select a sleek and modern dark theme",
    value: "dark",
    icon: <MoonIcon />,
  },
  {
    name: "System",
    description: "Adapts to your device’s theme",
    value: "system",
    icon: <SunMoonIcon />,
  },
];
