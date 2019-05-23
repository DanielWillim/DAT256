import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

function PickName({
  classes: { card, lowered },
}) {
  return (
    <Card className={card}>
      <CardContent>
        <Typography variant="h6" className={lowered}>
          Skriv in ditt namn för registrering till topplista
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <TextField
          id="name"
          label="Vad e ditt namn"
          defaultValue="Namn"
          margin="normal"
        />
      </CardContent>
      <Divider />
      <CardActionArea
        onClick={() => {
        }}
      >
        <CardContent>
          <Typography variant="body1">
            Registrera namn
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(PickName);
