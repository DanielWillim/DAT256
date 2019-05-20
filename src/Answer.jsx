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

function getBackgroundColor(isCorrect, text, answered) {
  if (isCorrect) {
    return '#42f442';
  }

  if (!isCorrect && text === answered) {
    return 'red';
  }

  return 'white';
}

function Answer({
  answered,
  answers,
  category,
  classes: { card, lowered },
  mening,
  onNext,
  points,
  question,
  timer,
  onExit,
}) {
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
            // console.log(isCorrect);
          }}
        >
          <CardContent style={
            { backgroundColor: getBackgroundColor(isCorrect, text, answered) }}
          >
            <Typography variant="body1">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      ))}
      <br />
      <Typography variant="h6">
        {mening}
        <br />
        Du har&nbsp;
        {points}
        &nbsp;poäng!
      </Typography>
      <br />
      <button type="button" onClick={onNext}>Fler frågor!</button>
      <button type="button" onClick={onExit}>Avsluta</button>
      <br />
      <br />
      <Typography variant="body1">
        Du har&nbsp;
        {timer / 1000}
        &nbsp;sekunder kvar!
      </Typography>
    </Card>
  );
}

export default withStyles(styles)(Answer);
