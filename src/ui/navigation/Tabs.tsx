"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { cn } from "../utils/cn";
import type { BaseUIProps } from "../types";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab components must be used within a Tabs provider");
  }
  return context;
}

export interface TabsProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Default active tab */
  defaultTab?: string;
  /** Controlled active tab */
  activeTab?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
}

export interface TabListProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: "default" | "pills" | "underline";
}

export interface TabProps
  extends BaseUIProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique tab identifier */
  id: string;
  /** Is disabled */
  disabled?: boolean;
}

export interface TabPanelsProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {}

export interface TabPanelProps
  extends BaseUIProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Tab id this panel corresponds to */
  tabId: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    defaultTab = "",
    activeTab: controlledActiveTab,
    onTabChange,
    theme,
    className,
    children,
    ...props
  },
  ref
) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab);
  const activeTab = controlledActiveTab ?? internalActiveTab;

  const setActiveTab = useCallback(
    (id: string) => {
      if (controlledActiveTab === undefined) {
        setInternalActiveTab(id);
      }
      onTabChange?.(id);
    },
    [controlledActiveTab, onTabChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div ref={ref} data-theme={theme} className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  function TabList(
    { variant = "default", theme, className, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        role="tablist"
        data-theme={theme}
        className={cn(
          "flex",
          variant === "default" && "gap-1 border-b border-zinc-200 dark:border-zinc-700",
          variant === "pills" && "gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg",
          variant === "underline" && "gap-4 border-b border-zinc-200 dark:border-zinc-700",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { id, disabled, theme, className, children, ...props },
  ref
) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      data-theme={theme}
      onClick={() => setActiveTab(id)}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
        isActive && "border-b-2 border-blue-600 dark:border-blue-400 -mb-px",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  function TabPanels({ theme, className, children, ...props }, ref) {
    return (
      <div ref={ref} data-theme={theme} className={cn("mt-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel({ tabId, theme, className, children, ...props }, ref) {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === tabId;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${tabId}`}
        aria-labelledby={`tab-${tabId}`}
        data-theme={theme}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);
