import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import verifyTicket from './TicketDatabase';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

function TicketPage({
  classes: { card, lowered },
  errorOccured,
  onCorrect,
  onFail,
}) {
  return (
    <Card className={card}>
      <CardContent>
        <Typography variant="h6" className={lowered}>
          {'Vad har du för biljettnummer?'}
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
              const ticketNr = parseFloat(document.getElementById('idTicket').value).toString();

              if (verifyTicket(ticketNr)) {
                onCorrect();
              } else {
                onFail();
              }
            }
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            const ticketNr = parseFloat(document.getElementById('idTicket').value).toString();

            if (verifyTicket(ticketNr)) {
              onCorrect();
            } else {
              onFail();
            }
          }}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(TicketPage);
