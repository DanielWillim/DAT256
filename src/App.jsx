import React, { Component } from 'react';
import { shuffle } from 'lodash/fp';

import Question from 'question';
import Win from 'Win';
import Fail from 'fail';

const questions = [
{question:"Vilken av följande är INTE en stadsdel i Göteborg?",
    answers:[["Kålltorp", false], ["Hallonbergen", true], ["Majorna", false], ["Masthugget", false]]},
{question:"När var Eurovision song contest senast i Göteborg?",
    answers:[["2000", false], ["1975", false], ["1985", true], ["2014", false]]},
{question:"Vem var Chalmers först kvinnliga student?",
    answers:[["Vera Sandberg", true], ["Elisabeth Bennet", false], ["Anna Sundvall", false], ["Elin Silver", false]]},
{question:"Vad heter statyn på Götaplatsen?",
    answers:[["Poseidon", true], ["Pseudonymen", false], ["Presten", false], ["Panamaen", false]]},
{question:"Vad har Valand fått sitt namn ifrån?",
    answers:[["Völund", true], ["Valund", false], ["Velund", false], ["Vilund", false]]},
{question:"Vad heter den långa gatan mellan kungsportsplatsen och götaplatsen?",
    answers:[["Kungsportsavenyn", true], ["Götaplatsavenyn", false], ["Kungsportsgatan", false], ["Götaplatsgatan", false]]},
{question: "Vad är kurskoden för denna kurs?",
    answers:[["DAT256", true], ["DAT356", false], ["TAD007", false], ["TAD256", false]]},
{question: "Hur många frågor ska vi ha totalt?",
    answers:[["50", true], ["10", false], ["30", false], ["100", false]]},
{question: "Vad jobbade Sven Hultin med?",
    answers:[["Rektor för Chalmers", true], ["Rektor för Göteborgs universitet", false], ["Rektor för KTH", false], ["Kårordförande för Chalmers Studentkår", false]]}
];

export default class App extends Component {

  state = {
    responded: false,
    currentQuestion: questions[Math.floor(Math.random() * questions.length)],
  }

  render() {
    const { responded } = this.state;
    const { currentQuestion } = this.state;


    if (!responded) {
      return (
        <Question
          answer={shuffle(currentQuestion.answers)}
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
