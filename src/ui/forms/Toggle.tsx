import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

/** Color variants for Toggle */
export type ToggleVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export interface ToggleProps
  extends BaseUIProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Toggle size */
  size?: Extract<Size, "sm" | "md" | "lg">;
  /** Color variant */
  variant?: ToggleVariant;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
}

const sizeStyles: Record<Extract<Size, "sm" | "md" | "lg">, { track: string; thumb: string; translate: string }> = {
  sm: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translate: "translate-x-4",
  },
  md: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "translate-x-5",
  },
  lg: {
    track: "h-7 w-14",
    thumb: "h-6 w-6",
    translate: "translate-x-7",
  },
};

const labelSizeStyles: Record<Extract<Size, "sm" | "md" | "lg">, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

const variantStyles: Record<ToggleVariant, { checked: string; darkChecked: string }> = {
  primary: {
    checked: "peer-checked:bg-[var(--primary)]",
    darkChecked: "dark:peer-checked:bg-[var(--primary)]",
  },
  secondary: {
    checked: "peer-checked:bg-[var(--secondary)]",
    darkChecked: "dark:peer-checked:bg-[var(--secondary)]",
  },
  success: {
    checked: "peer-checked:bg-[var(--success)]",
    darkChecked: "dark:peer-checked:bg-[var(--success)]",
  },
  warning: {
    checked: "peer-checked:bg-[var(--warning)]",
    darkChecked: "dark:peer-checked:bg-[var(--warning)]",
  },
  danger: {
    checked: "peer-checked:bg-[var(--error)]",
    darkChecked: "dark:peer-checked:bg-[var(--error)]",
  },
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  function Toggle(
    {
      size = "md",
      variant = "primary",
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
    const toggleId = id || `toggle-${Math.random().toString(36).slice(2)}`;
    const sizeStyle = sizeStyles[size];
    const variantStyle = variantStyles[variant];

    const toggle = (
      <label
        htmlFor={toggleId}
        className={cn(
          "relative inline-flex cursor-pointer items-center",
          disabled && "cursor-not-allowed opacity-50"
        )}
        data-theme={theme}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={toggleId}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            "rounded-full transition-colors duration-200",
            "bg-zinc-300 dark:bg-zinc-600",
            variantStyle.checked,
            variantStyle.darkChecked,
            "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            sizeStyle.track
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 rounded-full bg-white shadow transition-transform duration-200",
              "peer-checked:" + sizeStyle.translate,
              sizeStyle.thumb
            )}
          />
        </span>
      </label>
    );

    if (!label) return <div className={className}>{toggle}</div>;

    return (
      <div className={cn("flex items-start gap-3", className)} data-theme={theme}>
        {toggle}
        <div className="flex flex-col">
          <span
            className={cn(
              "font-medium text-zinc-900 dark:text-zinc-100",
              labelSizeStyles[size],
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </span>
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
