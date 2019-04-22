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
}) {
  const questionTimer = setTimeout(onTimeOut, timer);
  const timeWhenStarted = (new Date()).getTime();

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
            clearTimeout(questionTimer);
            onAnswer(isCorrect, timeLeft);
          }}
        >
          <CardContent>
            <Typography variant="body1">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      ))}
    </Card>
  );
}

export default withStyles(styles)(Question);
