import styles from "./Header.module.css";
import snake from "../../assets/snake.png";

const Header = () => {
  return (
    <div id={styles.titleContainer}>
      <img id={styles.headshot} src={snake} alt="Snake Plisskken's head" />
      <h1 id={styles.title}>SNAKE</h1>
      <p id={styles.subTitle}>on the Brain</p>
    </div>
  );
};

export default Header;
