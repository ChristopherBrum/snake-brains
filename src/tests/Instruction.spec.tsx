import { render, screen, fireEvent } from "@testing-library/react";
import Instruction from "../components/Instruction/Instruction";

jest.mock("../../assets/snake.png", () => "snake.png");
jest.mock("../components/Button/Button", () => ({
  __esModule: true,
  default: ({ title, clickHandler }: { title: string, clickHandler: () => void }) => (
    <button onClick={clickHandler}>{title}</button>
  ),
}));

describe("Instruction Component", () => {
  const setInstructions = jest.fn();

  beforeEach(() => {
    render(<Instruction setInstructions={setInstructions} />);
  });

  test("renders the correct title and subtitle", () => {
    expect(screen.getByText("SNAKE")).toBeInTheDocument();
    expect(screen.getByText("on the Brain")).toBeInTheDocument();
  });

  test("renders the image with correct alt text", () => {
    const image = screen.getByAltText("Snake Plisskken's head");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("snake.png"));
  });

  test("renders all the paragraphs", () => {
    const paragraphs = screen.getAllByText(
      /Alright, listen up|In this game|You're navigating|Use the arrow keys|Remember,/
    );
    expect(paragraphs).toHaveLength(5);
  });

  test("renders the button with correct title", () => {
    const button = screen.getByRole("button", { name: "Let's do this." });
    expect(button).toBeInTheDocument();
  });

  test("clicking the button calls setInstructions with false", () => {
    const button = screen.getByRole("button", { name: "Let's do this." });
    fireEvent.click(button);
    expect(setInstructions).toHaveBeenCalledWith(false);
  });

  test("clicking the wrapper calls setInstructions with false", () => {
    const wrapper = screen.getByTestId("wrapper");
    fireEvent.click(wrapper);
    expect(setInstructions).toHaveBeenCalledWith(false);
  });
});
