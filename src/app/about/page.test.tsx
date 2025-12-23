import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("should render the About heading", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 2, name: "About" })).toBeInTheDocument();
  });

  it("should render the description text", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
  });
});
