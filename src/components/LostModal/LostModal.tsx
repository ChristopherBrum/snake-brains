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
    const baseMultiplier = 1.5;
    const startingDifficultyLevel = currentLevel - Math.floor(brainsEaten / 10);
    const initialBonus = 20 * (startingDifficultyLevel - 1);
    return Math.pow(baseMultiplier, currentLevel) + initialBonus;
  };

  return (
    <div id={styles.gameOverContainer}>
      <div id={styles.gameOverWrapper}>
				<h2 id={styles.title}>Ssssee you in hell</h2>
        <p className={styles.text}>Brains Eaten: {brainsEaten}</p>
        <p className={styles.text}>
          Final Score: {finalScore}
        </p>
        <Button title={"Play Again?"} clickHandler={newGame} />
      </div>
    </div>
  );
};

export default LostModal;
