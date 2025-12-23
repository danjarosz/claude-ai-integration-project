import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface SelectProps
  extends BaseUIProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Select size */
  size?: Size;
  /** Error state */
  error?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

export interface OptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {
  className?: string;
}

const sizeStyles: Record<Size, string> = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-11 px-4 text-base",
  xl: "h-12 px-4 text-lg",
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { size = "md", error, placeholder, theme, className, children, ...props },
    ref
  ) {
    return (
      <select
        ref={ref}
        data-theme={theme}
        className={cn(
          "w-full appearance-none rounded-md border bg-transparent",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
          "border-zinc-300 bg-white text-zinc-900",
          "dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100",
          error && "border-red-500 focus:ring-red-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Arrow indicator
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);

export const Option = forwardRef<HTMLOptionElement, OptionProps>(
  function Option({ className, ...props }, ref) {
    return <option ref={ref} className={cn(className)} {...props} />;
  }
);
