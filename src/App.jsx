import React, { Component } from 'react';

import purple from '@material-ui/core/colors/deepPurple';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';

import Answer from 'Answer';
import GameOver from 'GameOver';
import Question from 'Question';
import { randomQuestion } from 'questions';
import TicketPage from 'TicketPage';

const ticketStatusConst = {
  validTicket: 'Valid',
  error: 'TicketError',
  notResponded: 'NotResponded',
};

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
const theme1 = createMuiTheme({
  palette: {
    background: {
      default: '#8bc34a',
    },
  },
});
const theme2 = createMuiTheme({
  palette: {
    background: {
      default: '#F44336',
    },
  },
});

const theme3 = createMuiTheme({
  palette: {
    background: {
      default: '#212121',
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
    gameOver: false,
    answered: '-',
    ticketStatus: ticketStatusConst.notResponded,
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
      points: 0,
      currentQuestion: randomQuestion(),
    });
  }

  render() {
    const {
      answered,
      currentQuestion: { answers, question },
      gameOver,
      points,
      responded,
      ticketStatus,
      timer,
    } = this.state;
    const correctAnswers = answers
      .filter(([, isCorrect]) => isCorrect)
      .map(([answer]) => answer);

    const { classes: { main } } = this.props;

    if (ticketStatus === ticketStatusConst.notResponded
     || ticketStatus === ticketStatusConst.error) {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <main className={main}>
            <TicketPage
              onFail={() => {
                this.setState({ ticketStatus: ticketStatusConst.error });
              }}
              onCorrect={() => {
                this.setState({ ticketStatus: ticketStatusConst.validTicket });
              }}
              errorOccured={ticketStatus === ticketStatusConst.error}
            />
          </main>
        </MuiThemeProvider>
      );
    }

    if (!responded) {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <main className={main}>
            <Question
              viewTimeLeft={(newTimer) => {
                this.setState({ timer: newTimer });
              }}
              category="Lokalområdet"
              answers={answers}
              timer={timer}
              onTimeOut={this.timerRunOut}
              onAnswer={(won, newTimer, text) => {
                this.setState({ responded: { won } });
                this.setState({ answered: text });
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
        <MuiThemeProvider theme={theme1}>
          <CssBaseline />
          <main className={main}>
            <Answer
              mening="RÄTT!"
              onNext={this.nextQuestion}
              answers={answers}
              answer={correctAnswers}
              category="Lokalområde"
              question={question}
              points={points}
              timer={timer}
              answered={answered}
            />
          </main>
        </MuiThemeProvider>
      );
    }

    if (gameOver) {
      return (
        <MuiThemeProvider theme={theme3}>
          <CssBaseline />
          <main className={main}>
            <GameOver
              mening="GAME OVER!"
              onNext={this.restartQuestions}
              answers={answers}
              answer={correctAnswers}
              category="Lokalområde"
              question={question}
              points={points}
              answered={answered}
            />
          </main>
        </MuiThemeProvider>
      );
    }

    return (
      <MuiThemeProvider theme={theme2}>
        <CssBaseline />
        <main className={main}>
          <Answer
            mening="FEL!"
            onNext={this.nextQuestion}
            answers={answers}
            answer={correctAnswers}
            category="Lokalområde"
            question={question}
            points={points}
            timer={timer}
            answered={answered}
          />
        </main>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
