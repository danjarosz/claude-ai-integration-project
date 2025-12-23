import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface TextProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLParagraphElement> {
  /** Text size */
  size?: Size;
  /** Text color variant */
  color?: "default" | "muted" | "success" | "warning" | "error";
  /** Font weight */
  weight?: "normal" | "medium" | "semibold" | "bold";
  /** Text alignment */
  align?: "left" | "center" | "right" | "justify";
  /** Leading (line height) */
  leading?: "tight" | "normal" | "relaxed" | "loose";
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** Clamp to specified lines */
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
}

const sizeStyles: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const colorStyles = {
  default: "text-zinc-900 dark:text-zinc-100",
  muted: "text-zinc-500 dark:text-zinc-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  {
    size = "md",
    color = "default",
    weight,
    align,
    leading,
    truncate,
    lineClamp,
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <p
      ref={ref}
      data-theme={theme}
      className={cn(
        sizeStyles[size],
        colorStyles[color],
        weight === "normal" && "font-normal",
        weight === "medium" && "font-medium",
        weight === "semibold" && "font-semibold",
        weight === "bold" && "font-bold",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        align === "justify" && "text-justify",
        leading === "tight" && "leading-tight",
        leading === "normal" && "leading-normal",
        leading === "relaxed" && "leading-relaxed",
        leading === "loose" && "leading-loose",
        truncate && "truncate",
        lineClamp === 1 && "line-clamp-1",
        lineClamp === 2 && "line-clamp-2",
        lineClamp === 3 && "line-clamp-3",
        lineClamp === 4 && "line-clamp-4",
        lineClamp === 5 && "line-clamp-5",
        lineClamp === 6 && "line-clamp-6",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});
