import { Text } from "@/components/Text";
import SettingsIcon from "@/assets/icons/settings.svg";
export function Navbar({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <Text variant="h1">{title}</Text>
      <div className="flex items-center gap-2">
        {children}

        <SettingsIcon />
      </div>
    </div>
  );
}
