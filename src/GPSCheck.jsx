import React, { Component } from 'react';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


import { checkStations } from 'stations';

export const noLocation = 'noLocation';
export const invalidLocation = 'invalidLocation';
export const validLocation = 'validLocation';
export const locationNotAvailable = 'locationNotAvailable';
export const locationTimerOut = 'locationTimerOut';

function getCorrectLocationQuestion(whichQuestion) {
  if (whichQuestion === noLocation) {
    return 'Välkommen till världens bästa spel!';
  }
  if (whichQuestion === locationNotAvailable) {
    return 'Vi kunde inte hämta din plats';
  }
  if (whichQuestion === locationTimerOut) {
    return 'Du har varit bort från en hållplats förlänge! Gå till en för att forstätta spela!';
  }
  return 'Du kan tyvärr inte spela världens bästa spel när du inte är på en hållplats. Gå till en hållplats och försök igen!';
}

export default class GPSCheck extends Component {
  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    const { locationCheck } = this.props;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => locationCheck(
          checkStations(
            parseFloat(position.coords.latitude),
            parseFloat(position.coords.longitude),
          ),
        ),
        () => locationCheck(locationNotAvailable),
      );
    } else {
      locationCheck(locationNotAvailable);
    }
  }

  render() {
    const {
      classes: { lowered },
      developerModeGPSCheck,
      locationCheck,
      locationOk,
    } = this.props;
    return (
      <React.Fragment>
        <CardContent>
          <Typography variant="h6" className={lowered}>
            {getCorrectLocationQuestion(locationOk)}
          </Typography>
          <Typography variant="body1" className={lowered}>
            Genom att starta spelet ger du tillåtesle
            till att vi kontrollerar vart du befinner dig.
          </Typography>
        </CardContent>
        <Divider />
        <CardActionArea onClick={this.getLocation}>
          <CardContent>
            <Typography variant="body1">
              Starta spelet
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
              Activate DeveloperMode
            </Typography>
          </CardContent>
        </CardActionArea>
      </React.Fragment>
    );
  }
}
