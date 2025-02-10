import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Refresh from "@/assets/icons/refresh.svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "border";
  children: ReactNode;
  icon?: ReactNode;
  block?: boolean;
  loading?: boolean;
}

export const Button = ({
  variant = "primary",
  children,
  className,
  icon,
  disabled,
  block,
  loading,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-lg text-sm font-inter font-medium transition-all duration-200 flex items-center gap-2 h-max w-max";

  const variants = {
    primary: cn(
      "bg-blue-500 text-white",
      "hover:bg-blue-700 hover:ring-2 hover:ring-blue-200 hover:ring-offset-2",
      "active:bg-blue-800",
      "disabled:bg-neutral-100 disabled:text-neutral-400 disabled:hover:ring-0 disabled:hover:ring-offset-0"
    ),
    secondary: cn(
      "bg-neutral-100 text-neutral-900",
      "hover:bg-neutral-200 hover:ring-2 hover:ring-neutral-200 hover:ring-offset-2",
      "active:bg-neutral-300",
      "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:hover:ring-0 disabled:hover:ring-offset-0"
    ),
    border: cn(
      "bg-white text-neutral-900 border-2 border-neutral-200",
      "hover:bg-neutral-50 hover:ring-2 hover:ring-neutral-200 hover:ring-offset-2",
      "active:bg-neutral-100",
      "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:border-neutral-100 disabled:hover:ring-0 disabled:hover:ring-offset-0"
    ),
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className, {
        "w-full flex justify-center items-center": block,
      })}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {loading && <Refresh className="animate-spin" />}
      {children}
    </button>
  );
};
