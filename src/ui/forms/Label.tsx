import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface LabelProps
  extends BaseUIProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Label size */
  size?: Size;
  /** Required indicator */
  required?: boolean;
  /** Disabled styling */
  disabled?: boolean;
}

const sizeStyles: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { size = "md", required, disabled, theme, className, children, ...props },
  ref
) {
  return (
    <label
      ref={ref}
      data-theme={theme}
      className={cn(
        "font-medium text-zinc-900 dark:text-zinc-100",
        sizeStyles[size],
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
});
