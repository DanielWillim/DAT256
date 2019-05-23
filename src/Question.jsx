import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { round } from 'lodash';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

// How many seconds each tick should be
const GAME_TIMER_INTERVALL = 0.1;
const GAME_TIMER_PRECISION = 1;

class Question extends Component {
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
      classes: { card, lowered },
      onAnswer,
      points,
      question,
      timer,
    } = this.props;

    return (
      <center>
        <Card className={card}>
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
        </Card>
      </center>
    );
  }
}

export default withStyles(styles)(Question);
