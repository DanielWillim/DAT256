import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { checkStations } from 'stations';

export const noLocation = 'noLocation';
export const invalidLocation = 'invalidLocation';
export const validLocation = 'validLocation';
export const locationNotAvailable = 'locationNotAvailable';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

function getCorrectLocationQuestion(whichQuestion) {
  if (whichQuestion === noLocation) {
    return 'Välkommen till världens bästa spel!';
  }
  if (whichQuestion === locationNotAvailable) {
    return 'Geolocation is not supported by this browser. För att kunna spela måste du ha checkat in i spelet vid en hållplats under de senaste 15 minutrarna.';
  }
  return 'Du kan tyvärr inte spela världens bästa spel. För att kunna spela måste du ha checkat in i spelet vid en hållplats under de senaste 15 minutrarna. Gå till en hållplats och försök igen!';
}

function DeveloperModeGPSCheck({
  classes: { card, lowered },
  locationCheck,
  locationOk,
}) {
  return (
    <Card className={card}>
      <CardContent>
        <Typography variant="h6" className={lowered}>
          {getCorrectLocationQuestion(locationOk)}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="h9" className={lowered}>
          {'I DeveloperMode måste du ange vilka kordinater som du befinner dig på.'}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="h10" className={lowered}>
          {'Tips: Testkordinater är latitude=1 och longitude=1'}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <TextField
          id="idLatitude"
          label="latitude"
          defaultValue="12.3456(+-)5"
          margin="normal"
        />

        <TextField
          id="idLongitude"
          label="longitude"
          defaultValue="12.3456(+-)5"
          margin="normal"
        />
      </CardContent>
      <Divider />
      <CardActionArea
        onClick={() => {
          const latitude = parseFloat(document.getElementById('idLatitude').value);
          const longitude = parseFloat(document.getElementById('idLongitude').value);
          locationCheck(checkStations(latitude, longitude));
        }}
      >
        <CardContent>
          <Typography variant="body1">
            {'Är jag på en hållplats?'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(DeveloperModeGPSCheck);
