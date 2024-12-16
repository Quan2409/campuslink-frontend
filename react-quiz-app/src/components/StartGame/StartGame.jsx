import "./start-game.css";

const StartGame = ({ setStatus }) => {
  const handleStart = () => {
    setStatus("ingame");
  };

  return (
    <>
      <div className="start-game">
        <div className="container">
          <h1 className="start-game__title">Welcome to React Quiz Game</h1>
          <button className="btn btn--start" onClick={() => handleStart()}>
            Start
          </button>
        </div>
      </div>
    </>
  );
};

export default StartGame;
