import React, { Component } from 'react';
import { shuffle } from 'lodash/fp';

import Question from 'question';
import Win from 'Win';
import Fail from 'fail';
import { randomQuestion } from 'questions';



export default class App extends Component {
  state = {
    responded: false,
    currentQuestion: randomQuestion(),
    points: 0
  }

  nextQuestion=()=>{
    console.log("nextQestion körs!")
    this.setState({ responded: false, currentQuestion: randomQuestion() });
  }

  render() {
    const { responded, currentQuestion: { answers, question } } = this.state;
    const correctAnswers = answers
      .filter(([ , isCorrect]) => isCorrect)
      .map(([answer, ]) => answer)

    if (!responded) {
      return (
        <Question
          answer={shuffle(answers)}
          onAnswer={won => {
            this.setState({ responded: { won } });
            if (won){
              this.setState({points: this.state.points + 1})
            }
          }
        }
          question={question}
        />
      );
    } else if (responded.won) {
      return (<Win onNext={this.nextQuestion} answer={correctAnswers} points={this.state.points}/>);
    } else {
      return (<Fail onNext={this.nextQuestion} answer={correctAnswers} points={this.state.points}/>);
    }
    return (<Fail />);
  }
}
