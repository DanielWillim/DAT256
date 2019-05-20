import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

function Leaderboard({
  classes: { card, lowered },
  leaders,
}) {
  return (
    <Card className={card}>
      <CardContent>
        <Typography variant="h6" className={lowered}>
          Resultatlista
        </Typography>
        <Divider />
        <Typography variant="h6" className={lowered}>
          {leaders.map(([place, name, points]) => (
            <CardContent>
              <Typography variant="body1">
                {place}
                {'. '}
                {name}
                {': '}
                {points}
                {' poäng'}
                <Divider />
              </Typography>
            </CardContent>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Leaderboard);
