import React from 'react';

import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


function getBackgroundColor(isCorrect, text, answered) {
  if (isCorrect) {
    return '#42f442';
  }

  if (!isCorrect && text === answered) {
    return 'red';
  }

  return 'white';
}

export default function Answer({
  answered,
  answers,
  buttontext,
  category,
  classes: { lowered },
  onNext,
  points,
  question,
  timer,
}) {
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
        >
          <CardContent style={
            { backgroundColor: getBackgroundColor(isCorrect, text, answered) }
          }
          >
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
              {`Tid kvar: ${timer === undefined ? 0 : timer}`}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" align="right">
              {`Poäng: ${points}`}
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" align="center" onClick={onNext}>{buttontext}</Button>
      </CardContent>
    </center>
  );
}
