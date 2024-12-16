import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import questions from "../../assets/data.json";
import "./in-game.css";

const InGame = ({ status, setStatus, allAnswer, setAllAnswer }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const currentQuestion = questions[index];

  const handlePrevios = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(0);
    }
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(index);
    }
  };

  const handleSelected = (id, status) => {
    setSelected(id);
    setAllAnswer((prev) => {
      const lastAnswer = prev.filter((last) => {
        return last.questions !== currentQuestion.id;
      });

      return [
        ...lastAnswer,
        {
          questions: currentQuestion.id,
          selected_answer: id,
          correct: status,
        },
      ];
    });
  };

  const handleSubmit = () => {
    const confirm = window.confirm("Are you sure you want to submit answers ?");
    if (confirm) {
      setSelected(allAnswer);
      setStatus("endgame");
    }
  };

  const handleRestart = () => {
    setStatus("start");
  };

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    if ((minutes === 0 && seconds === 0) || status === "review") {
      return (
        <>
          <div className="timer timer-end">End!</div>
        </>
      );
    }
    return (
      <>
        <div className="timer">
          {formattedMinutes}:{formattedSeconds}
        </div>
      </>
    );
  };

  const renderReview = (all, asw) => {
    if (all?.selected_answer === asw.id) {
      return all.correct ? "true__answer" : "wrong__answer";
    } else if (allAnswer?.selected_answer === undefined) {
      return asw.correct ? "true__answer" : "disabled__content";
    }
  };

  useEffect(() => {
    setSelected("");
  }, [index]);

  return (
    <>
      <div className="in-game">
        <div className="container">
          <div className="in-game__actions">
            <button
              className={index === 0 ? "btn btn--disabled" : "btn btn--prev"}
              onClick={() => handlePrevios()}
            >
              Previos
            </button>

            <button
              className={
                index === questions.length - 1
                  ? "btn btn--disabled"
                  : "btn btn--next"
              }
              onClick={() => handleNext()}
            >
              Next
            </button>

            {status === "review" ? (
              <button
                className="btn btn--restart"
                onClick={() => handleRestart()}
              >
                Restart
              </button>
            ) : (
              <>
                {index === questions.length - 1 && (
                  <button
                    className="btn btn--submit"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                )}
              </>
            )}
          </div>

          <div className="in-game__question">
            <div className="in-game__timer">
              <CountdownCircleTimer
                isPlaying
                size={80}
                strokeWidth={7}
                duration={90}
                trailColor={"#fff"}
                rotation="counterclockwise"
                colors={status !== "review" ? "#4f47e6" : "#fff"}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => {
                  return setTimeout(() => {
                    setStatus("endgame");
                  }, 5000);
                }}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>

            <span className="question__length">
              Question:
              <span>{index + 1}</span>
              <span>{"/" + questions.length}</span>
            </span>

            <p className="question__title">
              {currentQuestion.question_content}
            </p>
          </div>

          <div className="in-game__answer">
            <ul>
              {currentQuestion.answers.map((asw) => {
                const selectedAWS = allAnswer.find(
                  (select) => select.questions === currentQuestion.id
                );
                return (
                  <li key={asw.id}>
                    {status === "review" ? (
                      <div className={renderReview(selectedAWS, asw)}>
                        <span className="content__index">{asw.id + ")"}</span>
                        <p className="content__title">{asw.answer_content}</p>
                      </div>
                    ) : (
                      <>
                        <div
                          className={
                            selected === asw.id
                              ? "answer__selected"
                              : "answer__content"
                          }
                          onClick={() => handleSelected(asw.id, asw.correct)}
                        >
                          <span className="content__index">{asw.id + ")"}</span>
                          <p className="content__title">{asw.answer_content}</p>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default InGame;
