import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface FormProps
  extends BaseUIProps,
    React.FormHTMLAttributes<HTMLFormElement> {
  /** Form layout */
  layout?: "vertical" | "horizontal" | "inline";
  /** Gap between form fields */
  gap?: "sm" | "md" | "lg";
}

export interface FormFieldProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction */
  direction?: "vertical" | "horizontal";
}

export interface FormMessageProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLParagraphElement> {
  /** Message type */
  type?: "error" | "success" | "warning" | "info";
}

const layoutStyles = {
  vertical: "flex flex-col",
  horizontal: "flex flex-row flex-wrap items-start",
  inline: "flex flex-row flex-wrap items-end",
};

const gapStyles = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { layout = "vertical", gap = "md", theme, className, children, ...props },
  ref
) {
  return (
    <form
      ref={ref}
      data-theme={theme}
      className={cn(layoutStyles[layout], gapStyles[gap], className)}
      {...props}
    >
      {children}
    </form>
  );
});

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  function FormField(
    { direction = "vertical", theme, className, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-theme={theme}
        className={cn(
          "flex",
          direction === "vertical" && "flex-col gap-1.5",
          direction === "horizontal" && "flex-row items-center gap-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const messageStyles = {
  error: "text-red-600 dark:text-red-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-blue-600 dark:text-blue-400",
};

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  function FormMessage(
    { type = "error", theme, className, children, ...props },
    ref
  ) {
    return (
      <p
        ref={ref}
        data-theme={theme}
        role={type === "error" ? "alert" : undefined}
        className={cn("text-sm", messageStyles[type], className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
