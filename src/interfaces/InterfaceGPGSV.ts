export interface GPGSV {
  type: 'GPGSV';
  numberOfMessages: string;
  messageNumber: string;
  satellitesInView: string;
  satellitesInfo: string[];
}

//GPGSV
//GPRMC
//GPVTG
//GPGGA
//GPGLL
//GPGSA