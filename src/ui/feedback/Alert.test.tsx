import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("should render with children", () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText("Alert message")).toBeInTheDocument();
  });

  it("should have alert role", () => {
    render(<Alert>Alert</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should render title when provided", () => {
    render(<Alert title="Alert Title">Message</Alert>);
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
  });

  it("should apply info variant styles by default", () => {
    render(<Alert>Info alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("border-blue-200");
  });

  it("should apply success variant styles", () => {
    render(<Alert variant="success">Success alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("border-green-200");
  });

  it("should apply warning variant styles", () => {
    render(<Alert variant="warning">Warning alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("border-amber-200");
  });

  it("should apply error variant styles", () => {
    render(<Alert variant="error">Error alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("border-red-200");
  });

  it("should show dismiss button when dismissible", () => {
    render(<Alert dismissible>Dismissible alert</Alert>);
    expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
  });

  it("should call onDismiss when dismiss button clicked", () => {
    const handleDismiss = jest.fn();
    render(<Alert dismissible onDismiss={handleDismiss}>Dismissible</Alert>);
    fireEvent.click(screen.getByLabelText("Dismiss"));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("should set data-theme attribute", () => {
    render(<Alert theme="dark">Dark</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute("data-theme", "dark");
  });
});