import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

function ticketCheck(ticketID) {
  console.log('hej');
  return true;
}

function TicketPage({
  classes: { card, lowered },
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
          id="idTicket"
          label="Biljettnummer"
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            const ticketNr = parseFloat(document.getElementById('idTicket').value);
            ticketCheck(ticketNr);
          }}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(TicketPage);
