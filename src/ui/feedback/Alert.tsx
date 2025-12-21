import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Alert type */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Dismissible */
  dismissible?: boolean;
  /** Dismiss callback */
  onDismiss?: () => void;
  /** Icon slot */
  icon?: React.ReactNode;
}

const variantStyles: Record<AlertVariant, string> = {
  info: cn(
    "border-blue-200 bg-blue-50 text-blue-800",
    "dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
  ),
  success: cn(
    "border-green-200 bg-green-50 text-green-800",
    "dark:border-green-800 dark:bg-green-950 dark:text-green-200"
  ),
  warning: cn(
    "border-amber-200 bg-amber-50 text-amber-800",
    "dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200"
  ),
  error: cn(
    "border-red-200 bg-red-50 text-red-800",
    "dark:border-red-800 dark:bg-red-950 dark:text-red-200"
  ),
};

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = "info",
    title,
    dismissible,
    onDismiss,
    icon,
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  const displayIcon = icon ?? defaultIcons[variant];

  return (
    <div
      ref={ref}
      role="alert"
      data-theme={theme}
      className={cn(
        "relative rounded-lg border p-4",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        {displayIcon && <div className="flex-shrink-0">{displayIcon}</div>}
        <div className="flex-1">
          {title && <h5 className="mb-1 font-medium">{title}</h5>}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});
