import { forwardRef } from "react";
import NextLink from "next/link";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export type ProductCardVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";

export interface ProductCardProps
  extends BaseUIProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Product name */
  name: string;
  /** Product price */
  price: string | number;
  /** Link to product details page */
  href: string;
  /** Product image URL (optional, uses placeholder if not provided) */
  imageUrl?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Color variant */
  variant?: ProductCardVariant;
  /** Card size */
  size?: "sm" | "md" | "lg";
  /** Disabled state */
  disabled?: boolean;
}

const variantStyles: Record<ProductCardVariant, string> = {
  primary: cn(
    "border-blue-200 hover:border-blue-400",
    "dark:border-blue-800 dark:hover:border-blue-600"
  ),
  secondary: cn(
    "border-zinc-200 hover:border-zinc-400",
    "dark:border-zinc-700 dark:hover:border-zinc-500"
  ),
  success: cn(
    "border-green-200 hover:border-green-400",
    "dark:border-green-800 dark:hover:border-green-600"
  ),
  danger: cn(
    "border-red-200 hover:border-red-400",
    "dark:border-red-800 dark:hover:border-red-600"
  ),
  warning: cn(
    "border-amber-200 hover:border-amber-400",
    "dark:border-amber-800 dark:hover:border-amber-600"
  ),
};

const variantAccentStyles: Record<ProductCardVariant, string> = {
  primary: "bg-blue-600 text-white dark:bg-blue-500",
  secondary: "bg-zinc-600 text-white dark:bg-zinc-500",
  success: "bg-green-600 text-white dark:bg-green-500",
  danger: "bg-red-600 text-white dark:bg-red-500",
  warning: "bg-amber-500 text-white dark:bg-amber-400",
};

const sizeStyles = {
  sm: {
    card: "max-w-[200px]",
    image: "h-32",
    padding: "p-3",
    name: "text-sm",
    price: "text-base",
  },
  md: {
    card: "max-w-[280px]",
    image: "h-44",
    padding: "p-4",
    name: "text-base",
    price: "text-lg",
  },
  lg: {
    card: "max-w-[360px]",
    image: "h-56",
    padding: "p-5",
    name: "text-lg",
    price: "text-xl",
  },
};

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  function ProductCard(
    {
      name,
      price,
      href,
      imageUrl,
      imageAlt,
      variant = "primary",
      size = "md",
      disabled = false,
      theme,
      className,
      ...props
    },
    ref
  ) {
    const formattedPrice =
      typeof price === "number"
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)
        : price;

    const sizeStyle = sizeStyles[size];

    const cardContent = (
      <>
        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden rounded-t-lg bg-zinc-100 dark:bg-zinc-800",
            sizeStyle.image
          )}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={imageAlt || name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-12 w-12 text-zinc-400 dark:text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className={cn(sizeStyle.padding)}>
          <h3
            className={cn(
              "font-medium text-zinc-900 dark:text-zinc-100",
              "truncate",
              sizeStyle.name
            )}
          >
            {name}
          </h3>
          <p
            className={cn(
              "mt-1 font-semibold",
              variantAccentStyles[variant],
              "inline-block rounded px-2 py-0.5",
              sizeStyle.price
            )}
          >
            {formattedPrice}
          </p>
        </div>
      </>
    );

    const cardClasses = cn(
      "group block w-full overflow-hidden rounded-lg border-2 transition-all duration-200",
      "bg-white dark:bg-zinc-900",
      variantStyles[variant],
      sizeStyle.card,
      disabled && "pointer-events-none opacity-50 cursor-not-allowed",
      !disabled && "cursor-pointer hover:shadow-lg",
      className
    );

    if (disabled) {
      return (
        <div
          ref={ref}
          data-theme={theme}
          className={cardClasses}
          aria-disabled="true"
          {...props}
        >
          {cardContent}
        </div>
      );
    }

    return (
      <div ref={ref} data-theme={theme} className={cardClasses} {...props}>
        <NextLink href={href} className="block">
          {cardContent}
        </NextLink>
      </div>
    );
  }
);