import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface ContainerProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Center the container */
  center?: boolean;
  /** Horizontal padding */
  padding?: "none" | "sm" | "md" | "lg";
  /** Render as different element */
  as?: "div" | "main" | "section" | "article";
}

const sizeStyles = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

const paddingStyles = {
  none: "",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    {
      size = "lg",
      center = true,
      padding = "md",
      as: Component = "div",
      theme,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        data-theme={theme}
        className={cn(
          "w-full",
          sizeStyles[size],
          center && "mx-auto",
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
