import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = () => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  lowered: {
    marginTop: 12,
  },
});

function Question({
  answers,
  question,
  category,
  onAnswer,
  classes: {
    card, title, lowered,
  },
}) {
  return (
    <Card className={card}>
      <CardContent>
        <Typography className={title} color="textSecondary" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h6" className={lowered}>
          {question}
        </Typography>
      </CardContent>
      <Divider />
      { answers.map(([text, isCorrect]) => (
        <CardActionArea key={text} onClick={() => onAnswer(isCorrect)}>
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
