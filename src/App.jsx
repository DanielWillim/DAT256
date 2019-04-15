import React, { Component } from 'react';

import Question from 'question';
import Win from 'Win';
import Fail from 'fail';

const questions = [
  { question: "Frågan", answers: [["Svar", true], ["Fel svar", false]]},
  {question: "Vad är kurskoden för denna kurs?", answers:[["DAT256", true], ["DAT356", false], ["TAD007", false], ["TAD256", false]] }
];

export default class App extends Component {
  state = {
    responded: false,
  }

  render() {
    const { responded } = this.state;

    if (!responded) {
      const currentQuestion=questions[Math.floor(Math.random() * questions.length)];
      return (
        <Question
          answer={currentQuestion.answers}
          onAnswer={won => this.setState({ responded: { won } })}
          question={currentQuestion.question}
          />
      );
    } else if (responded.won) {
      return (<Win />);
    } else {
      return (<Fail />);
    }
  }
}
