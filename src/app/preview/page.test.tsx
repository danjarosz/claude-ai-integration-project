import { render, screen } from "@testing-library/react";
import PreviewPage from "./page";

describe("PreviewPage", () => {
  it("should render the UI Component Library heading", () => {
    render(<PreviewPage />);
    expect(screen.getByRole("heading", { level: 1, name: "UI Component Library" })).toBeInTheDocument();
  });

  it("should render component sections", () => {
    render(<PreviewPage />);
    expect(screen.getByRole("heading", { level: 2, name: "Buttons" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Form Inputs" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Typography" })).toBeInTheDocument();
  });
});