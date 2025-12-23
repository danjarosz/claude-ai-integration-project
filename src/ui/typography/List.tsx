import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface ListProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLUListElement> {
  /** List style */
  variant?: "disc" | "decimal" | "none" | "check";
  /** Spacing between items */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Size variant */
  size?: Size;
}

export interface ListItemProps
  extends BaseUIProps,
    React.LiHTMLAttributes<HTMLLIElement> {
  /** Icon or marker */
  icon?: React.ReactNode;
}

const spacingStyles = {
  none: "space-y-0",
  sm: "space-y-1",
  md: "space-y-2",
  lg: "space-y-4",
};

const sizeStyles: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const variantStyles = {
  disc: "list-disc",
  decimal: "list-decimal",
  none: "list-none",
  check: "list-none",
};

export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  {
    variant = "disc",
    spacing = "sm",
    size = "md",
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <ul
      ref={ref}
      data-theme={theme}
      className={cn(
        "text-zinc-900 dark:text-zinc-100",
        variantStyles[variant],
        variant !== "none" && variant !== "check" && "ml-4",
        spacingStyles[spacing],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
});

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem({ icon, theme, className, children, ...props }, ref) {
    if (icon) {
      return (
        <li
          ref={ref}
          data-theme={theme}
          className={cn("flex items-start gap-2", className)}
          {...props}
        >
          <span className="flex-shrink-0 mt-0.5">{icon}</span>
          <span>{children}</span>
        </li>
      );
    }

    return (
      <li ref={ref} data-theme={theme} className={className} {...props}>
        {children}
      </li>
    );
  }
);

export interface OrderedListProps
  extends BaseUIProps,
    React.OlHTMLAttributes<HTMLOListElement> {
  /** List style */
  variant?: "decimal" | "none";
  /** Spacing between items */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Size variant */
  size?: Size;
}

export const OrderedList = forwardRef<HTMLOListElement, OrderedListProps>(
  function OrderedList(
    {
      variant = "decimal",
      spacing = "sm",
      size = "md",
      theme,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <ol
        ref={ref}
        data-theme={theme}
        className={cn(
          "text-zinc-900 dark:text-zinc-100",
          variant === "decimal" ? "list-decimal ml-4" : "list-none",
          spacingStyles[spacing],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </ol>
    );
  }
);

export const UnorderedList = List;
