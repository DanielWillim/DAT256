import React, { Component } from 'react';

import Question from 'question';
import Win from 'Win';
import Fail from 'fail';

const questions = [
{question:"Vem var Chalmers först kvinnliga student?", answers:[["Vera Sandberg", true], ["Elisabeth Bennet", false], ["Anna Sundvall", false], ["Elin Silver", false]]},
{question:"Vad heter statyn på Götaplatsen?", answers:[["Poseidon", true], ["Pseudonymen", false], ["Presten", false], ["Panamaen", false]]},
{question:"Vad har Valand fått sitt namn ifrån?", answers:[["Völund", true], ["Valund", false], ["Velund", false], ["Vilund", false]]},
{question:"Vad heter den långa gatan mellan kungsportsplatsen och götaplatsen?", answers:[["Kungsportsavenyn", true], ["Götaplatsavenyn", false], ["Kungsportsgatan", false], ["Götaplatsgatan", false]]},
]

export default class App extends Component {
  state = {
    responded: false,
  }

  render() {
    const { responded } = this.state;

    if (!responded) {
      return (
        <Question
          answer={[["DAT256", true], ["DAT356", false], ["TAD007", false], ["TAD256", false]]}
          onAnswer={won => this.setState({ responded: { won } })}
          question="Vad är kurskoden för denna kurs?"
          />
      );
    } else if (responded.won) {
      return (<Win />);
    } else {
      return (<Fail />);
    }
  }
}
