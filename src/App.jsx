import React, { Component } from 'react';
import { shuffle } from 'lodash/fp';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/deepPurple';

import Question from 'question';
import Win from 'Win';
import Fail from 'fail';
import { randomQuestion } from 'questions';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const theme = createMuiTheme({
  palette: {
    background: {
      default: purple[300],
    },
  },
});

class App extends Component {
  state = {
    responded: false,
    currentQuestion: randomQuestion(),
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

    const { classes: { main } } = this.props;

    if (!responded) {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <main className={main}>
            <Question
              category="Lokalområdet"
              answers={shuffle(answers)}
              onAnswer={won => this.setState({ responded: { won } })}
              question={question}
            />
          </main>
        </MuiThemeProvider>
      );
    } else if (responded.won) {
      return (<Win onNext={this.nextQuestion} answer={correctAnswers} />);
    } else {
      return (<Fail onNext={this.nextQuestion} answer={correctAnswers} />);
    }
  }
}

export default withStyles(styles)(App);
