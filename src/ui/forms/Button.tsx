import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size, Intent } from "../types";

export interface ButtonProps
  extends BaseUIProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: Intent;
  /** Button size */
  size?: Size;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon only (square aspect ratio) */
  iconOnly?: boolean;
}

const variantStyles: Record<Intent, string> = {
  default: cn(
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
    "dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
  ),
  primary: cn(
    "bg-blue-600 text-white hover:bg-blue-700",
    "dark:bg-blue-500 dark:hover:bg-blue-600"
  ),
  destructive: cn(
    "bg-red-600 text-white hover:bg-red-700",
    "dark:bg-red-500 dark:hover:bg-red-600"
  ),
  ghost: cn("bg-transparent hover:bg-zinc-100", "dark:hover:bg-zinc-800"),
  outline: cn(
    "border border-zinc-300 bg-transparent hover:bg-zinc-50",
    "dark:border-zinc-600 dark:hover:bg-zinc-800"
  ),
};

const sizeStyles: Record<Size, string> = {
  xs: "h-7 px-2 text-xs rounded",
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-11 px-6 text-base rounded-lg",
  xl: "h-12 px-8 text-lg rounded-lg",
};

const iconOnlySizes: Record<Size, string> = {
  xs: "h-7 w-7",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-11 w-11",
  xl: "h-12 w-12",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "default",
      size = "md",
      fullWidth,
      loading,
      iconOnly,
      disabled,
      theme,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        data-theme={theme}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          iconOnly ? iconOnlySizes[size] : sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  }
);
