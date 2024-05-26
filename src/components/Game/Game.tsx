import { useState, useRef, useEffect } from "react";
import brainImage from "../../assets/brain.png";

const BASELINE_MOVEMENT_INTERVAL = 800;
const BRAINS_FOR_LEVEL_UP = 10;

type GameProps = {
  size: number;
  level: number;
};

const Game = ({ size, level }: GameProps) => {
  const [snake, setSnake] = useState<number[][]>([]);
  const [brain, setBrain] = useState<number[]>([]);
  const [direction, setDirection] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(level);

  const board = useRef<HTMLDivElement>(null);
  //////// GAME SETUP START ////////

  /* set up board, plus snake and brain starting points, then activate game  */
  useEffect(() => {
    buildBoard();
    setGamePieces();
    if (board.current) {
      board.current.focus();
      setGameActive(true);
    }
  }, []);

  /* after game activated, determine starting direction of snake */
  useEffect(() => {
    if (gameActive) {
      console.log("gameActive:", gameActive);
      setStartingDirection();
    }
  }, [gameActive]);

  /* update the difficulty level based on the number of brains eaten */
  useEffect(() => {
    if (score % BRAINS_FOR_LEVEL_UP === 0) {
      const additionalLevels = score / BRAINS_FOR_LEVEL_UP;
      const newCurrentLevel = level + additionalLevels;
      setCurrentLevel(newCurrentLevel);
    }
  }, [score]);

  /* move the snake on a timed interval */
  /* currently not working because the direction state has not been set before the interval begins*/
  useEffect(() => {
    const newIntervalTime = BASELINE_MOVEMENT_INTERVAL - currentLevel * 50;

    let num = 0;
    const newIntervalId = setInterval(() => {
      // moveSnake()
      // call a method to move the snake
      num += 1;
      console.log("current interval", num, "direction:", direction);
    }, newIntervalTime);

    return () => {
      clearInterval(newIntervalId);
    };
  }, [currentLevel, direction]);

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

  const setGamePieces = (): void => {
    if (!board.current) handleCustomError("Error setting game board");
    const [snakeRow, snakeCol] = findRandomCoordinates();
    const snakeTarget = findSquareElement(snakeRow, snakeCol);
    const [brainRow, brainCol] = findRandomCoordinates();
    const brainTarget = findSquareElement(brainRow, brainCol);

    if (squaresAreTheSame(snakeRow, snakeCol, brainRow, brainCol)) {
      setGamePieces();
    } else if (snakeTarget && brainTarget) {
      snakeTarget.classList.add("snake");
      snakeTarget.classList.add("head");
      brainTarget.classList.add("brain");
      setSnake([[snakeRow, snakeCol]]);
      setBrain([brainRow, brainCol]);
    }
  };

  const setStartingDirection = () => {
    const [snakeRow, snakeCol] = snake[0];
    if (validDirection(snakeRow - 1, snakeCol)) {
      setDirection("UP");
    } else if (validDirection(snakeRow + 1, snakeCol)) {
      setDirection("DOWN");
    } else if (validDirection(snakeRow, snakeCol - 1)) {
      setDirection("LEFT");
    } else if (validDirection(snakeRow, snakeCol + 1)) {
      setDirection("RIGHT");
    }
  };
  //////// GAME SETUP END ////////

  //////// ERROR HANDLING START ////////
  const handleCustomError = (message: string) => {
    throw new Error(message);
  };

  const findRandomCoordinates = (): number[] => {
    const randomRow = Math.floor(Math.random() * size);
    const randomCol = Math.floor(Math.random() * size);

    // If the square is occupied, call findRandomCoordinates recursively
    if (squareIsOccupied(randomRow, randomCol)) {
      return findRandomCoordinates();
    }

    return [randomRow, randomCol];
  };
  //////// ERROR HANDLING END ////////

  //////// VALIDATION START ////////
  const invalidSquare = (rowId: number, colId: number) => {
    return rowId < 0 || rowId >= size || colId < 0 || colId >= size;
  };

  const squareIsOccupied = (rowId: number, colId: number) => {
    const occupied = snake.some((coordinates) => {
      return coordinates[0] === rowId && coordinates[1] === colId;
    });

    return occupied || (brain[0] === rowId && brain[1] === colId);
  };

  const squaresAreTheSame = (
    snakeRow: number,
    snakeCol: number,
    brainRow: number,
    brainCol: number
  ) => {
    return snakeRow === brainRow && snakeCol === brainCol;
  };

  const validDirection = (snakeRow: number, snakeCol: number) => {
    const [brainRow, brainCol] = brain;
    const sameAsBrain = squaresAreTheSame(
      snakeRow,
      snakeCol,
      brainRow,
      brainCol
    );
    const invalid = invalidSquare(snakeRow, snakeCol);

    return !sameAsBrain && !invalid;
  };
  //////// ERROR HANDLING END ////////

  //////// UI UPDATE START ////////
  const findSquareElement = (rowId: number, colId: number) => {
    const selector = `[data-row-id='${rowId}'][data-col-id='${colId}']`;
    if (board.current) {
      return board.current.querySelector(selector);
    } else {
      return;
    }
  };

  const findSnakeElements = (updatedSnake: number[][]): Element[] => {
    return updatedSnake.map((coordinates) => {
      const square = findSquareElement(coordinates[0], coordinates[1]);
      if (!square) {
        handleCustomError(`Square not found at row ${coordinates[0]}, col ${coordinates[1]}`);
      }
      return square as Element;
    }).filter(Boolean);
  };  

  const addSnakeElementClasses = (snakeElements: Element[]) => {
    if (!snakeElements) handleCustomError("Invalid snake element collection");
    snakeElements.forEach((snakeElement) => {
      if (!snakeElement) handleCustomError("Invalid snake element");
      snakeElement.classList.add("snake");
    });
    snakeElements[0].classList.add("head");
  };

  const removeSnakeElementClasses = (snakeElements: Element[]): void => {
    if (!snakeElements) handleCustomError("Invalid snake element collection");
    snakeElements.forEach((square) => {
      square?.classList.remove("snake");
      square?.classList.remove("head");
      square?.classList.remove("brain");
    });
  };
  //////// UI UPDATE END ////////

  //////// GAME MOVEMENT START ////////
  const brainGetsEaten = () => {
    const [brainRow, brainCol] = findRandomCoordinates();
    const brainTarget = findSquareElement(brainRow, brainCol);
    if (!brainTarget) {
      handleCustomError("Brain coordiantes are invalid");
      return;
    }
    brainTarget.classList.add("brain");
    setBrain([brainRow, brainCol]);
    setScore(score + 1);
  };

  const changeDirection = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyPressed = e.key;
    const [rowId, colId] = snake[0];

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

  const moveSnake = (rowId: number, colId: number) => {
    const newHead = findSquareElement(rowId, colId);
    if (!newHead) handleCustomError("Could not find valid head element");

    const updatedSnake = [[rowId, colId], ...snake];
    const snakeElements = findSnakeElements(updatedSnake);
    if (!snakeElements.length) {
      handleCustomError("Error collection the snake elements");
    }
    removeSnakeElementClasses(snakeElements);

    if (squaresAreTheSame(rowId, colId, brain[0], brain[1])) {
      brainGetsEaten();
    } else if (false) {
      // if the snake is attempting to move into itself, run this branch
    } else {
      updatedSnake.pop();
      snakeElements.pop();
    }

    addSnakeElementClasses(snakeElements);
    setSnake(updatedSnake);
  };
  //////// GAME MOVEMENT END ////////

  //////// GAME OVER START ////////

  //////// GAME OVER END ////////

  return (
    <>
      <div id="score-wrapper">
        <div className="score-box">
          <span id="difficulty-label">Difficulty:</span>
          <span id="level">{currentLevel}</span>
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
        onKeyDown={changeDirection}
      ></div>
    </>
  );
};

export default Game;
