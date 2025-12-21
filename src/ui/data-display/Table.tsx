import { forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export interface TableProps
  extends BaseUIProps,
    React.TableHTMLAttributes<HTMLTableElement> {
  /** Table variant */
  variant?: "default" | "striped" | "bordered";
  /** Compact sizing */
  compact?: boolean;
}

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  selected?: boolean;
}

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { variant = "default", compact, theme, className, ...props },
  ref
) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        data-theme={theme}
        className={cn(
          "w-full caption-bottom text-sm",
          variant === "bordered" && "border border-zinc-200 dark:border-zinc-700",
          className
        )}
        {...props}
      />
    </div>
  );
});

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead({ className, ...props }, ref) {
    return (
      <thead
        ref={ref}
        className={cn(
          "border-b bg-zinc-50 dark:bg-zinc-800/50",
          "[&_tr]:border-b",
          className
        )}
        {...props}
      />
    );
  }
);

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, ...props }, ref) {
    return (
      <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
      />
    );
  }
);

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ selected, className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-zinc-200 dark:border-zinc-700 transition-colors",
          "hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
          selected && "bg-zinc-100 dark:bg-zinc-800",
          className
        )}
        {...props}
      />
    );
  }
);

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(function TableHeaderCell({ className, ...props }, ref) {
  return (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium",
        "text-zinc-500 dark:text-zinc-400",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
});

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ className, ...props }, ref) {
    return (
      <td
        ref={ref}
        className={cn(
          "p-4 align-middle",
          "[&:has([role=checkbox])]:pr-0",
          className
        )}
        {...props}
      />
    );
  }
);
