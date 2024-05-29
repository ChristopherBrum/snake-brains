import styles from "./Menu.module.css";
import Button from "../Button/Button";

interface MenuProps {
  size: number;
  setSize: (size: number) => void;
  level: number;
  setLevel: (level: number) => void;
  handleGameStart: () => void;
  setInstructions: (bool: boolean) => void  ;
}

const Menu = ({
  size,
  setSize,
  level,
  setLevel,
  handleGameStart,
  setInstructions,
}: MenuProps) => {
  const showInstructions = () => {
    setInstructions(true);
  };

  return (
    <div className={styles.container}>
      <Button
        title={"How do I play this game?"}
        clickHandler={showInstructions}
      />
      <div className={styles.rangeContainer}>
        <h2 className={styles.headline}>How tough you feeling?</h2>
        <div>
          <label>
            Board Size: <span className={styles.numeric}>{size}</span>x
            <span className={styles.numeric}>{size}</span>
            <input
              type="range"
              min="10"
              max="20"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Difficulty: <span className={styles.numeric}>{level}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
      <Button title={"Start Game"} clickHandler={handleGameStart} />
    </div>
  );
};

export default Menu;
