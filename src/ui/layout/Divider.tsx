import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface DividerProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLHRElement> {
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Divider style */
  variant?: "solid" | "dashed" | "dotted";
  /** Spacing around divider */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Label in the middle */
  label?: string;
}

const variantStyles = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

const horizontalSpacing = {
  none: "",
  sm: "my-2",
  md: "my-4",
  lg: "my-8",
};

const verticalSpacing = {
  none: "",
  sm: "mx-2",
  md: "mx-4",
  lg: "mx-8",
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  function Divider(
    {
      orientation = "horizontal",
      variant = "solid",
      spacing = "md",
      label,
      theme,
      className,
      ...props
    },
    ref
  ) {
    if (label && orientation === "horizontal") {
      return (
        <div
          data-theme={theme}
          className={cn(
            "flex items-center",
            horizontalSpacing[spacing],
            className
          )}
        >
          <hr
            ref={ref}
            className={cn(
              "flex-1 border-t border-zinc-200 dark:border-zinc-700",
              variantStyles[variant]
            )}
            {...props}
          />
          <span className="px-3 text-sm text-zinc-500 dark:text-zinc-400">
            {label}
          </span>
          <hr
            className={cn(
              "flex-1 border-t border-zinc-200 dark:border-zinc-700",
              variantStyles[variant]
            )}
          />
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        data-theme={theme}
        className={cn(
          "border-zinc-200 dark:border-zinc-700",
          variantStyles[variant],
          orientation === "horizontal" && [
            "border-t w-full",
            horizontalSpacing[spacing],
          ],
          orientation === "vertical" && [
            "border-l h-full self-stretch",
            verticalSpacing[spacing],
          ],
          className
        )}
        {...props}
      />
    );
  }
);
