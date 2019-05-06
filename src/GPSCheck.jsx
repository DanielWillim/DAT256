import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import { checkStations } from 'stations';

export const noLocation = 'noLocation';
export const invalidLocation = 'invalidLocation';
export const validLocation = 'validLocation';
export const locationNotAvailable = 'locationNotAvailable';
export const locationTimerOut = 'locationTimerOut';

const styles = () => ({
  card: { minWidth: 275 },
  lowered: { marginTop: 12 },
});

function getCorrectLocationQuestion(whichQuestion) {
  if (whichQuestion === noLocation) {
    return 'Välkommen till världens bästa spel!';
  }
  if (whichQuestion === locationNotAvailable) {
    return 'Geolocation is not supported by this browser.';
  }
  if (whichQuestion === locationTimerOut) {
    return 'Du har varit bort från en hållplats förlänge! Gå till en för att forstätta spela!';
  }
  return 'Du kan tyvärr inte spela världens bästa spel när du inte är på en hållplats. Gå till en hållplats och försök igen!';
}

function GPSCheck({
  classes: { card, lowered },
  developerModeGPSCheck,
  locationCheck,
  locationOk,
}) {
  return (
    <Card className={card}>
      <CardContent>
        <Typography variant="h6" className={lowered}>
          {getCorrectLocationQuestion(locationOk)}
        </Typography>
        <Typography variant="h9" className={lowered}>
          {'Genom att starta spelet ger du tillåtesle till att vi kontrollerar vart du befinner dig.'}
        </Typography>
      </CardContent>
      <Divider />
      <CardActionArea
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => locationCheck(
              checkStations(
                parseFloat(position.coords.latitude),
                parseFloat(position.coords.longitude),
              ),
            ));
          } else {
            locationCheck(locationNotAvailable);
          }
        }}
      >
        <CardContent>
          <Typography variant="body1">
            {'Starta spelet'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActionArea
        onClick={() => {
          developerModeGPSCheck(true);
          locationCheck(noLocation);
        }}
      >
        <CardContent>
          <Typography variant="body1">
            {'Activate DeveloperMode'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(GPSCheck);
