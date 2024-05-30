/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import brainImage from "../../assets/brain.png";
import useInterval from "../useInterval/useInterval";
import LostModal from "../LostModal/LostModal";
import styles from "./Game.module.css";

const BASELINE_MOVEMENT_INTERVAL = 400;
const BRAINS_FOR_LEVEL_UP = 10;
const MS_CHANGE_PER_LEVEL = 35;

type GameProps = {
  size: number;
  level: number;
  setGameStart: (bool: boolean) => void;
};

const Game = ({ size, level, setGameStart }: GameProps) => {
  const [brain, setBrain] = useState<number[]>([]);
  const [brainsEaten, setBrainsEaten] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(level);
  const [direction, setDirection] = useState<string>("");
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState("start");

  const snakeRef = useRef<number[][]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  //////// GAME SETUP START ////////
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

  /* useEffect to initalize the game */
  useEffect(() => {
    buildBoard();
    setGamePieces();
    if (boardRef.current) {
      boardRef.current.focus();
      setGameActive(true);
    }
  }, []);

  /* useEffect to set the initial direction once game it active */
  useEffect(() => {
    if (gameActive) {
      setStartingDirection();
    }
  }, [gameActive]);

  /* useEffect to update the difficulty level based on number of brains eaten */
  useEffect(() => {
    if (brainsEaten % BRAINS_FOR_LEVEL_UP === 0) {
      const additionalLevels = brainsEaten / BRAINS_FOR_LEVEL_UP;
      const newCurrentLevel = level + additionalLevels;
      setCurrentLevel(newCurrentLevel);
    }
  }, [brainsEaten]);

  /* use the custom useInterval hook to move the snake */
  useInterval({
    callback: moveSnake,
    delay: gameActive
      ? BASELINE_MOVEMENT_INTERVAL - currentLevel * MS_CHANGE_PER_LEVEL
      : null,
  });
  //////// GAME SETUP END ////////

  //////// VALIDATION START ////////
  const handleCustomError = (message: string) => {
    throw new Error(message);
  };

  const invalidSquare = (rowId: number, colId: number) => {
    return rowId < 0 || rowId >= size || colId < 0 || colId >= size;
  };

  const validSquare = (currentRow: number, currentCol: number) => {
    const invalid = invalidSquare(currentRow, currentCol);
    const occupiedBySnake = squareOccupiedBySnake(currentRow, currentCol);
    return !invalid && !occupiedBySnake;
  };

  const squareIsOccupied = (rowId: number, colId: number) => {
    const occupied = squareOccupiedBySnake(rowId, colId);
    return occupied || (brain[0] === rowId && brain[1] === colId);
  };

  const squareOccupiedBySnake = (rowId: number, colId: number) => {
    return snakeRef.current.some((coordinates) => {
      return coordinates[0] === rowId && coordinates[1] === colId;
    });
  };

  const squareIsOnSnake = (snakeRow: number, snakeCol: number): boolean => {
    for (let i = 0; i < snakeRef.current.length; i++) {
      if (
        snakeRef.current[i][0] === snakeRow &&
        snakeRef.current[i][1] === snakeCol
      ) {
        return true;
      }
    }
    return false;
  };

  const squaresAreTheSame = (snakeRow: number, snakeCol: number) => {
    const [brainRow, brainCol] = brain;
    return snakeRow === brainRow && snakeCol === brainCol;
  };

  const validDirection = (snakeRow: number, snakeCol: number) => {
    const sameAsBrain = squaresAreTheSame(snakeRow, snakeCol);
    const invalid = invalidSquare(snakeRow, snakeCol);

    return !sameAsBrain && !invalid;
  };
  //////// ERROR HANDLING END ////////

  //////// DOM MANIPULATION START ////////
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
  //////// DOM MANIPULATION END ////////

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
    setBrainsEaten(brainsEaten + 1);
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
      case "ArrowLeft":
        if (invalidSquare(rowId, colId - 1)) return;
        setDirection("LEFT");
        break;
      case "ArrowRight":
        if (invalidSquare(rowId, colId + 1)) return;
        setDirection("RIGHT");
        break;
      default:
        return;
    }
  };

  const findAnotherPath = (currentRow: number, currentCol: number) => {
    if (validSquare(currentRow - 1, currentCol)) {
      setDirection("UP");
      return [currentRow - 1, currentCol];
    } else if (validSquare(currentRow + 1, currentCol)) {
      setDirection("DOWN");
      return [currentRow + 1, currentCol];
    } else if (validSquare(currentRow, currentCol - 1)) {
      setDirection("LEFT");
      return [currentRow, currentCol - 1];
    } else if (validSquare(currentRow, currentCol + 1)) {
      setDirection("RIGHT");
      return [currentRow, currentCol + 1];
    }
    return null;
  };

  function moveSnake() {
    let [nextRowId, nextColId] = findNextCoordinates();
    const nextHead = findSquareElement(nextRowId, nextColId);

    if (!nextHead) {
      const [currentHeadRow, currentHeadCol] = snakeRef.current[0];
      const validPath = findAnotherPath(currentHeadRow, currentHeadCol);
      if (validPath) {
        [nextRowId, nextColId] = validPath;
      } else {
        playerLost();
      }
    }

    const nextSnake = [[nextRowId, nextColId], ...snakeRef.current];
    const nextSnakeElements = findSnakeElements(nextSnake);

    removeSnakeElementClasses(nextSnakeElements);

    if (squaresAreTheSame(nextRowId, nextColId)) {
      brainGetsEaten();
    } else if (squareIsOnSnake(nextRowId, nextColId)) {
      playerLost();
    } else {
      nextSnake.pop();
      nextSnakeElements.pop();
    }

    addSnakeElementClasses(nextSnakeElements);
    snakeRef.current = nextSnake;
  }
  //////// GAME MOVEMENT END ////////

  //////// GAME OVER START ////////
  const playerLost = () => {
    setGameActive(false);
    setGameMode("player-lost");
  };
  //////// GAME OVER END ////////

  return (
    <>
      <div id={styles.brainsEatenWrapper}>
        <div className={styles.gameStateWrapper}>
          <span id={styles.difficultyLabel}>Difficulty:</span>
          <span id={styles.level}>{currentLevel}</span>
        </div>
        <div className={styles.gameStateWrapper}>
          <div id={styles.flexy}>
            <img
              id={styles.brainImage}
              src={brainImage}
              alt="Image of a brain"
            />
            <span id={styles.brainsEatenLabel}>'s eaten:</span>
          </div>
          <span id={styles.brainsEaten}>{brainsEaten}</span>
        </div>
      </div>

      {gameMode === "player-lost" ? (
        <LostModal
          currentLevel={currentLevel}
          brainsEaten={brainsEaten}
          setGameStart={setGameStart}
        />
      ) : null}
      <div
        ref={boardRef}
        id={styles.boardContainer}
        tabIndex={0}
        onKeyDown={changeDirection}
      ></div>
    </>
  );
};

export default Game;
