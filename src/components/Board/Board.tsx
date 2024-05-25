import { useState, useRef, useEffect } from "react";
import brainImage from "../../assets/brain.png";

type BoardProps = {
  size: number;
  level: number;
};

const Board = ({ size, level }: BoardProps) => {
  const [snake, setSnake] = useState<number[][]>([]);
  const [brain, setBrain] = useState<number[]>([]);
  const [direction, setDirection] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    buildBoard();
    setGamePieces();

    if (board.current) {
      board.current.focus();
    }
  }, []);

  const board = useRef<HTMLDivElement>(null);

  const buildBoard = () => {
    if (board.current) {
      board.current.innerHTML = "";

      for (let i = 0; i < size; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        for (let j = 0; j < size; j++) {
          const square = document.createElement("div");
          square.classList.add("square");
          square.setAttribute("data-row-id", i.toString());
          square.setAttribute("data-col-id", j.toString());
          newRow.appendChild(square);
        }
        board.current.appendChild(newRow);
      }
    }
  };

  const handleCustomError = (message: string) => {
    throw new Error(message);
  };

  const findRandomCoordinates = (): number[] => {
    const randomRow = Math.floor(Math.random() * size);
    const randomCol = Math.floor(Math.random() * size);

    // If the square is occupied, call findRandomCoordinates recursively
    if (occupiedSquare(randomRow, randomCol)) {
      return findRandomCoordinates();
    }

    return [randomRow, randomCol];
  };

  const occupiedSquare = (rowId: number, colId: number) => {
    const occupied = snake.some((coordinates) => {
      return coordinates[0] === rowId && coordinates[1] === colId;
    });

    return occupied || (brain[0] === rowId && brain[1] === colId);
  };

  const findSquare = (rowId: number, colId: number) => {
    const selector = `[data-row-id='${rowId}'][data-col-id='${colId}']`;
    if (board.current) {
      return board.current.querySelector(selector);
    } else {
      return;
    }
  };

  const setGamePieces = () => {
    if (!board.current) handleCustomError("Error setting game board");
    const [snakeRow, snakeCol] = findRandomCoordinates();
    const snakeTarget = findSquare(snakeRow, snakeCol);
    const [brainRow, brainCol] = findRandomCoordinates();
    const brainTarget = findSquare(brainRow, brainCol);

    if (squaresAreTheSame(snakeRow, snakeCol, brainRow, brainCol)) {
      return;
    } else if (snakeTarget && brainTarget) {
      snakeTarget.classList.add("snake");
      snakeTarget.classList.add("head");
      brainTarget.classList.add("brain");
      setSnake([[snakeRow, snakeCol]]);
      setBrain([brainRow, brainCol]);
    }
  };

  const invalidSquare = (rowId: number, colId: number) => {
    return rowId < 0 || rowId >= size || colId < 0 || colId >= size;
  };

  const squaresAreTheSame = (
    snakeRow: number,
    snakeCol: number,
    brainRow: number,
    brainCol: number
  ) => {
    return snakeRow === brainRow && snakeCol === brainCol;
  };

  const findSnakeElements = (updatedSnake: number[][]) => {
    return updatedSnake.map((coordinates) => {
      const square = findSquare(coordinates[0], coordinates[1]);
      return square;
    });
  };

  const removeSnakeElementClasses = (snakeElements: Element[]): void => {
    if (!snakeElements) handleCustomError("Invalid snake element collection");
    snakeElements.forEach((square) => {
      square?.classList.remove("snake");
      square?.classList.remove("head");
      square?.classList.remove("brain");
    });
  };

  const addSnakeElementClasses = (snakeElements: Element[]) => {
    if (!snakeElements) handleCustomError("Invalid snake element collection");
    snakeElements.forEach((snakeElement) => {
      if (!snakeElement) handleCustomError("Invalid snake element");
      snakeElement.classList.add("snake");
    });
    snakeElements[0].classList.add("head");
  };

  const handleBrainGettingEaten = () => {
    const [brainRow, brainCol] = findRandomCoordinates();
    const brainTarget = findSquare(brainRow, brainCol);
    if (!brainTarget) {
      handleCustomError("Brain coordiantes are invalid");
      return;
    }
    brainTarget.classList.add("brain");
    setBrain([brainRow, brainCol]);
    setScore(score + 1);
  };

  const moveSnake = (rowId: number, colId: number) => {
    const newHead = findSquare(rowId, colId);
    if (!newHead) handleCustomError("Could not find valid head element");

    const updatedSnake = [[rowId, colId], ...snake];
    const snakeElements = findSnakeElements(updatedSnake);
    if (!snakeElements)
      handleCustomError("Error collection the snake elements");
    removeSnakeElementClasses(snakeElements);

    if (squaresAreTheSame(rowId, colId, brain[0], brain[1])) {
      handleBrainGettingEaten();
    } else if (false) {
      // if the snake is attempting to move into itself, run this branch
    } else {
      updatedSnake.pop();
      snakeElements.pop();
    }

    addSnakeElementClasses(snakeElements);
    setSnake(updatedSnake);
  };

  const handleDirectionChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyPressed = e.key;
    const head = snake[0];
    const rowId = head[0];
    const colId = head[1];

    switch (keyPressed) {
      case "ArrowUp":
        if (invalidSquare(rowId - 1, colId)) return;
        setDirection("UP");
        moveSnake(rowId - 1, colId);
        break;
      case "ArrowDown":
        if (invalidSquare(rowId + 1, colId)) return;
        setDirection("DOWN");
        moveSnake(rowId + 1, colId);
        break;
      case "ArrowRight":
        if (invalidSquare(rowId, colId + 1)) return;
        setDirection("RIGHT");
        moveSnake(rowId, colId + 1);
        break;
      case "ArrowLeft":
        if (invalidSquare(rowId, colId - 1)) return;
        setDirection("LEFT");
        moveSnake(rowId, colId - 1);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div id="score-wrapper">
        <div className="score-box">
          <span id="difficulty-label">Difficulty:</span>
          <span id="level">{level}</span>
        </div>
        <div className="score-box">
          <div id="flexy">
            <img id="brain-image" src={brainImage} alt="Image of a brain" />
            <span id="brains-eaten-label">'s eaten:</span>
          </div>
          <span id="score">{score}</span>
        </div>
      </div>

      <div
        ref={board}
        id="boardContainer"
        tabIndex={0}
        onKeyDown={handleDirectionChange}
      ></div>
    </>
  );
};

export default Board;
