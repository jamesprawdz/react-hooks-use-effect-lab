import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

useEffect(() => {
  if (timeRemaining === 0) /*condition when time hits 0*/ { 
    setTimeRemaining(10);
    onAnswered(false);
    return; /* exit early with empty return */
  }

  const timerID = setTimeout(() /*sets up a timeout function*/ => {
    setTimeRemaining((timeRemaining) => timeRemaining -1)
  }, 1000) /*timeout function will run after 1 second*/

/* cleanup function*/
  return function () {
  clearTimeout(timerID);
  };
}, [timeRemaining, onAnswered]);
// the effect needs to run when the timeRemaining changes or when a question is answered

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
