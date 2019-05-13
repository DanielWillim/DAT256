import React from 'react';

import Button from '@material-ui/core/Button';
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
  onNext,
  points,
  question,
  timer,
}) {
  return (
    <Card className={card}>
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
                {`Tid kvar: ${Math.ceil((timer === undefined ? 0 : timer) / 1000)}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                {`Poäng: ${points}`}
              </Typography>
            </Grid>
          </Grid>
          <Button variant="contained" align="center" onClick={onNext}>Nästa fråga</Button>
        </CardContent>
      </center>
    </Card>
  );
}

export default withStyles(styles)(Answer);
