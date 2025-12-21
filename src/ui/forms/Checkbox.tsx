import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface CheckboxProps
  extends BaseUIProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Checkbox size */
  size?: Size;
  /** Error state */
  error?: boolean;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
}

const sizeStyles: Record<Size, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

const labelSizeStyles: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      size = "md",
      error,
      label,
      description,
      theme,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) {
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2)}`;

    const checkbox = (
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        disabled={disabled}
        data-theme={theme}
        className={cn(
          "rounded border transition-colors duration-150",
          "border-zinc-300 bg-white",
          "dark:border-zinc-600 dark:bg-zinc-800",
          "checked:border-blue-600 checked:bg-blue-600",
          "dark:checked:border-blue-500 dark:checked:bg-blue-500",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
          error && "border-red-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizeStyles[size],
          !label && className
        )}
        {...props}
      />
    );

    if (!label) return checkbox;

    return (
      <div className={cn("flex items-start gap-2", className)}>
        {checkbox}
        <div className="flex flex-col">
          <label
            htmlFor={checkboxId}
            className={cn(
              "font-medium text-zinc-900 dark:text-zinc-100",
              labelSizeStyles[size],
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </label>
          {description && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </span>
          )}
        </div>
      </div>
    );
  }
);
