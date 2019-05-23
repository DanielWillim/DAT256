import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
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
import { uid, userName } from 'backend/user';
import DeveloperModeGPSCheck from 'DeveloperModeGPSCheck';
import GPSCheck, * as LocationStatus from 'GPSCheck';
import Leaderboard from 'Leaderboard';
import LogoutPage from 'LogoutPage';
import Menu from 'Menu';
import Question from 'Question';
import { randomQuestion } from 'questions';
import { checkStations } from 'stations';
import TicketPage from 'TicketPage';


let GPSLocationTimer = setTimeout(0);
let continusGPSChckerTimer = setTimeout(0);

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
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

const theme = createMuiTheme({
  palette: {
    background: {
      default: purple[300],
    },
  },
  overrides: {
    MuiTab: {
      root: {
        minWidth: 0,
        '@media (min-width: 0px)': {
          minWidth: 0,
        },
      },
    },
  },
});

// Default value for GameTimer, in seconds
const defaultGameTimer = 10;

class App extends Component {
  static contextType = AuthContext;

  state = {
    responded: false,
    currentQuestion: randomQuestion(),
    points: 0,
    timer: defaultGameTimer,
    gameOver: false,
    locationOk: LocationStatus.noLocation,
    developerModeGPSCheck: false,
    GPSLocationTime: 15 * 60 * 1000,
    continusGPSChckerTime: 3 * 1000,
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
    } = this.state;

    this.setState({
      gameOver: false,
      responded: false,
      timer: defaultGameTimer,
      points: 0,
      currentQuestion: randomQuestion(),
    });
  }

  GPSTimerOut = () => {
    this.setState({ locationOk: LocationStatus.locationTimerOut });
    clearTimeout(continusGPSChckerTimer);
    this.restartQuestions();
  }

  continiusGPSCheck = () => {
    const {
      continusGPSChckerTime,
    } = this.state;
    continusGPSChckerTimer = setTimeout(
      this.continiusGPSCheck,
      continusGPSChckerTime,
    );
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.GPSTimerResetCheck(checkStations(
          parseFloat(position.coords.latitude),
          parseFloat(position.coords.longitude),
        )),
      );
    }
  }

  GPSTimerResetCheck = (onStation) => {
    if (onStation === LocationStatus.validLocation) {
      this.GPSTimerReset();
    }
  }

  GPSTimerReset = () => {
    const {
      GPSLocationTime,
    } = this.state;
    clearTimeout(GPSLocationTimer);
    GPSLocationTimer = setTimeout(
      this.GPSTimerOut, GPSLocationTime,
    );
  }

  render() {
    const { classes } = this.props;
    const {
      GPSLocationTime,
      answered,
      continusGPSChckerTime,
      currentQuestion: { answers, question },
      developerModeGPSCheck,
      gameOver,
      locationOk,
      points,
      responded,
      ticketStatus,
      timer,
    } = this.state;
    const correctAnswers = answers
      .filter(([, isCorrect]) => isCorrect)
      .map(([answer]) => answer);

    if (locationOk !== LocationStatus.validLocation) {
      clearTimeout(GPSLocationTimer);
      if (!developerModeGPSCheck) {
        return (
          <GPSCheck
            classes={classes}
            developerModeGPSCheck={(developerMode) => {
              this.setState({ developerModeGPSCheck: { developerMode } });
            }}
            locationCheck={(onStation) => {
              if (onStation === LocationStatus.validLocation) {
                GPSLocationTimer = setTimeout(
                  this.GPSTimerOut,
                  GPSLocationTime,
                );
                continusGPSChckerTimer = setTimeout(
                  this.continiusGPSCheck,
                  continusGPSChckerTime,
                );
              }
              this.setState({ locationOk: onStation });
            }}
            locationOk={locationOk}
          />
        );
      }
      return (
        <DeveloperModeGPSCheck
          locationCheck={(onStation) => {
            this.setState({ locationOk: onStation });
            if (onStation === LocationStatus.validLocation) {
              GPSLocationTimer = setTimeout(
                this.GPSTimerOut,
                GPSLocationTime,
              );
              continusGPSChckerTimer = setTimeout(
                this.continiusGPSCheck,
                continusGPSChckerTime,
              );
            }
          }}
          locationOk={locationOk}
        />
      );
    }

    if (ticketStatus === ticketStatusConst.notResponded
     || ticketStatus === ticketStatusConst.error) {
      return (
        <TicketPage
          classes={classes}
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
          classes={classes}
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
          classes={classes}
          onNext={this.nextQuestion}
          answers={answers}
          answer={correctAnswers}
          buttontext="Nästa fråga"

          category="Lokalområde"
          question={question}
          points={points}
          timer={timer}
          answered={answered}
        />
      );
    }

    if (gameOver) {
      setScore(uid(this.context), points, userName(this.context));
      return (
        <Answer
          classes={classes}
          onNext={this.restartQuestions}
          answers={answers}
          answer={correctAnswers}
          buttontext="Starta nytt spel"
          category="Tiden är slut"
          question="Game Over"
          points={points}
          answered={answered}
        />
      );
    }

    // Fail
    return (
      <Answer
        classes={classes}
        onNext={this.nextQuestion}
        answers={answers}
        answer={correctAnswers}
        buttontext="Nästa fråga"
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
export default withStyles(styles)(({ classes }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <main className={classes.main}>
      <Card className={classes.card}>
        <Auth classes={classes}>
          <Menu
            classes={classes}
            App={App}
            Leaderboard={Leaderboard}
            LogoutPage={LogoutPage}
          />
        </Auth>
      </Card>
    </main>
  </MuiThemeProvider>
));
