import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  test("renders the header with an image, title, and subtitle", () => {
    render(<Header />);

    const imageElement = screen.getByRole("img", {
      name: /snake plisskken's head/i,
    });
    const titleElement = screen.getByRole("heading", { name: /snake/i });
    const subTitleElement = screen.getByText(/on the brain/i);

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
  });

  test("checks that the image source is correct", () => {
    render(<Header />);
    const imageElement = screen.getByRole("img", {
      name: /snake plisskken's head/i,
    });
    expect(imageElement).toHaveAttribute(
      "src",
      expect.stringContaining("snake.png")
    );
  });
});
