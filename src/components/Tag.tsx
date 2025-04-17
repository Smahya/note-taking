import { Text } from "@/components";
import { cn } from "@/lib/utils";

export const Tag = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error";
}) => {
  const variantMap = {
    default: "bg-neutral-200 dark:bg-neutral-600",
    primary: "bg-primary-200 dark:bg-primary-800",
    secondary: "bg-secondary-200 dark:bg-secondary-800",
    success: "bg-success-200 dark:bg-success-800",
    warning: "bg-warning-200 dark:bg-warning-800",
    error: "bg-error-200 dark:bg-error-800",
  };
  return (
    <Text
      variant="small"
      className={cn(variantMap[variant], "capitalize rounded-md px-2 py-1")}
    >
      {children}
    </Text>
  );
};
