import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = `h${HeadingLevel}`;

export interface HeadingProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level (1-6) */
  level?: HeadingLevel;
  /** Visual size (can differ from semantic level) */
  size?: Size | "2xl" | "3xl" | "4xl";
  /** Text weight */
  weight?: "normal" | "medium" | "semibold" | "bold";
  /** Truncate with ellipsis */
  truncate?: boolean;
}

const sizeStyles: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const levelDefaults: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold",
  2: "text-3xl font-bold",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
  5: "text-lg font-medium",
  6: "text-base font-medium",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    { level = 2, size, weight, truncate, theme, className, children, ...props },
    ref
  ) {
    const Tag = `h${level}` as HeadingTag;

    return (
      <Tag
        ref={ref}
        data-theme={theme}
        className={cn(
          "text-zinc-900 dark:text-zinc-50",
          !size && levelDefaults[level],
          size && sizeStyles[size],
          weight === "normal" && "font-normal",
          weight === "medium" && "font-medium",
          weight === "semibold" && "font-semibold",
          weight === "bold" && "font-bold",
          truncate && "truncate",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
