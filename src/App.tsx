import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import Controls from "./components/Controls/Controls";
import Game from "./components/Game/Game.tsx";
import Instruction from "./components/Instruction/Instruction";

function App() {
  const [size, setSize] = useState<number>(10);
  const [level, setLevel] = useState<number>(1);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [instructions, setInstructions] = useState<boolean>(false);

  const handleStartGame = () => {
    setGameStart(true);
  };

  if (instructions) {
    return <Instruction setInstructions={setInstructions} />;
  }

  return (
    <>
      <Header />
      {gameStart ? (
        <Game size={size} level={level} />
      ) : (
        <Controls
          size={size}
          setSize={setSize}
          level={level}
          setLevel={setLevel}
          handleStartGame={handleStartGame}
          setInstructions={setInstructions}
        />
      )}
    </>
  );
}

export default App;
