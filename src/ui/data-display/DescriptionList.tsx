import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface DescriptionListProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDListElement> {
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Spacing between items */
  spacing?: "sm" | "md" | "lg";
}

export interface DescriptionTermProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {}

export interface DescriptionDetailsProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {}

const spacingStyles = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export const DescriptionList = forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(function DescriptionList(
  { direction = "vertical", spacing = "md", theme, className, children, ...props },
  ref
) {
  return (
    <dl
      ref={ref}
      data-theme={theme}
      className={cn(
        direction === "vertical" && ["flex flex-col", spacingStyles[spacing]],
        direction === "horizontal" && [
          "grid grid-cols-[auto_1fr]",
          spacingStyles[spacing],
        ],
        className
      )}
      {...props}
    >
      {children}
    </dl>
  );
});

export const DescriptionTerm = forwardRef<HTMLElement, DescriptionTermProps>(
  function DescriptionTerm({ theme, className, children, ...props }, ref) {
    return (
      <dt
        ref={ref}
        data-theme={theme}
        className={cn(
          "text-sm font-medium text-zinc-500 dark:text-zinc-400",
          className
        )}
        {...props}
      >
        {children}
      </dt>
    );
  }
);

export const DescriptionDetails = forwardRef<
  HTMLElement,
  DescriptionDetailsProps
>(function DescriptionDetails({ theme, className, children, ...props }, ref) {
  return (
    <dd
      ref={ref}
      data-theme={theme}
      className={cn("text-sm text-zinc-900 dark:text-zinc-100", className)}
      {...props}
    >
      {children}
    </dd>
  );
});
