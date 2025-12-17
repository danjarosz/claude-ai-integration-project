import { render, screen } from "@testing-library/react";
import PreviewPage from "./page";

describe("PreviewPage", () => {
  it("should render the Preview heading", () => {
    render(<PreviewPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Preview" })).toBeInTheDocument();
  });

  it("should render the preview placeholder text", () => {
    render(<PreviewPage />);
    expect(screen.getByText("Content preview will appear here.")).toBeInTheDocument();
  });
});