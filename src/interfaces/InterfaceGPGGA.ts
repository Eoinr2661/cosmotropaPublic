export interface GPGGA {
  type: 'GPGGA';

  time: string;
  latitude: string;
  longitude: string;
  fixQuality: string;
  numberOfSatellitesBeingTracked: string;
  altitude: string;
}

//GPGSV
//GPRMC
//GPVTG
//GPGGA
//GPGLL
//GPGSA