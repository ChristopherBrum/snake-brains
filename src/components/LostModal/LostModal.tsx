import { useState, useEffect } from "react";
import styles from "./LostModal.module.css";
import Button from "../Button/Button";

type LostModalProps = {
  currentLevel: number;
  brainsEaten: number;
  setGameStart: (bool: boolean) => void;
};

const LostModal = ({
  currentLevel,
  brainsEaten,
  setGameStart,
}: LostModalProps) => {
  const [finalScore, setFinalScore] = useState<number>(0);

  useEffect(() => {
    const final = calculateScore();
    setFinalScore(final);
  }, [finalScore]);

  const newGame = () => {
    setGameStart(false);
  };

  const calculateScore = () => {
    let total = 0;
    const startingLevel = Math.max(
      1,
      currentLevel - Math.floor(brainsEaten / 10)
    );
    const initialBonus = 100 * (startingLevel - 1);

    for (let i = 1; i <= brainsEaten; i++) {
      const levelIncrease = Math.floor(i / 10);
      total += ((startingLevel + levelIncrease) * 100);
    }

    return total + initialBonus;
  };

  return (
    <div id={styles.gameOverContainer}>
      <div id={styles.gameOverWrapper}>
        <h2 id={styles.title}>Ssssee you in hell</h2>
        <p className={styles.text}>Brains Eaten: {brainsEaten}</p>
        <p className={styles.text}>Final Score: {finalScore}</p>
        <Button title={"Play Again?"} clickHandler={newGame} />
      </div>
    </div>
  );
};

export default LostModal;
