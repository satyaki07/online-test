import React, { useState, useEffect } from "react";
import questions from "./questions";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formDisplay, setFormDisplay] = useState(true);

  const [curQuestion, setCurQuestion] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setCurQuestion(0);
    setShowAnswer(false);
    setQuizComplete(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, dob);
    setFormDisplay(false);
  };

  const handleAnswerOptionClick = (isCorrect) => {
    setShowAnswer(true);
  };

  const nextClickHandler = () => {
    const nextQuestion = curQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurQuestion(nextQuestion);
    } else {
      setQuizComplete(true);
    }
    setShowAnswer(false);
  };
  return (
    <div className="App">
      <h1>online test</h1>
      {formDisplay ? (
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password:
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Date of Birth:
            <input
              name="dob"
              type="date"
              value="2000-07-01"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </label>

          <label>
            <input
              name="acceptedTerms"
              type="checkbox"
              onChange={(e) => setAcceptedTerms(e.target.value)}
              required
            />
            I accept the terms of service
          </label>

          <button className="btn">start test</button>
        </form>
      ) : (
        <div className="quiz">
          {quizComplete ? (
            <div className="endSection">
              You have answered all the questions.
            </div>
          ) : (
            <div>
              {" "}
              <div className="question-section">
                <div className="question-count">
                  Question <span> {curQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {questions[curQuestion].questionText}
                </div>
              </div>
              <div className="answer-section">
                {questions[curQuestion].answerOptions.map((answerOption) => {
                  const optionColor = showAnswer
                    ? answerOption.isCorrect
                      ? "green"
                      : "red"
                    : null;
                  return (
                    <button
                      className={optionColor}
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                    >
                      {answerOption.answerText}
                    </button>
                  );
                })}
              </div>
              <button className="nextButton" onClick={nextClickHandler}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
