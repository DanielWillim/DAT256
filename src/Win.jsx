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

function Winning({
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
            console.log(isCorrect);
          }}
        >
          <CardContent style={{ backgroundColor: '#42f442' }}>
            <Typography variant="body1">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      ))}
      <br />
      <Typography variant="body1">
        Grattis, du svarade rätt! Du har&nbsp;
        {points}
        &nbsp;poäng!
      </Typography>
      <br />
      <button type="button" onClick={onNext}>Fler frågor!</button>
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

export default withStyles(styles)(Winning);
