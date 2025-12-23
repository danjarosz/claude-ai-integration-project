/** Theme types for explicit dark/light mode control */
export type Theme = "light" | "dark";

/** Size variants used across components */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

/** Color variants following Tailwind conventions */
export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

/** Intent-based variants for buttons and interactive elements */
export type Intent = "default" | "primary" | "destructive" | "ghost" | "outline";

/** Common base props for all UI components */
export interface BaseUIProps {
  /** Explicit theme override (bypasses automatic detection) */
  theme?: Theme;
  /** Additional CSS classes */
  className?: string;
}

/** Polymorphic component helper - gets ref type for element */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/** Polymorphic component props without ref */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = object
> = Props &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props> & {
    as?: C;
  };

/** Polymorphic component props with ref */
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = object
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };
