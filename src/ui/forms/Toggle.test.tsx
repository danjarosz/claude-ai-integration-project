import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("should render a toggle switch", () => {
    render(<Toggle />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("should toggle on click", () => {
    const handleChange = jest.fn();
    render(<Toggle onChange={handleChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Toggle disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("should render label when provided", () => {
    render(<Toggle label="Enable notifications" />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    render(<Toggle label="Notifications" description="Receive email notifications" />);
    expect(screen.getByText("Receive email notifications")).toBeInTheDocument();
  });

  it("should apply size styles", () => {
    const { container } = render(<Toggle size="lg" />);
    const track = container.querySelector("span.rounded-full.transition-colors");
    expect(track).toHaveClass("h-7", "w-14");
  });

  it("should apply small size styles", () => {
    const { container } = render(<Toggle size="sm" />);
    const track = container.querySelector("span.rounded-full.transition-colors");
    expect(track).toHaveClass("h-5", "w-9");
  });

  it("should set data-theme attribute", () => {
    const { container } = render(<Toggle theme="dark" />);
    const label = container.querySelector("label");
    expect(label).toHaveAttribute("data-theme", "dark");
  });

  it("should be checked when defaultChecked is true", () => {
    render(<Toggle defaultChecked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("should support controlled checked state", () => {
    render(<Toggle checked={true} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("should apply primary variant by default", () => {
    const { container } = render(<Toggle />);
    const track = container.querySelector("span.rounded-full.transition-colors");
    expect(track).toHaveClass("peer-checked:bg-[var(--primary)]");
  });

  it("should apply danger variant styles", () => {
    const { container } = render(<Toggle variant="danger" />);
    const track = container.querySelector("span.rounded-full.transition-colors");
    expect(track).toHaveClass("peer-checked:bg-[var(--error)]");
  });

  it("should apply success variant styles", () => {
    const { container } = render(<Toggle variant="success" />);
    const track = container.querySelector("span.rounded-full.transition-colors");
    expect(track).toHaveClass("peer-checked:bg-[var(--success)]");
  });

  it("should apply warning variant styles", () => {
    const { container } = render(<Toggle variant="warning" />);
    const track = container.querySelector("span.rounded-full.transition-colors");
    expect(track).toHaveClass("peer-checked:bg-[var(--warning)]");
  });

  it("should apply secondary variant styles", () => {
    const { container } = render(<Toggle variant="secondary" />);
    const track = container.querySelector("span.rounded-full.transition-colors");
    expect(track).toHaveClass("peer-checked:bg-[var(--secondary)]");
  });
});
