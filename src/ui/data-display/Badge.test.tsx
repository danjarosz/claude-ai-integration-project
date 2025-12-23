import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("should render with children", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("should apply color styles", () => {
    render(<Badge color="primary">Primary</Badge>);
    expect(screen.getByText("Primary")).toHaveClass("text-blue-800");
  });

  it("should apply solid variant styles", () => {
    render(<Badge variant="solid" color="primary">Solid</Badge>);
    expect(screen.getByText("Solid")).toHaveClass("bg-blue-600");
  });

  it("should apply outline variant styles", () => {
    render(<Badge variant="outline" color="primary">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass("border-blue-600");
  });

  it("should apply rounded styles when rounded prop is true", () => {
    render(<Badge rounded>Rounded</Badge>);
    expect(screen.getByText("Rounded")).toHaveClass("rounded-full");
  });

  it("should apply size styles", () => {
    render(<Badge size="lg">Large</Badge>);
    expect(screen.getByText("Large")).toHaveClass("text-sm");
  });

  it("should set data-theme attribute", () => {
    render(<Badge theme="dark">Dark</Badge>);
    expect(screen.getByText("Dark")).toHaveAttribute("data-theme", "dark");
  });

  it("should apply custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });
});