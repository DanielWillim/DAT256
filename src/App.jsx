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
import DeveloperModeGPSCheck from 'DeveloperModeGPSCheck';
import GPSCheck, * as LocationStatus from 'GPSCheck';
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
    locationOk: LocationStatus.noLocation,
    developerModeGPSCheck: false,
    GPSLocationTime: 60000,
    continusGPSChckerTime: 3000,
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

  GPSTimerOut = () => {
    this.setState({ locationOk: LocationStatus.locationTimerOut });
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

    const { classes: { main } } = this.props;

    if (locationOk !== LocationStatus.validLocation) {
      clearTimeout(GPSLocationTimer);
      if (!developerModeGPSCheck) {
        return (
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <main className={main}>
              <GPSCheck
                developerModeGPSCheck={(developerMode) => {
                  this.setState({ developerModeGPSCheck: { developerMode } });
                }}
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
            </main>
          </MuiThemeProvider>
        );
      }
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <main className={main}>
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
          </main>
        </MuiThemeProvider>
      );
    }

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
      return (
        <Answer
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
