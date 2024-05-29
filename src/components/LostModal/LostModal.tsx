import styles from "./LostModal.module.css";
import Button from "../Button/Button";

type LostModalProps = {
	score: number;
	brainsEaten: number;
}

const LostModal = ({ score, brainsEaten }: LostModalProps) => {
	const newGame = () => {

	}

  return (
		<div id={styles.gameOverContainer}>
			<div id={styles.gameOverWrapper}>
				<h2 id={styles.title}>Game Over</h2>
				<p className={styles.text}>Brains Eaten: {brainsEaten}</p>
				<p className={styles.text}>Final Score: {score}</p>
				<Button title={"Play Again?"} clickHandler={newGame} />
			</div>
		</div>
  );
};

export default LostModal;
