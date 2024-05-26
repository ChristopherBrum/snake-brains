/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import brainImage from "../../assets/brain.png";

const BASELINE_MOVEMENT_INTERVAL = 500;
const BRAINS_FOR_LEVEL_UP = 10;

type GameProps = {
  size: number;
  level: number;
};

const Game = ({ size, level }: GameProps) => {
  // const [snake, setSnake] = useState<number[][]>([]);
  const [brain, setBrain] = useState<number[]>([]);
  const [direction, setDirection] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(level);

  const snakeRef = useRef<number[][]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  //////// GAME SETUP START ////////

  /* set up board, plus snake and brain starting points, then activate game  */
  useEffect(() => {
    buildBoard();
    setGamePieces();
    if (boardRef.current) {
      boardRef.current.focus();
      setGameActive(true);
    }
  }, []);

  /* after game activated, determine starting direction of snake */
  useEffect(() => {
    if (gameActive) {
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

    const newIntervalId = setInterval(() => {
      moveSnake();
    }, newIntervalTime);

    return () => {
      clearInterval(newIntervalId);
    };
  }, [currentLevel, direction]);

  const buildBoard = () => {
    if (boardRef.current) {
      boardRef.current.innerHTML = "";

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
        boardRef.current.appendChild(newRow);
      }
    }
  };

  const setGamePieces = (): void => {
    if (!boardRef.current) handleCustomError("Error setting game board");
    const [snakeRow, snakeCol] = findRandomCoordinates();
    const snakeTarget = findSquareElement(snakeRow, snakeCol);
    const [brainRow, brainCol] = findRandomCoordinates();
    const brainTarget = findSquareElement(brainRow, brainCol);

    if (squaresAreTheSame(snakeRow, snakeCol)) {
      setGamePieces();
    } else if (snakeTarget && brainTarget) {
      snakeTarget.classList.add("snake");
      snakeTarget.classList.add("head");
      brainTarget.classList.add("brain");
      snakeRef.current = [[snakeRow, snakeCol]];
      setBrain([brainRow, brainCol]);
    }
  };

  const setStartingDirection = () => {
    const [snakeRow, snakeCol] = snakeRef.current[0];
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
  //////// ERROR HANDLING END ////////

  //////// VALIDATION START ////////
  const invalidSquare = (rowId: number, colId: number) => {
    return rowId < 0 || rowId >= size || colId < 0 || colId >= size;
  };

  const squareIsOccupied = (rowId: number, colId: number) => {
    const occupied = snakeRef.current.some((coordinates) => {
      return coordinates[0] === rowId && coordinates[1] === colId;
    });

    return occupied || (brain[0] === rowId && brain[1] === colId);
  };

  const squaresAreTheSame = (
    snakeRow: number,
    snakeCol: number
  ) => {
    const [brainRow, brainCol] = brain;
    return snakeRow === brainRow && snakeCol === brainCol;
  };

  const validDirection = (snakeRow: number, snakeCol: number) => {
    const sameAsBrain = squaresAreTheSame(snakeRow, snakeCol);
    const invalid = invalidSquare(snakeRow, snakeCol);

    return !sameAsBrain && !invalid;
  };
  //////// ERROR HANDLING END ////////

  //////// UI UPDATE START ////////
  const findNextCoordinates = () => {
    let [rowId, colId] = snakeRef.current[0];

    if (direction === "UP") {
      rowId -= 1;
    } else if (direction === "DOWN") {
      rowId += 1;
    } else if (direction === "LEFT") {
      colId -= 1;
    } else if (direction === "RIGHT") {
      colId += 1;
    }

    return [rowId, colId];
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

  const findSquareElement = (rowId: number, colId: number) => {
    const selector = `[data-row-id='${rowId}'][data-col-id='${colId}']`;
    if (boardRef.current) {
      return boardRef.current.querySelector(selector);
    } else {
      return;
    }
  };

  const findSnakeElements = (updatedSnake: number[][]): Element[] => {
    return updatedSnake
      .map((coordinates) => {
        const square = findSquareElement(coordinates[0], coordinates[1]);
        if (!square) {
          handleCustomError(
            `Square not found at row ${coordinates[0]}, col ${coordinates[1]}`
          );
        }
        return square as Element;
      })
      .filter(Boolean);
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
    const [rowId, colId] = snakeRef.current[0];

    switch (keyPressed) {
      case "ArrowUp":
        if (invalidSquare(rowId - 1, colId)) return;
        setDirection("UP");
        break;
      case "ArrowDown":
        if (invalidSquare(rowId + 1, colId)) return;
        setDirection("DOWN");
        break;
      case "ArrowRight":
        if (invalidSquare(rowId, colId + 1)) return;
        setDirection("RIGHT");
        break;
      case "ArrowLeft":
        if (invalidSquare(rowId, colId - 1)) return;
        setDirection("LEFT");
        break;
      default:
        return;
    }
  };

  const squareIsOnSnake = (snakeRow: number, snakeCol: number): boolean => {
    for (let i = 0; i < snakeRef.current.length; i++) {
      if (snakeRef.current[i][0] === snakeRow && snakeRef.current[i][1] === snakeCol) {
        return true;
      }
    }
    return false;
  }

  const moveSnake = () => {
    const [nextRowId, nextColId] = findNextCoordinates(); 
    const nextHead = findSquareElement(nextRowId, nextColId);

    // console.log("nextRowId:", nextRowId, "nextColId:", nextColId, nextHead)
    if (!nextHead) {
      // change directions and check again
      // game over if no other options
    }

    const nextSnake = [[nextRowId, nextColId], ...snakeRef.current];
    const nextSnakeElements = findSnakeElements(nextSnake);

    removeSnakeElementClasses(nextSnakeElements);

    if (squaresAreTheSame(nextRowId, nextColId)) {
      brainGetsEaten();
      // console.log('moveSnake func - if branch');
    } else if (squareIsOnSnake(nextRowId, nextColId)) {
      // if the snake is attempting to move into itself,
      // run this branch
      // game over 
      console.log('moveSnake func - else if branch');
      setGameActive(false);
    } else {
      // console.log('moveSnake func - else branch');
      nextSnake.pop();
      nextSnakeElements.pop();
    }

    addSnakeElementClasses(nextSnakeElements);
    snakeRef.current = nextSnake;
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
        ref={boardRef}
        id="boardContainer"
        tabIndex={0}
        onKeyDown={changeDirection}
      ></div>
    </>
  );
};

export default Game;
