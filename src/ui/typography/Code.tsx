import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface CodeProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {
  /** Size variant */
  size?: Size;
  /** Color variant */
  color?: "default" | "primary" | "success" | "warning" | "error";
}

export interface PreProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLPreElement> {
  /** Show line numbers */
  lineNumbers?: boolean;
  /** Language for syntax highlighting hint */
  language?: string;
  /** Overflow behavior */
  overflow?: "scroll" | "wrap";
}

export interface KbdProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLElement> {
  /** Size variant */
  size?: Size;
}

const codeSizeStyles: Record<Size, string> = {
  xs: "text-xs px-1 py-0.5",
  sm: "text-xs px-1.5 py-0.5",
  md: "text-sm px-1.5 py-0.5",
  lg: "text-sm px-2 py-1",
  xl: "text-base px-2 py-1",
};

const codeColorStyles = {
  default: cn(
    "bg-zinc-100 text-zinc-800",
    "dark:bg-zinc-800 dark:text-zinc-200"
  ),
  primary: cn(
    "bg-blue-100 text-blue-800",
    "dark:bg-blue-900/30 dark:text-blue-300"
  ),
  success: cn(
    "bg-green-100 text-green-800",
    "dark:bg-green-900/30 dark:text-green-300"
  ),
  warning: cn(
    "bg-amber-100 text-amber-800",
    "dark:bg-amber-900/30 dark:text-amber-300"
  ),
  error: cn(
    "bg-red-100 text-red-800",
    "dark:bg-red-900/30 dark:text-red-300"
  ),
};

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  { size = "md", color = "default", theme, className, children, ...props },
  ref
) {
  return (
    <code
      ref={ref}
      data-theme={theme}
      className={cn(
        "rounded font-mono",
        codeSizeStyles[size],
        codeColorStyles[color],
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
});

export const Pre = forwardRef<HTMLPreElement, PreProps>(function Pre(
  {
    lineNumbers,
    language,
    overflow = "scroll",
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <pre
      ref={ref}
      data-theme={theme}
      data-language={language}
      className={cn(
        "rounded-lg p-4 font-mono text-sm",
        "bg-zinc-900 text-zinc-100",
        "dark:bg-zinc-950",
        overflow === "scroll" && "overflow-x-auto",
        overflow === "wrap" && "whitespace-pre-wrap break-words",
        lineNumbers && "[counter-reset:line]",
        lineNumbers &&
          "[&>code]:before:content-[counter(line)] [&>code]:before:mr-4 [&>code]:before:text-zinc-500 [&>code]:before:[counter-increment:line]",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  );
});

const kbdSizeStyles: Record<Size, string> = {
  xs: "text-xs px-1 py-0.5 min-w-[1.25rem]",
  sm: "text-xs px-1.5 py-0.5 min-w-[1.5rem]",
  md: "text-sm px-2 py-0.5 min-w-[1.75rem]",
  lg: "text-sm px-2.5 py-1 min-w-[2rem]",
  xl: "text-base px-3 py-1 min-w-[2.25rem]",
};

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { size = "md", theme, className, children, ...props },
  ref
) {
  return (
    <kbd
      ref={ref}
      data-theme={theme}
      className={cn(
        "inline-flex items-center justify-center rounded border font-mono font-medium",
        "bg-zinc-50 border-zinc-300 text-zinc-700 shadow-sm",
        "dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-300",
        kbdSizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
});
