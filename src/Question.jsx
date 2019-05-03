import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
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

  const gameTimer = setTimeout(
    stopTimer, (timer) - 1000 * Math.floor(timerFloor),
  );

  return (
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
            const timeLeft = timer - ((new Date()).getTime() - timeWhenStarted);
            clearTimeout(gameTimer);
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
        <Typography variant="body1">
          {`Tid kvar: ${Math.ceil(timer / 1000)}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Question);
