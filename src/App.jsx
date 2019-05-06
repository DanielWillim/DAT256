import React, { Component } from 'react';

import purple from '@material-ui/core/colors/deepPurple';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';

import DeveloperModeGPSCheck from 'DeveloperModeGPSCheck';
import Fail from 'Fail';
import GameOver from 'GameOver';
import GPSCheck, * as LocationStatus from 'GPSCheck';
import Question, * as Timer from 'Question';
import { randomQuestion } from 'questions';
import { checkStations } from 'stations';
import Win from 'Win';

let GPSLocationTimer = setTimeout(0);
let continusGPSChckerTimer = setTimeout(0);

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
    gameOver: false,
    locationOk: LocationStatus.noLocation,
    developerModeGPSCheck: false,
    GPSLocationTime: 60000,
    continusGPSChckerTime: 3000,
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

  GPSTimerOut = () => {
    clearTimeout(Timer.gameTimer);
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
      continusGPSChckerTime,
      currentQuestion: { answers, question },
      developerModeGPSCheck,
      gameOver,
      locationOk,
      points,
      responded,
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
