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
import { userName } from 'backend/user';

function clicked(onCorrect, onFail) {
  const ticketNr = parseFloat(document.getElementById('idTicket').value).toString();

  if (verifyTicket(ticketNr)) {
    onCorrect();
  } else {
    onFail();
  }
}

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

class TicketPage extends Component {
  static contextType = AuthContext;

  render() {
    const {
      classes: { card, lowered },
      errorOccured,
      onCorrect,
      onFail,
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
                clicked(onCorrect, onFail);
              }
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => clicked(onCorrect, onFail)}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(TicketPage);
