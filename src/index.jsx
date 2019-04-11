import React from 'react';
import ReactDOM from 'react-dom';
import Question from 'question';

ReactDOM.render(
  <Question
    answer={[["DAT256", true], ["DAT356", false], ["TAD007", false], ["TAD256", false]]}
    onAnswer={(isCorrect)=>console.log(isCorrect)}
    question="Vad är kurskoden för denna kurs?"
    />,
  document.getElementById('app'),
);

module.hot.accept();
