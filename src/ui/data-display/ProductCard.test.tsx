import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";

describe("ProductCard", () => {
  const defaultProps = {
    name: "Test Product",
    price: 29.99,
    href: "/products/test",
  };

  it("should render product name", () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("should render formatted price", () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("should render string price as-is", () => {
    render(<ProductCard {...defaultProps} price="€19.99" />);
    expect(screen.getByText("€19.99")).toBeInTheDocument();
  });

  it("should render a link to product details", () => {
    render(<ProductCard {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/test");
  });

  it("should render placeholder image when imageUrl is not provided", () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render image when imageUrl is provided", () => {
    render(<ProductCard {...defaultProps} imageUrl="/product.jpg" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/product.jpg");
  });

  it("should use name as alt text when imageAlt is not provided", () => {
    render(<ProductCard {...defaultProps} imageUrl="/product.jpg" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Test Product");
  });

  it("should use custom imageAlt when provided", () => {
    render(
      <ProductCard
        {...defaultProps}
        imageUrl="/product.jpg"
        imageAlt="Custom Alt"
      />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Custom Alt");
  });

  it("should be disabled when disabled prop is true", () => {
    const { container } = render(<ProductCard {...defaultProps} disabled />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("aria-disabled", "true");
    expect(card).toHaveClass("opacity-50");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should set data-theme attribute", () => {
    const { container } = render(
      <ProductCard {...defaultProps} theme="dark" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("data-theme", "dark");
  });

  describe("variants", () => {
    it("should apply primary variant styles by default", () => {
      const { container } = render(<ProductCard {...defaultProps} />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-blue-200");
    });

    it("should apply secondary variant styles", () => {
      const { container } = render(
        <ProductCard {...defaultProps} variant="secondary" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-zinc-200");
    });

    it("should apply success variant styles", () => {
      const { container } = render(
        <ProductCard {...defaultProps} variant="success" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-green-200");
    });

    it("should apply danger variant styles", () => {
      const { container } = render(
        <ProductCard {...defaultProps} variant="danger" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-red-200");
    });

    it("should apply warning variant styles", () => {
      const { container } = render(
        <ProductCard {...defaultProps} variant="warning" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("border-amber-200");
    });
  });

  describe("sizes", () => {
    it("should apply medium size by default", () => {
      const { container } = render(<ProductCard {...defaultProps} />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("max-w-[280px]");
    });

    it("should apply small size styles", () => {
      const { container } = render(
        <ProductCard {...defaultProps} size="sm" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("max-w-[200px]");
    });

    it("should apply large size styles", () => {
      const { container } = render(
        <ProductCard {...defaultProps} size="lg" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("max-w-[360px]");
    });
  });

  it("should forward additional props", () => {
    const { container } = render(
      <ProductCard {...defaultProps} data-testid="product-card" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("data-testid", "product-card");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <ProductCard {...defaultProps} className="custom-class" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("custom-class");
  });
});