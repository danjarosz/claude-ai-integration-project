import { render, screen } from "@testing-library/react";

jest.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import RootLayout from "./layout";

describe("RootLayout", () => {
  it("should render children", () => {
    render(
      <RootLayout>
        <div data-testid="child">Test Child</div>
      </RootLayout>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("should render navigation", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render Home link", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("should render Blog link", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
  });

  it("should render Preview link", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(screen.getByRole("link", { name: "Preview" })).toHaveAttribute("href", "/preview");
  });
});