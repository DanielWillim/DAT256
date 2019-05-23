import React from 'react';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import * as LocationStatus from 'GPSCheck';
import { checkStations } from 'stations';

function getCorrectLocationQuestion(whichQuestion) {
  if (whichQuestion === LocationStatus.noLocation) {
    return 'Välkommen till världens bästa spel!';
  }
  if (whichQuestion === LocationStatus.locationNotAvailable) {
    return 'Geolocation is not supported by this browser. För att kunna spela måste du ha checkat in i spelet vid en hållplats under de senaste 15 minutrarna.';
  }
  if (whichQuestion === LocationStatus.locationTimerOut) {
    return 'Du har varit bort från en hållplats förlänge! Gå till en för att forstätta spela!';
  }
  return 'Du kan tyvärr inte spela världens bästa spel. För att kunna spela måste du ha checkat in i spelet vid en hållplats under de senaste 15 minutrarna. Gå till en hållplats och försök igen!';
}

export default function DeveloperModeGPSCheck({
  classes: { lowered },
  locationCheck,
  locationOk,
}) {
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" className={lowered}>
          {getCorrectLocationQuestion(locationOk)}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body1" className={lowered}>
          I DeveloperMode måste du ange vilka kordinater som du befinner dig på.
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body1" className={lowered}>
          Tips: Testkordinater är latitude=1 och longitude=1
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
            Är jag på en hållplats?
          </Typography>
        </CardContent>
      </CardActionArea>
    </React.Fragment>
  );
}
