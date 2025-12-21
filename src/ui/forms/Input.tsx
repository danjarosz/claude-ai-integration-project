import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface InputProps
  extends BaseUIProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Input size */
  size?: Size;
  /** Error state */
  error?: boolean;
  /** Left addon/icon slot */
  leftAddon?: React.ReactNode;
  /** Right addon/icon slot */
  rightAddon?: React.ReactNode;
}

const sizeStyles: Record<Size, string> = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-11 px-4 text-base",
  xl: "h-12 px-4 text-lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", error, leftAddon, rightAddon, theme, className, ...props },
  ref
) {
  const hasAddons = leftAddon || rightAddon;

  const inputElement = (
    <input
      ref={ref}
      data-theme={theme}
      className={cn(
        "w-full rounded-md border bg-transparent",
        "placeholder:text-muted-foreground",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        "border-zinc-300 bg-white text-zinc-900",
        "dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100",
        error && "border-red-500 focus:ring-red-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizeStyles[size],
        leftAddon && "pl-10",
        rightAddon && "pr-10",
        !hasAddons && className
      )}
      {...props}
    />
  );

  if (!hasAddons) return inputElement;

  return (
    <div className={cn("relative", className)}>
      {leftAddon && (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
          {leftAddon}
        </div>
      )}
      {inputElement}
      {rightAddon && (
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
          {rightAddon}
        </div>
      )}
    </div>
  );
});
