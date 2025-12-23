import { render, screen } from "@testing-library/react";
import BlogPage from "./page";

describe("BlogPage", () => {
  it("should render the Blog heading", () => {
    render(<BlogPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Blog" })).toBeInTheDocument();
  });

  it("should render the First Post article", () => {
    render(<BlogPage />);
    expect(screen.getByRole("heading", { level: 2, name: "First Post" })).toBeInTheDocument();
    expect(screen.getByText("This is a sample blog post.")).toBeInTheDocument();
  });

  it("should render the Second Post article", () => {
    render(<BlogPage />);
    expect(screen.getByRole("heading", { level: 2, name: "Second Post" })).toBeInTheDocument();
    expect(screen.getByText("Another sample blog post.")).toBeInTheDocument();
  });

  it("should render two posts", () => {
    render(<BlogPage />);
    const postHeadings = screen.getAllByRole("heading", { level: 2 });
    expect(postHeadings).toHaveLength(2);
  });
});