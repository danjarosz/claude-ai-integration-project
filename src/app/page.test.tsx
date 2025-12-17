import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string }) => <img alt={props.alt} />,
}));

describe("Home", () => {
  it("should render the Next.js logo", () => {
    render(<Home />);
    expect(screen.getByAltText("Next.js logo")).toBeInTheDocument();
  });

  it("should render the getting started heading", () => {
    render(<Home />);
    expect(
      screen.getByText(/To get started, edit the page.tsx file/i)
    ).toBeInTheDocument();
  });

  it("should render Templates link", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Templates" })).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com/templates")
    );
  });

  it("should render Learning link", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Learning" })).toHaveAttribute(
      "href",
      expect.stringContaining("nextjs.org/learn")
    );
  });

  it("should render Deploy Now button", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /Deploy Now/i })).toBeInTheDocument();
  });

  it("should render Documentation link", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Documentation" })).toBeInTheDocument();
  });
});
