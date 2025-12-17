import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useTheme", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("should initialize with light theme by default", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it("should toggle theme from light to dark", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
  });

  it("should toggle theme from dark to light", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });
    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");
  });

  it("should persist theme to localStorage", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorage.getItem("theme-preference")).toBe("dark");
  });

  it("should load theme from localStorage on mount", () => {
    localStorage.setItem("theme-preference", "dark");

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
  });
});