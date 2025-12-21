import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, ColorVariant } from "../types";

export interface BadgeProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLSpanElement> {
  /** Color variant */
  color?: ColorVariant;
  /** Badge size */
  size?: "sm" | "md" | "lg";
  /** Visual style */
  variant?: "solid" | "soft" | "outline";
  /** Rounded pill style */
  rounded?: boolean;
}

const colorStyles = {
  solid: {
    primary: "bg-blue-600 text-white",
    secondary: "bg-zinc-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-amber-500 text-white",
    error: "bg-red-600 text-white",
    info: "bg-cyan-600 text-white",
    neutral: "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200",
  },
  soft: {
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    secondary:
      "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    warning:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    info: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    neutral: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
  outline: {
    primary:
      "border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400",
    secondary:
      "border border-zinc-600 text-zinc-600 dark:border-zinc-400 dark:text-zinc-400",
    success:
      "border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400",
    warning:
      "border border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400",
    error:
      "border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400",
    info: "border border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400",
    neutral:
      "border border-zinc-400 text-zinc-600 dark:border-zinc-500 dark:text-zinc-400",
  },
};

const sizeStyles = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-0.5 text-xs",
  lg: "px-2.5 py-1 text-sm",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    color = "neutral",
    size = "md",
    variant = "soft",
    rounded = false,
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <span
      ref={ref}
      data-theme={theme}
      className={cn(
        "inline-flex items-center font-medium",
        rounded ? "rounded-full" : "rounded",
        colorStyles[variant][color],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});
