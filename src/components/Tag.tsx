import { Text } from "@/components";

export const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      variant="small"
      className="bg-neutral-200 dark:bg-neutral-800 capitalize rounded-md px-2 py-1"
    >
      {children}
    </Text>
  );
};
