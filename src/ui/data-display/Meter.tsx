import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size, ColorVariant } from "../types";

export interface ProgressProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Size variant */
  size?: Size;
  /** Color variant */
  color?: ColorVariant;
  /** Show value label */
  showValue?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
}

export interface MeterProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Low threshold */
  low?: number;
  /** High threshold */
  high?: number;
  /** Optimum value */
  optimum?: number;
  /** Size variant */
  size?: Size;
}

const sizeStyles: Record<Size, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
  xl: "h-4",
};

const colorStyles: Record<ColorVariant, string> = {
  primary: "bg-blue-600 dark:bg-blue-500",
  secondary: "bg-zinc-600 dark:bg-zinc-500",
  success: "bg-green-600 dark:bg-green-500",
  warning: "bg-amber-500 dark:bg-amber-400",
  error: "bg-red-600 dark:bg-red-500",
  info: "bg-cyan-600 dark:bg-cyan-500",
  neutral: "bg-zinc-400 dark:bg-zinc-500",
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value = 0,
      max = 100,
      size = "md",
      color = "primary",
      showValue,
      indeterminate,
      theme,
      className,
      ...props
    },
    ref
  ) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        data-theme={theme}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn("w-full", className)}
        {...props}
      >
        <div
          className={cn(
            "w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700",
            sizeStyles[size]
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              colorStyles[color],
              indeterminate && "animate-pulse w-full"
            )}
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
        {showValue && !indeterminate && (
          <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

function getMeterColor(
  value: number,
  min: number,
  max: number,
  low?: number,
  high?: number,
  optimum?: number
): string {
  const range = max - min;
  const normalizedValue = (value - min) / range;

  if (low !== undefined && high !== undefined && optimum !== undefined) {
    const normalizedLow = (low - min) / range;
    const normalizedHigh = (high - min) / range;
    const normalizedOptimum = (optimum - min) / range;

    if (normalizedOptimum <= normalizedLow) {
      if (normalizedValue <= normalizedLow) return colorStyles.success;
      if (normalizedValue <= normalizedHigh) return colorStyles.warning;
      return colorStyles.error;
    } else if (normalizedOptimum >= normalizedHigh) {
      if (normalizedValue >= normalizedHigh) return colorStyles.success;
      if (normalizedValue >= normalizedLow) return colorStyles.warning;
      return colorStyles.error;
    } else {
      if (normalizedValue >= normalizedLow && normalizedValue <= normalizedHigh)
        return colorStyles.success;
      return colorStyles.warning;
    }
  }

  return colorStyles.primary;
}

export const Meter = forwardRef<HTMLDivElement, MeterProps>(function Meter(
  {
    value,
    min = 0,
    max = 100,
    low,
    high,
    optimum,
    size = "md",
    theme,
    className,
    ...props
  },
  ref
) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const colorClass = getMeterColor(value, min, max, low, high, optimum);

  return (
    <div
      ref={ref}
      data-theme={theme}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className={cn("w-full", className)}
      {...props}
    >
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            colorClass
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});
