import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface SectionProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {
  /** Vertical padding */
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background variant */
  variant?: "default" | "muted" | "card";
}

export interface ArticleProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {
  /** Prose styling for article content */
  prose?: boolean;
}

export interface AsideProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {
  /** Position hint */
  position?: "left" | "right";
  /** Width */
  width?: "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "py-4",
  md: "py-8",
  lg: "py-12",
  xl: "py-16",
};

const variantStyles = {
  default: "",
  muted: "bg-zinc-50 dark:bg-zinc-900",
  card: cn(
    "bg-white border border-zinc-200 rounded-lg",
    "dark:bg-zinc-800 dark:border-zinc-700"
  ),
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { padding = "md", variant = "default", theme, className, children, ...props },
  ref
) {
  return (
    <section
      ref={ref}
      data-theme={theme}
      className={cn(paddingStyles[padding], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </section>
  );
});

export const Article = forwardRef<HTMLElement, ArticleProps>(function Article(
  { prose, theme, className, children, ...props },
  ref
) {
  return (
    <article
      ref={ref}
      data-theme={theme}
      className={cn(
        prose && [
          "prose prose-zinc dark:prose-invert",
          "max-w-none",
          "prose-headings:font-semibold",
          "prose-a:text-blue-600 dark:prose-a:text-blue-400",
          "prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1 prose-code:py-0.5",
          "dark:prose-code:bg-zinc-800",
        ],
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
});

const widthStyles = {
  sm: "w-48",
  md: "w-64",
  lg: "w-80",
};

export const Aside = forwardRef<HTMLElement, AsideProps>(function Aside(
  { position, width = "md", theme, className, children, ...props },
  ref
) {
  return (
    <aside
      ref={ref}
      data-theme={theme}
      className={cn(
        widthStyles[width],
        position === "left" && "order-first",
        position === "right" && "order-last",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
});
