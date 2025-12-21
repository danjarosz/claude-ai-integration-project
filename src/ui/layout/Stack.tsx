import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

type StackDirection = "horizontal" | "vertical";
type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
type StackJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";
type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

export interface StackProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  direction?: StackDirection;
  /** Alignment on cross axis */
  align?: StackAlign;
  /** Justify on main axis */
  justify?: StackJustify;
  /** Gap between items (Tailwind spacing scale) */
  gap?: StackGap;
  /** Wrap items */
  wrap?: boolean;
  /** Reverse order */
  reverse?: boolean;
}

const gapStyles: Record<StackGap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
};

const alignStyles: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyStyles: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    direction = "vertical",
    align = "stretch",
    justify = "start",
    gap = 4,
    wrap = false,
    reverse = false,
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      data-theme={theme}
      className={cn(
        "flex",
        direction === "horizontal" && !reverse && "flex-row",
        direction === "horizontal" && reverse && "flex-row-reverse",
        direction === "vertical" && !reverse && "flex-col",
        direction === "vertical" && reverse && "flex-col-reverse",
        alignStyles[align],
        justifyStyles[justify],
        gapStyles[gap],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const HStack = forwardRef<
  HTMLDivElement,
  Omit<StackProps, "direction">
>(function HStack(props, ref) {
  return <Stack ref={ref} direction="horizontal" {...props} />;
});

export const VStack = forwardRef<
  HTMLDivElement,
  Omit<StackProps, "direction">
>(function VStack(props, ref) {
  return <Stack ref={ref} direction="vertical" {...props} />;
});
