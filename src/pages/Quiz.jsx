import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { quiz } from "../Kerdesek";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            score: prev.score - 5,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <Container>
      <QuizContainer>
        {!showResult ? (
          <div>
            <div>
              <ActiveQuestion>
                {addLeadingZero(activeQuestion + 1)}
              </ActiveQuestion>
              <TotalQuestion>/{addLeadingZero(questions.length)}</TotalQuestion>
            </div>
            <h2>{question}</h2>
            <ul>
              {choices.map((answer, index) => (
                <li
                  onClick={() => onAnswerSelected(answer, index)}
                  key={answer}
                  className={
                    selectedAnswerIndex === index ? "selected-answer" : null
                  }
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="flex-right">
              <button
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <Result>
            <h3>Result</h3>
            <p>
              Number of Question:{" "}
              <span className="Total-Question">{questions.length}</span>
            </p>
            <p>
              Total Score:
              <span>
                {" "}
                {result.score}/{questions.length * 5}
              </span>
            </p>
            <p>
              Correct Answers:
              <span className="Right-Answer"> {result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers:
              <span className="Wrong-Answer"> {result.wrongAnswers}</span>
            </p>
          </Result>
        )}
      </QuizContainer>
    </Container>
  );
};

export default Quiz;

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background-color: rgb(32, 45, 54);
  color: rgb(32, 45, 54);
`;

const QuizContainer = styled.div`
  position: absolute;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px 60px;

  h2 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  ul {
    margin-bottom: 20px;

    li {
      text-decoration: none;
      list-style: none;
      color: #2d264b;
      font-size: 16px;
      background: #ffffff;
      border: 1px solid rgb(32, 45, 54);
      border-radius: 10px;
      padding: 11px;
      margin-top: 15px;
      cursor: pointer;
    }

    .selected-answer {
      background: rgb(173, 216, 230);
      border: 1px solid rgb(114, 188, 212);
    }
  }

  button {
    background: linear-gradient(
      90.04deg,
      rgb(32, 45, 54) 0.03%,
      rgb(200, 200, 200) 99.96%
    );
    border-radius: 9px;
    font-size: 18px;
    color: #ffffff;
    padding: 10px 42px;
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 15px;
  }

  .flex-right {
    display: flex;
    justify-content: flex-end;
  }
`;

const ActiveQuestion = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: rgb(32, 45, 54);
`;

const TotalQuestion = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: rgb(50, 50, 50);
  margin-bottom: 20px;
`;

const Result = styled.div`
  h3 {
    font-size: 24px;
    letter-spacing: 1.4px;
    text-align: center;
  }

  p {
    font-size: 16px;
    font-weight: 500;

    span {
      color: #800080;
      font-size: 22px;
    }
  }

  .Total-Question {
    color: rgb(32, 45, 54);
  }

  .Right-Answer {
    color: rgb(0, 200, 0);
  }

  .Wrong-Answer {
    color: rgb(200, 0, 0);
  }
`;
