import React, { Component } from 'react';

import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { getHighscores } from 'backend/db';

const loading = Symbol('loading');

export default class Leaderboard extends Component {
  state = {
    highscores: loading,
  }

  async componentDidMount() {
    this.setState({ highscores: await getHighscores() });
  }

  render() {
    const { classes: { lowered } } = this.props;
    const { highscores } = this.state;

    if (highscores === loading) return <CircularProgress />;

    return (
      <CardContent>
        <Typography variant="h6" className={lowered}>
          Topplista
        </Typography>
        <Divider />
        <Typography variant="h6" className={lowered}>
          {highscores.map(({ name, score: points }, place) => (
            <CardContent key={name}>
              <Typography variant="body1">
                {`${place + 1}. ${name}: ${points} poäng`}
              </Typography>
              <Divider />
            </CardContent>
          ))}
        </Typography>
      </CardContent>
    );
  }
}
