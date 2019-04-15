import React, { Component } from 'react';

import Question from 'question';
import Win from 'Win';
import Fail from 'fail';

const questions  = [
        {qusetion:"Stanner denna buss vid teknikgatan?",answers:[["Ja, i varje tur", true], ["Ja, enbart på helger", false], ["Ja, enbart på vardagar", false], ["Ja, enbart tentaveckor, omtenatveckor och under mottagningen", false]]},
        {qusetion:"Vilken hållplats är närmast Gasquen?",answers:[["Chalmersplatsen", true], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", false]]},
        {qusetion:"Vilken hållplats är närmast Basen?",answers:[["Chalmersplatsen", false], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", true]]},
        {qusetion:"Vilken hållplats är närmast gruppren EG-2516?",answers:[["Chalmersplatsen", false], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", true]]},
        {qusetion:"Hur många spårvagnslinjer går det i Göteborg?",answers:[["12", true], ["11", false], ["13", false], ["10", false]]},
        {qusetion:"Vilken hållplats är närmast Kårhuset?",answers:[["Chalmersplatsen", true], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", false]]},
        {qusetion:"Vilken hållplats är närmast Olgas trappor?",answers:[["Chalmersplatsen", true], ["Chalmers", false], ["Sven hultins gata", false], ["Chalmers tvärgata", false]]},
        {qusetion:"Vilken hållplats är närmast Coop Landala?",answers:[["Kapellplatsen", true], ["Vasaplatsen", false], ["Kortedala Torg", false], ["Chalmers tvärgata", false]]}
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
