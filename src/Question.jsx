import React, { useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

function Question({
  answers,
  category,
  classes: { card, lowered },
  onAnswer,
  onTimeOut,
  points,
  question,
  timer,
  viewTimeLeft,
}) {
  const timeWhenStarted = (new Date()).getTime();
  const timerFloor = timer / 1000;

  const stopTimer = () => {
    if (timer > 1000) {
      const timeLeft = timer - ((new Date()).getTime() - timeWhenStarted);
      viewTimeLeft(timeLeft);
    } else {
      onTimeOut();
    }
  };

  useEffect(() => {
    const gameTimer = setTimeout(
      stopTimer, (timer) - 1000 * Math.floor(timerFloor),
    );

    return () => clearTimeout(gameTimer);
  });
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
              const timeLeft = timer - ((+new Date()) - timeWhenStarted);
              onAnswer(isCorrect, timeLeft, text);
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
                {`Tid kvar: ${Math.ceil(timer / 1000)}`}
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

export default withStyles(styles)(Question);
