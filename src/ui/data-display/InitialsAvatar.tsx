import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size, ColorVariant } from "../types";

export interface InitialsAvatarProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLSpanElement> {
  /** Full name to generate initials from (e.g., "John Doe" -> "JD") */
  name?: string;
  /** Explicit initials override (takes precedence over name) */
  initials?: string;
  /** Maximum number of initials to display */
  maxInitials?: 1 | 2 | 3;
  /** Avatar size */
  size?: Size;
  /** Background color variant */
  color?: ColorVariant;
  /** Visual style for the color */
  variant?: "solid" | "soft";
  /** Shape variant */
  shape?: "circle" | "square";
}

/**
 * Extracts initials from a full name.
 * Examples:
 *   "John Doe" -> "JD"
 *   "Alice Bob Charlie" -> "AC" (first and last with maxInitials=2)
 *   "jane" -> "J"
 */
function getInitials(name: string, maxInitials: number = 2): string {
  if (!name?.trim()) return "";

  const words = name
    .trim()
    .split(/[\s-]+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  if (maxInitials === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  if (maxInitials === 2) {
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  }

  return words
    .slice(0, 3)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

const sizeStyles: Record<Size, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const colorStyles = {
  solid: {
    primary: "bg-blue-600 text-white",
    secondary: "bg-zinc-600 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-amber-500 text-white",
    error: "bg-red-600 text-white",
    info: "bg-cyan-600 text-white",
    neutral: "bg-zinc-500 text-white dark:bg-zinc-600",
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
    neutral: "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
  },
};

export const InitialsAvatar = forwardRef<HTMLSpanElement, InitialsAvatarProps>(
  function InitialsAvatar(
    {
      name,
      initials,
      maxInitials = 2,
      size = "md",
      color = "neutral",
      variant = "soft",
      shape = "circle",
      theme,
      className,
      ...props
    },
    ref
  ) {
    const displayInitials =
      initials || getInitials(name || "", maxInitials) || "?";

    return (
      <span
        ref={ref}
        data-theme={theme}
        role="img"
        aria-label={name ? `Avatar for ${name}` : "Avatar"}
        className={cn(
          "inline-flex items-center justify-center font-medium select-none",
          sizeStyles[size],
          colorStyles[variant][color],
          shape === "circle" && "rounded-full",
          shape === "square" && "rounded-md",
          className
        )}
        {...props}
      >
        {displayInitials}
      </span>
    );
  }
);
