import { useState } from "react";

import StartGame from "./components/StartGame/StartGame";
import InGame from "./components/InGame/InGame";
import EndGame from "./components/EndGame/Endgame";

const App = () => {
  const [status, setStatus] = useState("start");
  const [allAnswer, setAllAnswer] = useState([]);

  return (
    <>
      {status === "start" && <StartGame setStatus={setStatus} />}
      {(status === "ingame" || status === "review") && (
        <InGame
          status={status}
          setStatus={setStatus}
          allAnswer={allAnswer}
          setAllAnswer={setAllAnswer}
        />
      )}
      {status === "endgame" && (
        <EndGame
          allAnswer={allAnswer}
          setAllAnswer={setAllAnswer}
          setStatus={setStatus}
        />
      )}
    </>
  );
};

export default App;
