import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("should render an input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("should handle value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("should apply error styles when error prop is true", () => {
    render(<Input error />);
    expect(screen.getByRole("textbox")).toHaveClass("border-red-500");
  });

  it("should render left addon", () => {
    render(<Input leftAddon={<span data-testid="left-addon">@</span>} />);
    expect(screen.getByTestId("left-addon")).toBeInTheDocument();
  });

  it("should render right addon", () => {
    render(<Input rightAddon={<span data-testid="right-addon">!</span>} />);
    expect(screen.getByTestId("right-addon")).toBeInTheDocument();
  });

  it("should apply size styles", () => {
    render(<Input size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-11");
  });

  it("should set data-theme attribute", () => {
    render(<Input theme="dark" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-theme", "dark");
  });
});