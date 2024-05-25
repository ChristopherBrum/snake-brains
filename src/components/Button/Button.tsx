import styles from "./Button.module.css";

type ButtonProps = {
	title: string;
	clickHandler: () => void;
}

const Button = ({ title, clickHandler }: ButtonProps) => {
	return (
		<button className={styles.gameStartButton} onClick={clickHandler}>
			{title}
		</button>
	)
}

export default Button;