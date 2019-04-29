import React, { Component } from 'react';

import purple from '@material-ui/core/colors/deepPurple';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import { setInterval } from 'core-js';
import { shuffle } from 'lodash/fp';

import Fail from 'Fail';
import GameOver from 'GameOver';
import Question from 'Question';
import { randomQuestion } from 'questions';
import Win from 'Win';


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
    points: 0,
    setStartTimer: 9999,
    timer: 9999,
    gameOver: false,
    viewTime: 10.0,
  }

  nextQuestion = () => {
    this.setState({ responded: false, currentQuestion: randomQuestion() });
  }

  timerRunOut = () => {
    this.setState({ gameOver: true, responded: true });
  }

  restartQuestions = () => {
    const { setStartTimer } = this.state;
    this.setState({
      gameOver: false,
      responded: false,
      timer: setStartTimer,
      viewTime: Math.roof(setStartTimer / 1000),
      points: 0,
      currentQuestion: randomQuestion(),
    });
  }

  render() {
    const {
      currentQuestion: { answers, question },
      gameOver,
      points,
      responded,
      timer,
      viewTime,
    } = this.state;
    const correctAnswers = answers
      .filter(([, isCorrect]) => isCorrect)
      .map(([answer]) => answer);

    const { classes: { main } } = this.props;
    if (!responded) {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <main className={main}>
            <Question
              viewTimeLeft={() => {
                this.setState({ viewTime: Math.floor(viewTime - 0.1) });
              }}
              viewTime={viewTime}
              category="Lokalområdet"
              answers={answers}
              timer={timer}
              onTimeOut={this.timerRunOut}
              onAnswer={(won, newTimer) => {
                this.setState({ responded: { won } });
                if (won) {
                  this.setState({ points: points + 1, timer: newTimer + 3000 });
                } else if (points > 0) {
                  this.setState({ points: points - 1, timer: newTimer });
                } else {
                  this.setState({ timer: newTimer });
                }
              }
            }
              question={question}
            />
          </main>
        </MuiThemeProvider>
      );
    }

    if (responded.won) {
      return (
        <Win
          onNext={this.nextQuestion}
          answer={correctAnswers}
          points={points}
          timer={timer}
        />
      );
    }

    if (gameOver) {
      return (
        <GameOver
          onNext={this.restartQuestions}
          answer={correctAnswers}
          points={points}
        />
      );
    }

    return (
      <Fail
        onNext={this.nextQuestion}
        answer={correctAnswers}
        points={points}
        timer={timer}
      />
    );
  }
}

export default withStyles(styles)(App);
