import React from 'react';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
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
  category,
  classes: { lowered },
  mening,
  onNext,
  points,
  question,
  timer,
}) {
  return (
    <React.Fragment>
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
      <br />
      <br />
      <Typography variant="body1">
        Du har&nbsp;
        {timer / 1000}
        &nbsp;sekunder kvar!
      </Typography>
    </React.Fragment>
  );
}
