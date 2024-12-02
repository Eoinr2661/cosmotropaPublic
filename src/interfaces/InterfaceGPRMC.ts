export interface GPRMC {
  type: 'GPRMC';
  time: string;
  status: string;
  latitude: string;
  longitude: string;
  speed: string;
  date: string;
}

//GPGSV
//GPRMC
//GPVTG
//GPGGA
//GPGLL
//GPGSA