import { forwardRef } from "react";
import NextLink from "next/link";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

type LinkVariant = "default" | "muted" | "unstyled";

export interface LinkProps
  extends BaseUIProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Link destination */
  href: string;
  /** Visual variant */
  variant?: LinkVariant;
  /** Open in new tab */
  external?: boolean;
  /** Underline behavior */
  underline?: "always" | "hover" | "never";
}

const variantStyles: Record<LinkVariant, string> = {
  default: "text-blue-600 dark:text-blue-400",
  muted: "text-zinc-500 dark:text-zinc-400",
  unstyled: "text-inherit",
};

const underlineStyles = {
  always: "underline underline-offset-2",
  hover: "hover:underline underline-offset-2",
  never: "no-underline",
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    href,
    variant = "default",
    external,
    underline = "hover",
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  const isExternal =
    external || href.startsWith("http") || href.startsWith("//");

  const linkClasses = cn(
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    variantStyles[variant],
    underlineStyles[underline],
    className
  );

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        data-theme={theme}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      ref={ref}
      href={href}
      data-theme={theme}
      className={linkClasses}
      {...props}
    >
      {children}
    </NextLink>
  );
});
