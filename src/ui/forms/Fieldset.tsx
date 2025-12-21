import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface FieldsetProps
  extends BaseUIProps,
    React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Fieldset variant */
  variant?: "default" | "bordered" | "card";
}

export interface LegendProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLLegendElement> {
  /** Legend size */
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  default: "",
  bordered: cn(
    "border rounded-lg p-4",
    "border-zinc-200 dark:border-zinc-700"
  ),
  card: cn(
    "border rounded-lg p-4 bg-white shadow-sm",
    "dark:bg-zinc-900 dark:border-zinc-700"
  ),
};

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset(
    { variant = "default", theme, className, children, ...props },
    ref
  ) {
    return (
      <fieldset
        ref={ref}
        data-theme={theme}
        className={cn("space-y-4", variantStyles[variant], className)}
        {...props}
      >
        {children}
      </fieldset>
    );
  }
);

export const Legend = forwardRef<HTMLLegendElement, LegendProps>(
  function Legend({ size = "md", theme, className, children, ...props }, ref) {
    return (
      <legend
        ref={ref}
        data-theme={theme}
        className={cn(
          "font-semibold text-zinc-900 dark:text-zinc-100",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-lg",
          className
        )}
        {...props}
      >
        {children}
      </legend>
    );
  }
);
