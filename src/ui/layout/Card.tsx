import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface CardProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: "default" | "outlined" | "elevated" | "ghost";
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";
  /** Interactive hover state */
  interactive?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const variantStyles = {
  default: cn(
    "border bg-white text-zinc-900",
    "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
  ),
  outlined: cn("border-2 bg-transparent", "dark:border-zinc-600"),
  elevated: cn(
    "bg-white shadow-lg",
    "dark:bg-zinc-900 dark:shadow-zinc-950/50"
  ),
  ghost: "bg-transparent",
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "default",
    padding = "md",
    interactive,
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      data-theme={theme}
      className={cn(
        "rounded-lg",
        variantStyles[variant],
        paddingStyles[padding],
        interactive && "cursor-pointer transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 pb-4", className)}
        {...props}
      />
    );
  }
);

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody({ className, ...props }, ref) {
    return <div ref={ref} className={cn("py-2", className)} {...props} />;
  }
);

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
      />
    );
  }
);
