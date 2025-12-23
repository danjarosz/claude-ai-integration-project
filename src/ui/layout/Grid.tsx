import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "none";
type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

export interface GridProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  cols?: GridCols;
  /** Responsive columns (sm breakpoint) */
  colsSm?: GridCols;
  /** Responsive columns (md breakpoint) */
  colsMd?: GridCols;
  /** Responsive columns (lg breakpoint) */
  colsLg?: GridCols;
  /** Gap between items */
  gap?: GridGap;
  /** Row gap */
  gapY?: GridGap;
  /** Column gap */
  gapX?: GridGap;
}

const colStyles: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
  none: "grid-cols-none",
};

const colSmStyles: Record<GridCols, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  7: "sm:grid-cols-7",
  8: "sm:grid-cols-8",
  9: "sm:grid-cols-9",
  10: "sm:grid-cols-10",
  11: "sm:grid-cols-11",
  12: "sm:grid-cols-12",
  none: "sm:grid-cols-none",
};

const colMdStyles: Record<GridCols, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  7: "md:grid-cols-7",
  8: "md:grid-cols-8",
  9: "md:grid-cols-9",
  10: "md:grid-cols-10",
  11: "md:grid-cols-11",
  12: "md:grid-cols-12",
  none: "md:grid-cols-none",
};

const colLgStyles: Record<GridCols, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
  8: "lg:grid-cols-8",
  9: "lg:grid-cols-9",
  10: "lg:grid-cols-10",
  11: "lg:grid-cols-11",
  12: "lg:grid-cols-12",
  none: "lg:grid-cols-none",
};

const gapStyles: Record<GridGap, string> = {
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

const gapYStyles: Record<GridGap, string> = {
  0: "gap-y-0",
  1: "gap-y-1",
  2: "gap-y-2",
  3: "gap-y-3",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  8: "gap-y-8",
  10: "gap-y-10",
  12: "gap-y-12",
  16: "gap-y-16",
};

const gapXStyles: Record<GridGap, string> = {
  0: "gap-x-0",
  1: "gap-x-1",
  2: "gap-x-2",
  3: "gap-x-3",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  8: "gap-x-8",
  10: "gap-x-10",
  12: "gap-x-12",
  16: "gap-x-16",
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    cols = 1,
    colsSm,
    colsMd,
    colsLg,
    gap = 4,
    gapY,
    gapX,
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
        "grid",
        colStyles[cols],
        colsSm && colSmStyles[colsSm],
        colsMd && colMdStyles[colsMd],
        colsLg && colLgStyles[colsLg],
        !gapY && !gapX && gapStyles[gap],
        gapY && gapYStyles[gapY],
        gapX && gapXStyles[gapX],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
