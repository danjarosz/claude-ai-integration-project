import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface SkeletonProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: "text" | "circular" | "rectangular" | "rounded";
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
  /** Animation type */
  animation?: "pulse" | "wave" | "none";
}

export interface SkeletonTextProps extends BaseUIProps {
  /** Number of lines */
  lines?: number;
  /** Line height spacing */
  spacing?: "sm" | "md" | "lg";
  /** Last line width percentage */
  lastLineWidth?: number;
}

const variantStyles = {
  text: "rounded h-4",
  circular: "rounded-full",
  rectangular: "",
  rounded: "rounded-lg",
};

const animationStyles = {
  pulse: "animate-pulse",
  wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
  none: "",
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      variant = "text",
      width,
      height,
      animation = "pulse",
      theme,
      className,
      style,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-theme={theme}
        aria-hidden="true"
        className={cn(
          "bg-zinc-200 dark:bg-zinc-700",
          variantStyles[variant],
          animationStyles[animation],
          className
        )}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

const spacingStyles = {
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-3",
};

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(
    { lines = 3, spacing = "md", lastLineWidth = 60, theme, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-theme={theme}
        className={spacingStyles[spacing]}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            width={index === lines - 1 ? `${lastLineWidth}%` : "100%"}
          />
        ))}
      </div>
    );
  }
);
