import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu.tsx";
import Game from "./components/Game/Game.tsx";
import Instruction from "./components/Instruction/Instruction";

function App() {
  const [size, setSize] = useState<number>(10);
  const [level, setLevel] = useState<number>(1);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [instructions, setInstructions] = useState<boolean>(false);

  const handleGameStart = () => {
    setGameStart(true);
  };

  if (instructions) {
    return <Instruction setInstructions={setInstructions} />;
  }

  return (
    <>
      <Header />
      {gameStart ? (
        <Game size={size} level={level} setGameStart={setGameStart} />
      ) : (
        <Menu
          size={size}
          setSize={setSize}
          level={level}
          setLevel={setLevel}
          handleGameStart={handleGameStart}
          setInstructions={setInstructions}
        />
      )}
    </>
  );
}

export default App;
