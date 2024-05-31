import { render, screen, fireEvent } from "@testing-library/react";
import Menu from "../components/Menu/Menu";

describe("Menu component", () => {
  const mockSetSize = jest.fn();
  const mockSetLevel = jest.fn();
  const mockHandleGameStart = jest.fn();
  const mockSetInstructions = jest.fn();

  beforeEach(() => {
    mockSetSize.mockClear();
    mockSetLevel.mockClear();
    mockHandleGameStart.mockClear();
    mockSetInstructions.mockClear();
  });

  it("renders correctly with given props", () => {
    render(
      <Menu
        size={15}
        setSize={mockSetSize}
        level={5}
        setLevel={mockSetLevel}
        handleGameStart={mockHandleGameStart}
        setInstructions={mockSetInstructions}
      />
    );

    const howDoIPlayElement = screen.getByText("How do I play this game?");
    expect(howDoIPlayElement).toBeInTheDocument();

    expect(screen.getByText("How tough you feeling?")).toBeInTheDocument();
    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  it("calls setInstructions with true when 'How do I play this game?' button is clicked", () => {
    render(
      <Menu
        size={15}
        setSize={mockSetSize}
        level={5}
        setLevel={mockSetLevel}
        handleGameStart={mockHandleGameStart}
        setInstructions={mockSetInstructions}
      />
    );

    const instructionsButton = screen.getByText("How do I play this game?");
    fireEvent.click(instructionsButton);

    expect(mockSetInstructions).toHaveBeenCalledWith(true);
  });

  it("calls setSize with the new size value when the board size range input is changed", () => {
    render(
      <Menu
        size={15}
        setSize={mockSetSize}
        level={5}
        setLevel={mockSetLevel}
        handleGameStart={mockHandleGameStart}
        setInstructions={mockSetInstructions}
      />
    );

    const sizeInput = screen.getByLabelText(/Board Size:/);
    fireEvent.change(sizeInput, { target: { value: "18" } });

    expect(mockSetSize).toHaveBeenCalledWith(18);
  });

  it("calls setLevel with the new level value when the difficulty range input is changed", () => {
    render(
      <Menu
        size={15}
        setSize={mockSetSize}
        level={5}
        setLevel={mockSetLevel}
        handleGameStart={mockHandleGameStart}
        setInstructions={mockSetInstructions}
      />
    );

    const levelInput = screen.getByLabelText(/Difficulty:/);
    fireEvent.change(levelInput, { target: { value: "7" } });

    expect(mockSetLevel).toHaveBeenCalledWith(7);
  });

  it("calls handleGameStart when 'Start Game' button is clicked", () => {
    render(
      <Menu
        size={15}
        setSize={mockSetSize}
        level={5}
        setLevel={mockSetLevel}
        handleGameStart={mockHandleGameStart}
        setInstructions={mockSetInstructions}
      />
    );

    const startButton = screen.getByText("Start Game");
    fireEvent.click(startButton);

    expect(mockHandleGameStart).toHaveBeenCalled();
  });
});
