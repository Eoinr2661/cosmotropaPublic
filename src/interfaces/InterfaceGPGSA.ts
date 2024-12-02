export interface GPGSA {
  type: 'GPGSA';
  mode: string;
  fixType: string;
  satellitesUsed: string[];
}

//GPGSV
//GPRMC
//GPVTG
//GPGGA
//GPGLL
//GPGSA