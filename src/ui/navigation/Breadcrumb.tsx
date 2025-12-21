import { forwardRef, Children, isValidElement, cloneElement } from "react";
import NextLink from "next/link";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface BreadcrumbProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {
  /** Custom separator */
  separator?: React.ReactNode;
}

export interface BreadcrumbItemProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLLIElement> {
  /** Link destination (optional - if not provided, renders as text) */
  href?: string;
  /** Is the current/active page */
  current?: boolean;
}

const DefaultSeparator = () => (
  <svg
    className="h-4 w-4 text-zinc-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { separator = <DefaultSeparator />, theme, className, children, ...props },
    ref
  ) {
    const items = Children.toArray(children).filter(isValidElement);

    return (
      <nav ref={ref} data-theme={theme} aria-label="Breadcrumb" {...props}>
        <ol className={cn("flex items-center gap-2", className)}>
          {items.map((child, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-zinc-400" aria-hidden="true">
                  {separator}
                </span>
              )}
              {cloneElement(child as React.ReactElement<BreadcrumbItemProps>, {
                current: index === items.length - 1,
              })}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem(
    { href, current, theme, className, children, ...props },
    ref
  ) {
    const content = href ? (
      <NextLink
        href={href}
        className={cn(
          "text-sm transition-colors",
          current
            ? "text-zinc-900 font-medium dark:text-zinc-100"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        )}
        aria-current={current ? "page" : undefined}
      >
        {children}
      </NextLink>
    ) : (
      <span
        className={cn(
          "text-sm",
          current
            ? "text-zinc-900 font-medium dark:text-zinc-100"
            : "text-zinc-500 dark:text-zinc-400"
        )}
        aria-current={current ? "page" : undefined}
      >
        {children}
      </span>
    );

    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} data-theme={theme} className={className} {...props}>
        {content}
      </span>
    );
  }
);
