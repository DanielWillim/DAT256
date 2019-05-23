import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import verifyTicket from './TicketDatabase';
import { AuthContext } from 'backend/auth';
import { getPrivateUserData, updatePrivateUserData } from 'backend/db';
import { userName, uid } from 'backend/user';


const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

class TicketPage extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    const self = this;
    getPrivateUserData(uid(this.context))
      .then((data => self.onTicketNumber(data.ticketNr)));
  }

  onTicketNumber = (ticketNr) => {
    const { onCorrect, onFail } = this.props;

    if (verifyTicket(ticketNr)) {
      onCorrect();
      updatePrivateUserData(uid(this.context), { ticketNr });
    } else {
      onFail();
    }
  }


  render() {
    const {
      classes: { card, lowered },
      errorOccured,
    } = this.props;
    const name = userName(this.context);

    return (
      <Card className={card}>
        <CardContent>
          <Typography variant="h6" className={lowered}>
            {`Vad har du för biljettnummer ${name}?`}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <TextField
            error={errorOccured}
            id="idTicket"
            label="Biljettnummer"
            margin="normal"
            helperText={errorOccured ? 'Ogiltigt biljettnummer' : ''}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                this.onTicketNumber(parseFloat(document.getElementById('idTicket').value).toString());
              }
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => this.onTicketNumber(parseFloat(document.getElementById('idTicket').value).toString())}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(TicketPage);
