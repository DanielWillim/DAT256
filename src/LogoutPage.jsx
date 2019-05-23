import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { AuthContext } from 'backend/auth';

export default class LogOutpage extends Component {
  static contextType = AuthContext;

  render() {
    const { classes: { lowered } } = this.props;
    const { signOut } = this.context;

    return (
      <center>
        <CardContent>
          <Typography variant="h6" className={lowered}>
            Vill du logga ut?
          </Typography>
        </CardContent>
        <Divider />
        <br />
        <Button
          variant="contained"
          align="center"
          type="button"
          onClick={signOut}
        >
          Logga ut
        </Button>
        <br />
        <br />
      </center>
    );
  }
}
