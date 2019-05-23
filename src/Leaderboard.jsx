import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { getHighscores } from 'backend/db';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

const loading = Symbol('loading');

class Leaderboard extends Component {
  state = {
    highscores: loading,
  }

  async componentDidMount() {
    this.setState({ highscores: await getHighscores() });
  }

  render() {
    const { classes: { card, lowered } } = this.props;
    const { highscores } = this.state;

    if (highscores === loading) return <CircularProgress />;

    return (
      <Card className={card}>
        <CardContent>
          <Typography variant="h6" className={lowered}>
            Resultatlista
          </Typography>
          <Divider />
          <Typography variant="h6" className={lowered}>
            {highscores.map(({ name, score: points }, place) => (
              <CardContent key={name}>
                <Typography variant="body1">
                  {`${place + 1}. ${name}: ${points} poäng`}
                  <Divider />
                </Typography>
              </CardContent>
            ))}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Leaderboard);
