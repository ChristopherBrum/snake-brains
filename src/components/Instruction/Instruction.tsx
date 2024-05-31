import styles from "./Instruction.module.css";
import snake from "../../assets/snake.png";
import Button from "../Button/Button";

type InstructionProps = {
  setInstructions: (value: boolean) => void;
};

const Instruction = ({ setInstructions }: InstructionProps) => {
  return (
    <div data-testid="wrapper" id={styles.wrapper} onClick={() => setInstructions(false)}>
      <div id={styles.text}>
        <div id={styles.headerWrapper}>
          <img
            id={styles.snakeHeadshot}
            src={snake}
            alt="Snake Plisskken's head"
          />
          <div id={styles.titleWrapper}>
            <h1 id={styles.title}>SNAKE</h1>
            <div id={styles.subtitle}>on the Brain</div>
        </div>
          </div>
        <p className={styles.paragraph}>
          Alright, listen up. I'm Snake Plissken, but not like you've seen
          before. This ain't your typical run-of-the-mill Snake game. No, in
          this twisted version, I'm a mutant - half-man, half-snake - slithering
          through a wasteland, hungry for survival. You think you got what it
          takes to control me? Let's find out.
        </p>
        <p className={styles.paragraph}>
          In this game, your mission is simple: consume brains to stay alive.
          Yeah, you heard me right - brains. Every move counts, and every second
          you delay could be your last. The more brains you consume, the longer
          I get. But don't get too cocky. One wrong turn and it's game over.
        </p>
        <p className={styles.paragraph}>
          You're navigating a deadly grid, avoiding dangers and obstacles, especially my slithering snake butt. It's a
          fight for survival in a post-apocalyptic hellscape, and I need those
          brains to keep moving. You see, this mutation isn't just a curse -
          it's my only weapon. I move fast, and you've gotta think faster.
        </p>
        <p className={styles.paragraph}>
          Use the arrow keys to guide me through this nightmare. Up, down, left,
          right - every direction matters. Keep your eyes peeled, stay sharp,
          and don't get cornered. It's a deadly game, and there's no room for
          mistakes.
        </p>
        <p className={styles.paragraph}>
          Remember, I've been through hell and back. But this time, I need your
          help to win. You control the snake, but I bring the fight.
        </p>
				<span id={styles.btnWrapper}>
					<Button
						title={"Let's do this."}
						clickHandler={() => setInstructions(false)}
					/>
				</span>
      </div>
    </div>
  );
};

export default Instruction;
