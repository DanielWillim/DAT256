import React, { Component } from 'react';

import purple from '@material-ui/core/colors/deepPurple';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';

import Answer from 'Answer';
import Auth from 'backend/auth';
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

// Default value for GameTimer, in seconds
const defaultGameTimer = 10;

class App extends Component {
  state = {
    responded: false,
    currentQuestion: randomQuestion(),
    points: 0,
    timer: defaultGameTimer,
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
    this.setState({
      gameOver: false,
      responded: false,
      timer: defaultGameTimer,
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

    if (ticketStatus === ticketStatusConst.notResponded
     || ticketStatus === ticketStatusConst.error) {
      return (
        <TicketPage
          onFail={() => {
            this.setState({ ticketStatus: ticketStatusConst.error });
          }}
          onCorrect={() => {
            this.setState({ ticketStatus: ticketStatusConst.validTicket });
          }}
          errorOccured={ticketStatus === ticketStatusConst.error}
        />
      );
    }

    if (!responded) {
      return (
        <Question
          updateGameTimer={(newTimer) => {
            this.setState({ timer: newTimer });
          }}
          category="Lokalområdet"
          answers={answers}
          points={points}
          timer={timer}
          onTimeOut={this.timerRunOut}
          onAnswer={(won, text) => {
            this.setState({ responded: { won } });
            this.setState({ answered: text });
            if (won) {
              this.setState({ points: points + 1, timer: timer + 3 });
            } else if (points > 0) {
              this.setState({ points: points - 1 });
            }
          }}
          question={question}
        />
      );
    }

    if (responded.won) {
      return (
        <Answer
          onNext={this.nextQuestion}
          answers={answers}
          answer={correctAnswers}
          category="Lokalområde"
          question={question}
          points={points}
          timer={timer}
          answered={answered}
        />
      );
    }

    if (gameOver) {
      return (
        <Answer
          onNext={this.restartQuestions}
          answers={answers}
          answer={correctAnswers}
          category="Lokalområde"
          question={question}
          points={points}
          answered={answered}
        />
      );
    }

    // Fail
    return (
      <Answer
        onNext={this.nextQuestion}
        answers={answers}
        answer={correctAnswers}
        category="Lokalområde"
        question={question}
        points={points}
        timer={timer}
        answered={answered}
      />
    );
  }
}

// Wrap App in style and authentication
export default withStyles(styles)(({ classes: { main } }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <main className={main}>
      <Auth>
        <App />
      </Auth>
    </main>
  </MuiThemeProvider>
));
