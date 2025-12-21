import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface MenuProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Spacing between items */
  spacing?: "sm" | "md" | "lg";
}

export interface MenuItemProps
  extends BaseUIProps,
    React.LiHTMLAttributes<HTMLLIElement> {
  /** Is active/current */
  active?: boolean;
  /** Is disabled */
  disabled?: boolean;
}

const spacingStyles = {
  horizontal: {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  },
  vertical: {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  },
};

export const Menu = forwardRef<HTMLElement, MenuProps>(function Menu(
  {
    direction = "horizontal",
    spacing = "md",
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <nav ref={ref} data-theme={theme} {...props}>
      <ul
        className={cn(
          "flex list-none",
          direction === "horizontal" && "flex-row items-center",
          direction === "vertical" && "flex-col",
          spacingStyles[direction][spacing],
          className
        )}
      >
        {children}
      </ul>
    </nav>
  );
});

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  function MenuItem(
    { active, disabled, theme, className, children, ...props },
    ref
  ) {
    return (
      <li
        ref={ref}
        data-theme={theme}
        data-active={active}
        data-disabled={disabled}
        className={cn(
          "text-sm transition-colors",
          active
            ? "text-zinc-900 font-medium dark:text-zinc-100"
            : "text-zinc-600 dark:text-zinc-400",
          !disabled && !active && "hover:text-zinc-900 dark:hover:text-zinc-100",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </li>
    );
  }
);
