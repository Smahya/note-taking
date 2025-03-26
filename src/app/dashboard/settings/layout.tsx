import { SettingsLayoutWrapper } from "@/features/settings/components/SettingsLayout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayoutWrapper>{children}</SettingsLayoutWrapper>;
}
