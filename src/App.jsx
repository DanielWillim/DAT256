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
{question:"Vem var Chalmers först kvinnliga student?", answers:[["Vera Sandberg", true], ["Elisabeth Bennet", false], ["Anna Sundvall", false], ["Elin Silver", false]]},
{question:"Vad heter statyn på Götaplatsen?", answers:[["Poseidon", true], ["Pseudonymen", false], ["Presten", false], ["Panamaen", false]]},
{question:"Vad har Valand fått sitt namn ifrån?", answers:[["Völund", true], ["Valund", false], ["Velund", false], ["Vilund", false]]},
{question:"Vad heter den långa gatan mellan kungsportsplatsen och götaplatsen?", answers:[["Kungsportsavenyn", true], ["Götaplatsavenyn", false], ["Kungsportsgatan", false], ["Götaplatsgatan", false]]},
  { question: "Frågan", answers: [["Svar", true], ["Fel svar", false]]},
  {question: "Vad är kurskoden för denna kurs?", answers:[["DAT256", true], ["DAT356", false], ["TAD007", false], ["TAD256", false]] },
{question:"Stanner denna buss vid teknikgatan?",answers:[["Ja, i varje tur", true], ["Ja, enbart på helger", false], ["Ja, enbart på vardagar", false], ["Ja, enbart tentaveckor, omtenatveckor och under mottagningen", false]]},
{question:"Vilken hållplats är närmast Gasquen?",answers:[["Chalmersplatsen", true], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", false]]},
{question:"Vilken hållplats är närmast Basen?",answers:[["Chalmersplatsen", false], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", true]]},
{question:"Vilken hållplats är närmast gruppren EG-2516?",answers:[["Chalmersplatsen", false], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", true]]},
{question:"Hur många spårvagnslinjer går det i Göteborg?",answers:[["12", true], ["11", false], ["13", false], ["10", false]]},
{question:"Vilken hållplats är närmast Kårhuset?",answers:[["Chalmersplatsen", true], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", false]]},
{question:"Vilken hållplats är närmast Olgas trappor?",answers:[["Chalmersplatsen", true], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", false]]},
{question:"Vilken hållplats är närmast Coop Landala?",answers:[["Kapellplatsen", true], ["Vasaplatsen", false], ["Kortedala Torg", false], ["Chalmers tvärgata", false]]},
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
