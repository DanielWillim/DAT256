import React, { Component } from 'react';

import purple from '@material-ui/core/colors/deepPurple';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';

import Answer from 'Answer';
import Auth, { AuthContext } from 'backend/auth';

import { setScore } from 'backend/db';
import { uid } from 'backend/user';
import GameOver from 'GameOver';
import Leaderboard from 'Leaderboard';
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

class App extends Component {
  static contextType = AuthContext;

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
    const {
      points,
      setStartTimer,
    } = this.state;

    setScore(uid(this.context), points);

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

    // kommentera in detta för att testa Leaderboard
    /**
    return (
      <Leaderboard />
    );
   */

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
          }}
          question={question}
        />
      );
    }

    if (responded.won) {
      return (
        <Answer
          mening="Grattis du svarade rätt!"
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
        <GameOver
          onNext={this.restartQuestions}
          answer={correctAnswers}
          points={points}
        />
      );
    }

    return (
      <Answer
        mening="Fail! Du svarade fel!"
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
