"use client";

import { forwardRef, createContext, useContext } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

interface RadioGroupContextValue {
  name?: string;
  size?: Size;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

export interface RadioGroupProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Group name for all radio inputs */
  name?: string;
  /** Size for all radios in group */
  size?: Size;
  /** Disable all radios in group */
  disabled?: boolean;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
}

export interface RadioProps
  extends BaseUIProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Radio size */
  size?: Size;
  /** Error state */
  error?: boolean;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
}

const sizeStyles: Record<Size, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

const labelSizeStyles: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      name,
      size = "md",
      disabled,
      direction = "vertical",
      theme,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <RadioGroupContext.Provider value={{ name, size, disabled }}>
        <div
          ref={ref}
          role="radiogroup"
          data-theme={theme}
          className={cn(
            "flex",
            direction === "vertical" ? "flex-col gap-2" : "flex-row gap-4",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    size: sizeProp,
    error,
    label,
    description,
    theme,
    className,
    id,
    name: nameProp,
    disabled: disabledProp,
    ...props
  },
  ref
) {
  const context = useContext(RadioGroupContext);
  const size = sizeProp ?? context.size ?? "md";
  const name = nameProp ?? context.name;
  const disabled = disabledProp ?? context.disabled;

  const radioId = id || `radio-${Math.random().toString(36).slice(2)}`;

  const radio = (
    <input
      ref={ref}
      type="radio"
      id={radioId}
      name={name}
      disabled={disabled}
      data-theme={theme}
      className={cn(
        "rounded-full border transition-colors duration-150",
        "border-zinc-300 bg-white",
        "dark:border-zinc-600 dark:bg-zinc-800",
        "checked:border-blue-600 checked:bg-blue-600",
        "dark:checked:border-blue-500 dark:checked:bg-blue-500",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        error && "border-red-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizeStyles[size],
        !label && className
      )}
      {...props}
    />
  );

  if (!label) return radio;

  return (
    <div className={cn("flex items-start gap-2", className)}>
      {radio}
      <div className="flex flex-col">
        <label
          htmlFor={radioId}
          className={cn(
            "font-medium text-zinc-900 dark:text-zinc-100",
            labelSizeStyles[size],
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </label>
        {description && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </span>
        )}
      </div>
    </div>
  );
});
