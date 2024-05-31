import { render, screen, fireEvent } from "@testing-library/react";
import Game from "../components/Game/Game";
import useInterval from "../components/useInterval/useInterval";

jest.mock("../../assets/brain.png", () => "brain.png");

jest.mock("../components/LostModal/LostModal", () => {
  return jest.fn(() => <div>Lost Modal</div>);
});

jest.mock("../components/useInterval/useInterval", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Game component", () => {
  const size = 10;
  const level = 1;
  const setGameStart = jest.fn();
  const BASELINE_MOVEMENT_INTERVAL = 400;
  const MS_CHANGE_PER_LEVEL = 35;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the initial game board", () => {
    render(<Game size={size} level={level} setGameStart={setGameStart} />);
    const board = screen.getByRole("grid");
    expect(board).toBeInTheDocument();
  
    const rows = board.children
    expect(rows).toHaveLength(size);
  });

  it("calls the moveSnake function at the correct interval", () => {
    render(<Game size={size} level={level} setGameStart={setGameStart} />);
    expect(useInterval).toHaveBeenCalled();
    const interval = BASELINE_MOVEMENT_INTERVAL - level * MS_CHANGE_PER_LEVEL;

    const calls = (useInterval as jest.Mock).mock.calls;
    const matchingCall = calls.find(([curr]) => {
      return (typeof curr.callback === 'function' && curr.delay === interval);
    });
    expect(matchingCall).toBeDefined();
  });

  it("initializes the game state correctly", () => {
    render(<Game size={size} level={level} setGameStart={setGameStart} />);
    expect(screen.getByText(/Difficulty:/)).toBeInTheDocument();
    expect(screen.getByText(level.toString())).toBeInTheDocument();
    expect(screen.getByText(/'s eaten:/)).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("handles arrow key events for changing direction", () => {
    const setDirection = jest.fn();
    useStateMock.mockReturnValue(['', setDirection]);

    render(<Game size={size} level={level} setGameStart={setGameStart} />);
    const board = screen.getByRole("grid");

    fireEvent.keyDown(board, { key: "ArrowUp" });
    expect(setDirection).toHaveBeenCalledWith("UP");

    fireEvent.keyDown(board, { key: "ArrowDown" });
    expect(setDirection).toHaveBeenCalledWith("DOWN");

    fireEvent.keyDown(board, { key: "ArrowLeft" });
    expect(setDirection).toHaveBeenCalledWith("LEFT");

    fireEvent.keyDown(board, { key: "ArrowRight" });
    expect(setDirection).toHaveBeenCalledWith("RIGHT");
  });
  
  // it("increases difficulty level based on brains eaten", () => {
  //   render(<Game size={size} level={level} setGameStart={setGameStart} />);
  //   for (let i = 0; i < 10; i++) {
  //     fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowRight" });
  //   }
  //   expect(screen.getByText("2")).toBeInTheDocument();
  // });

  // it("shows the LostModal when the game is over", () => {
  //   render(<Game size={size} level={level} setGameStart={setGameStart} />);
  //   fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowRight" });
  //   expect(screen.getByText("Lost Modal")).toBeInTheDocument();
  // });

  // it("calls setGameStart when the LostModal is shown", () => {
  //   render(<Game size={size} level={level} setGameStart={setGameStart} />);
  //   fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowRight" });
  //   expect(setGameStart).toHaveBeenCalled();
  // });

  // it("calls the moveSnake function at the correct interval", () => {
  //   render(<Game size={size} level={level} setGameStart={setGameStart} />);
  //   expect(useInterval).toHaveBeenCalled();
  //   const interval = BASELINE_MOVEMENT_INTERVAL - level * MS_CHANGE_PER_LEVEL;
  //   expect(useInterval).toHaveBeenCalledWith({
  //     callback: expect.any(Function),
  //     delay: interval,
  //   });
  // });

  // it("stops the game when the snake hits itself", () => {
  //   render(<Game size={size} level={level} setGameStart={setGameStart} />);
  //   fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowRight" });
  //   fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowDown" });
  //   fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowLeft" });
  //   fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowUp" });
  //   expect(screen.getByText("Lost Modal")).toBeInTheDocument();
  // });

  // it("stops the game when the snake hits the wall", () => {
  //   render(<Game size={size} level={level} setGameStart={setGameStart} />);
  //   for (let i = 0; i < size; i++) {
  //     fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowRight" });
  //   }
  //   expect(screen.getByText("Lost Modal")).toBeInTheDocument();
  // });

  // it("increases the brain count when a brain is eaten", () => {
  //   render(<Game size={size} level={level} setGameStart={setGameStart} />);
  //   fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowRight" });
  //   const initialBrainsEaten = screen.getByText("0");
  //   expect(initialBrainsEaten).toBeInTheDocument();
  //   fireEvent.keyDown(screen.getByRole("grid"), { key: "ArrowDown" });
  //   expect(screen.getByText("1")).toBeInTheDocument();
  // });
});
