export interface RocketData {
  altitude: number | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
  velocityMS: number | undefined;
  velocityKMH: number | undefined;
  timestamp: [date: string, time: string] ;
  isConnected: boolean; // this is a little bit of a misnomer, this isn't necessarily a connection to the rocket, rather the phone's connection to the groundstation
  numberOfSatellitesBeingTracked: number | undefined;
}