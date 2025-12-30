"use client";

import { useEffect, useId, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

export type ModalVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps extends BaseUIProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title (also used for aria-labelledby) */
  title?: string;
  /** Accessible label for the dialog (required if no title) */
  "aria-label"?: string;
  /** Modal variant */
  variant?: ModalVariant;
  /** Modal size */
  size?: ModalSize;
  /** Modal content */
  children: React.ReactNode;
}

const variantStyles: Record<ModalVariant, string> = {
  primary: cn(
    "border-blue-500",
    "dark:border-blue-400"
  ),
  secondary: cn(
    "border-slate-500",
    "dark:border-slate-400"
  ),
  success: cn(
    "border-green-500",
    "dark:border-green-400"
  ),
  danger: cn(
    "border-red-500",
    "dark:border-red-400"
  ),
  warning: cn(
    "border-amber-500",
    "dark:border-amber-400"
  ),
};

const headerStyles: Record<ModalVariant, string> = {
  primary: "border-b border-blue-100 dark:border-blue-900/50",
  secondary: "border-b border-slate-100 dark:border-slate-800/50",
  success: "border-b border-green-100 dark:border-green-900/50",
  danger: "border-b border-red-100 dark:border-red-900/50",
  warning: "border-b border-amber-100 dark:border-amber-900/50",
};

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  "aria-label": ariaLabel,
  variant = "primary",
  size = "md",
  theme,
  className,
  children,
}: ModalProps) {
  const titleId = useId();
  const contentId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Store trigger and manage focus
  useEffect(() => {
    if (open) {
      // Store the element that triggered the modal
      triggerRef.current = document.activeElement as HTMLElement;

      // Focus the close button using requestAnimationFrame for reliable timing
      const rafId = requestAnimationFrame(() => {
        const closeButton = modalRef.current?.querySelector(
          'button[aria-label="Close modal"]'
        ) as HTMLElement;
        closeButton?.focus();
      });

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else if (triggerRef.current && document.body.contains(triggerRef.current)) {
      // Return focus to trigger element only if it's still in the DOM
      triggerRef.current.focus();
    }
  }, [open, handleKeyDown]);

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [open]);

  if (!open) {
    return null;
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        data-testid="modal-backdrop"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        aria-describedby={contentId}
        data-theme={theme}
        className={cn(
          "relative z-10 w-full rounded-lg border-2 bg-white p-6 shadow-xl",
          "dark:bg-zinc-900 dark:text-white",
          variantStyles[variant],
          sizeStyles[size],
          "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-200",
          className
        )}
      >
        {/* Header - always show close button */}
        <div className={cn(
          "mb-4 flex items-center justify-between",
          title && "pb-4",
          title && headerStyles[variant]
        )}>
          {title ? (
            <h2
              id={titleId}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              {title}
            </h2>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={cn(
              "rounded-md p-2.5 text-gray-400 transition-colors",
              "hover:bg-gray-100 hover:text-gray-600",
              "dark:hover:bg-zinc-800 dark:hover:text-gray-200",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "dark:focus:ring-offset-zinc-900"
            )}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div id={contentId} className="text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );

  // Only use portal on client side
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}