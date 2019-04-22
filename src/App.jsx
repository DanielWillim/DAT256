import React, { Component } from 'react';

import purple from '@material-ui/core/colors/deepPurple';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import { shuffle } from 'lodash/fp';

import Fail from 'Fail';
import Question from 'Question';
import { randomQuestion } from 'questions';
import Win from 'Win';
import GameOver from 'GameOver';


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
    setStartTimer: 10000,
    timer: 10000,
    gameOver: false
  }

  nextQuestion = () => {
    this.setState({ responded: false, currentQuestion: randomQuestion() });
  }

  timerRunOut = () => {
    this.setState({ gameOver: true, responded: true });
  }

  restartQuestions = () => {
    this.setState({ 
      gameOver: false, 
      responded: false, 
      timer: this.state.setStartTimer, 
      points: 0, 
      currentQuestion: 
      randomQuestion()});
  }

  render() {
    const {
      responded,
      currentQuestion: { answers, question },
      points,
      timer,
      gameOver,
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
              category="Lokalområdet"
              answers={shuffle(answers)}
              timer={timer}
              onTimeOut={this.timerRunOut}
              onAnswer={(won, newTimer) => {
                this.setState({ responded: { won } });
                if (won) {
                  this.setState({ points: points + 1, timer: newTimer + 3000 });
                }
                else{
                  this.setState({timer: newTimer - 1000})
                }
              }}
              question={question}
            />
          </main>
        </MuiThemeProvider>
      );
    }

    else if (responded.won) {
      return (
        <Win
          onNext={this.nextQuestion}
          answer={correctAnswers}
          points={points}
          timer={timer}
        />
      );
    }
    else if (gameOver) {
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
