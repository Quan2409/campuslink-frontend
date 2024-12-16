import "./end-game.css";

const Endgame = ({ allAnswer, setStatus }) => {
  const handleTryAgain = () => {
    setStatus("start");
  };

  const handleReview = () => {
    setStatus("review");
  };

  return (
    <>
      <div className="end-game">
        <div className="container">
          <h1 className="end-game__title">
            Your score is:
            <span className="end-game__score">
              {
                allAnswer.filter((asw) => {
                  return asw.correct === true;
                }).length
              }
            </span>
          </h1>
          <div className="end-game__actions">
            <button
              className="btn btn--tryagain"
              onClick={() => handleTryAgain()}
            >
              Try Again
            </button>

            <button className="btn btn--review" onClick={() => handleReview()}>
              Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Endgame;
