import React, { Component } from 'react';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { round } from 'lodash';

// How many seconds each tick should be
const GAME_TIMER_INTERVALL = 0.1;
const GAME_TIMER_PRECISION = 1;

export default class Question extends Component {
  componentDidMount() {
    this.interval = setInterval(this.tick, GAME_TIMER_INTERVALL * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const {
      onTimeOut,
      timer,
      updateGameTimer,
    } = this.props;

    const roundedTime = round(timer - GAME_TIMER_INTERVALL, 2);

    if (timer > GAME_TIMER_INTERVALL) {
      updateGameTimer(roundedTime);
    } else {
      onTimeOut();
    }
  }

  render() {
    const {
      answers,
      category,
      classes: { lowered },
      onAnswer,
      points,
      question,
      timer,
    } = this.props;

    return (
      <center>
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {category}
          </Typography>
          <Typography variant="h6" className={lowered}>
            {question}
          </Typography>
        </CardContent>
        <Divider />
        { answers.map(([text, isCorrect]) => (
          <CardActionArea
            key={text}
            onClick={() => {
              onAnswer(isCorrect, text);
            }}
          >
            <CardContent>
              <Typography variant="body1">
                {text}
              </Typography>
            </CardContent>
          </CardActionArea>
        ))}
        <Divider />
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Typography variant="body1" align="left">
                {`Tid kvar: ${timer.toFixed(GAME_TIMER_PRECISION)}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                {`Poäng: ${points}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </center>
    );
  }
}
