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

function GameOver({
  answered,
  answers,
  category,
  classes: { card, lowered },
  mening,
  onNext,
  points,
  question,
}) {
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
              // console.log(isCorrect);
            }}
          >
            <CardContent style={
              {
                backgroundColor: getBackgroundColor(isCorrect, text, answered),
              }}
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
          Poäng:&nbsp;
          {points}
          &nbsp;
        </Typography>
        <br />
        <button type="button" onClick={onNext}>Starta om</button>
        <br />
        <br />
        <Typography variant="body1">
          Du har ingen tid kvar
        </Typography>
      </Card>
    </center>
  );
}

export default withStyles(styles)(GameOver);
