import * as LocationStatus from 'GPSCheck';

export const stations = [
  {
    station: 'Chalmers Tvärgata',
    latitude: 57.6898,
    longitude: 11.9781,
  },
  {
    station: 'Ålandsgatan',
    latitude: 57.6927,
    longitude: 11.9773,
  },
  {
    station: 'DeveloperMode',
    latitude: 1,
    longitude: 1,
  },
  {
    station: 'Multisalen',
    latitude: 57.6861,
    longitude: 11.9778,
  },
  {
    station: 'HH&P',
    latitude: 157.7041,
    longitude: 111.9649,
  },
  {
    station: 'Martins Crib',
    latitude: 52.689159200000006,
    longitude: 12.974281699999999,
  },
];

export const checkStations = (enteredLatitude, enteredLongitude) => {
  for (let i = 0; i < stations.length; i += 1) {
    if (
      ((enteredLatitude > stations[i].latitude - 0.0006)
      && (enteredLatitude < stations[i].latitude + 0.0006))
      && ((enteredLongitude > stations[i].longitude - 0.0006)
      && (enteredLongitude < stations[i].longitude + 0.0006))
    ) {
      return LocationStatus.validLocation;
    }
  } return LocationStatus.invalidLocation;
};
