import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface BlockquoteProps
  extends BaseUIProps,
    React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  /** Visual variant */
  variant?: "default" | "bordered" | "highlighted";
  /** Citation source */
  cite?: string;
  /** Author name */
  author?: string;
}

const variantStyles = {
  default: cn(
    "border-l-4 border-zinc-300 pl-4 italic",
    "dark:border-zinc-600"
  ),
  bordered: cn(
    "border-l-4 border-blue-500 pl-4 py-2",
    "bg-blue-50 dark:bg-blue-900/20"
  ),
  highlighted: cn(
    "border-l-4 border-amber-500 pl-4 py-2",
    "bg-amber-50 dark:bg-amber-900/20"
  ),
};

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
  function Blockquote(
    { variant = "default", cite, author, theme, className, children, ...props },
    ref
  ) {
    return (
      <figure data-theme={theme} className={className}>
        <blockquote
          ref={ref}
          cite={cite}
          className={cn(
            "text-zinc-700 dark:text-zinc-300",
            variantStyles[variant]
          )}
          {...props}
        >
          {children}
        </blockquote>
        {(author || cite) && (
          <figcaption className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {author && <span className="font-medium">{author}</span>}
            {author && cite && " — "}
            {cite && <cite className="not-italic">{cite}</cite>}
          </figcaption>
        )}
      </figure>
    );
  }
);
