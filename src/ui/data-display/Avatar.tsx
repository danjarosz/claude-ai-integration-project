"use client";

import { forwardRef, useState } from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps, Size } from "../types";

export interface AvatarProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLSpanElement> {
  /** Image source */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (initials) */
  fallback?: string;
  /** Avatar size */
  size?: Size;
  /** Shape variant */
  shape?: "circle" | "square";
}

const sizeStyles: Record<Size, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    src,
    alt,
    fallback,
    size = "md",
    shape = "circle",
    theme,
    className,
    ...props
  },
  ref
) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !src || imageError;

  return (
    <span
      ref={ref}
      data-theme={theme}
      className={cn(
        "inline-flex items-center justify-center overflow-hidden",
        "bg-zinc-200 dark:bg-zinc-700",
        sizeStyles[size],
        shape === "circle" && "rounded-full",
        shape === "square" && "rounded-md",
        className
      )}
      {...props}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt || ""}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-medium text-zinc-600 dark:text-zinc-300">
          {fallback || alt?.charAt(0).toUpperCase() || "?"}
        </span>
      )}
    </span>
  );
});
