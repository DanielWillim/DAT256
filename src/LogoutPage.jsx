import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { AuthContext } from 'backend/auth';
import { updatePrivateUserData } from 'backend/db';
import { uid } from 'backend/user';

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
        <br />
        <Button
          variant="contained"
          align="center"
          type="button"
          onClick={signOut}
        >
          Logga ut!
        </Button>
        <br />
        <br />
        <Divider />
        <CardContent>
          <Typography variant="h6" className={lowered}>
            Vill du ta bort din biljet?
          </Typography>
        </CardContent>
        <br />
        <Button
          variant="contained"
          align="center"
          type="button"
          onClick={() => updatePrivateUserData(
            uid(this.context),
            { ticketNr: null },
          )}
        >
          Glöm biljett!
        </Button>
        <br />
        <br />
      </center>
    );
  }
}
