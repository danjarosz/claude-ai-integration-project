import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface TextareaProps
  extends BaseUIProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Textarea size */
  size?: Size;
  /** Error state */
  error?: boolean;
  /** Resize behavior */
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const sizeStyles: Record<Size, string> = {
  xs: "px-2 py-1 text-xs min-h-[60px]",
  sm: "px-3 py-2 text-sm min-h-[80px]",
  md: "px-3 py-2 text-sm min-h-[100px]",
  lg: "px-4 py-3 text-base min-h-[120px]",
  xl: "px-4 py-3 text-lg min-h-[140px]",
};

const resizeStyles = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { size = "md", error, resize = "vertical", theme, className, ...props },
    ref
  ) {
    return (
      <textarea
        ref={ref}
        data-theme={theme}
        className={cn(
          "w-full rounded-md border bg-transparent",
          "placeholder:text-zinc-500",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
          "border-zinc-300 bg-white text-zinc-900",
          "dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100",
          error && "border-red-500 focus:ring-red-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizeStyles[size],
          resizeStyles[resize],
          className
        )}
        {...props}
      />
    );
  }
);
