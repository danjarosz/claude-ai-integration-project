"use client";

import { forwardRef } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface NavLinkProps
  extends BaseUIProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Link destination */
  href: string;
  /** Match exact path only */
  exact?: boolean;
  /** Custom active class */
  activeClassName?: string;
  /** Custom inactive class */
  inactiveClassName?: string;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink(
    {
      href,
      exact = false,
      activeClassName,
      inactiveClassName,
      theme,
      className,
      children,
      ...props
    },
    ref
  ) {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    return (
      <NextLink
        ref={ref}
        href={href}
        data-theme={theme}
        data-active={isActive}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isActive
            ? cn(
                "text-zinc-900 dark:text-zinc-100 font-medium",
                activeClassName
              )
            : cn(
                "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                inactiveClassName
              ),
          className
        )}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);
