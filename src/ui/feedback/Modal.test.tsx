import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("should not render when closed", () => {
    render(
      <Modal open={false} onClose={() => {}}>
        Modal content
      </Modal>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render when open", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Modal content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("should have dialog role", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should render title when provided", () => {
    render(
      <Modal open={true} onClose={() => {}} title="Modal Title">
        Content
      </Modal>
    );
    expect(screen.getByText("Modal Title")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    );
    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when backdrop is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByTestId("modal-backdrop"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when modal content is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose}>
        <button>Click me</button>
      </Modal>
    );
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("should call onClose when Escape key is pressed", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose}>
        Content
      </Modal>
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  // Variant tests
  it("should apply primary variant styles by default", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("border-blue-500");
  });

  it("should apply secondary variant styles", () => {
    render(
      <Modal open={true} onClose={() => {}} variant="secondary">
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("border-slate-500");
  });

  it("should apply success variant styles", () => {
    render(
      <Modal open={true} onClose={() => {}} variant="success">
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("border-green-500");
  });

  it("should apply danger variant styles", () => {
    render(
      <Modal open={true} onClose={() => {}} variant="danger">
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("border-red-500");
  });

  it("should apply warning variant styles", () => {
    render(
      <Modal open={true} onClose={() => {}} variant="warning">
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("border-amber-500");
  });

  // Size tests
  it("should apply sm size styles", () => {
    render(
      <Modal open={true} onClose={() => {}} size="sm">
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("max-w-sm");
  });

  it("should apply md size styles by default", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("max-w-md");
  });

  it("should apply lg size styles", () => {
    render(
      <Modal open={true} onClose={() => {}} size="lg">
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveClass("max-w-lg");
  });

  // Theme test
  it("should set data-theme attribute", () => {
    render(
      <Modal open={true} onClose={() => {}} theme="dark">
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("data-theme", "dark");
  });

  // Backdrop test
  it("should render semi-transparent backdrop", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>
    );
    const backdrop = screen.getByTestId("modal-backdrop");
    expect(backdrop).toHaveClass("bg-black/50");
  });

  // Accessibility tests
  it("should have aria-modal attribute", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("should have aria-labelledby when title is provided", () => {
    render(
      <Modal open={true} onClose={() => {}} title="Test Title">
        Content
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby");
    const labelId = dialog.getAttribute("aria-labelledby");
    expect(screen.getByText("Test Title")).toHaveAttribute("id", labelId);
  });
});
