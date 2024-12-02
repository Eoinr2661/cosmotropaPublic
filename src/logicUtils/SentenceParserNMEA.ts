import {GPGSV} from '../interfaces/InterfaceGPGSV';
import {GPRMC} from '../interfaces/InterfaceGPRMC';
import {GPVTG} from '../interfaces/InterfaceGPVTG';
import {GPGGA} from '../interfaces/InterfaceGPGGA';
import {GPGLL} from '../interfaces/InterfaceGPGLL';
import {GPGSA} from '../interfaces/InterfaceGPGSA';

type NMEASentence = GPRMC | GPVTG | GPGGA | GPGLL | GPGSA | GPGSV | undefined;

/**
 * This takes in an unparsed NMEA sentence, figures out what type of sentence it is and returns it as a parsed object
 * I have commented out the unused sentences for efficiency
 * @param data, unparsed NMEA sentence
 * @returns - NMESentence
 */
export const sentenceParserNMEA = (data: string): NMEASentence => {

    const fields = data.split(',');
    const sentenceType = fields[0];
    
    switch (sentenceType) {
      case '$GPRMC':
        return {
          type: 'GPRMC',
          time: fields[1],
          status: fields[2],
          latitude: fields[3] + ' ' + fields[4],
          longitude: fields[5] + ' ' + fields[6],
          speed: fields[7], //in knots
          date: fields[9],
        } as GPRMC;
      case '$GPVTG':
        return {
          type: 'GPVTG',
          course: fields[1],
          speed: fields[7] // probably in km/h
        } as GPVTG;
      case '$GPGGA':
        return {
          type: 'GPGGA',
          time: fields[1],
          latitude: fields[2] + ' ' + fields[3],
          longitude: fields[4] + ' ' + fields[5],
          fixQuality: fields[6],
          numberOfSatellitesBeingTracked: fields[7],
          altitude: fields[9]
        } as GPGGA;
      // case '$GPGLL':
      //   return {
      //     type: 'GPGLL',
      //     latitude: fields[1] + ' ' + fields[2],
      //     longitude: fields[3] + ' ' + fields[4],
      //     time: fields[5]
      //   } as GPGLL;
      // case '$GPGSA':
      //   return {
      //     type: 'GPGSA',
      //     mode: fields[1],
      //     fixType: fields[2],
      //     satellitesUsed: fields.slice(3, 15).filter(sat => sat !== '')
      //   } as GPGSA;
      // case '$GPGSV':
      //   return {
      //     type: 'GPGSV',
      //     numberOfMessages: fields[1],
      //     messageNumber: fields[2],
      //     satellitesInView: fields[3],
      //     satellitesInfo: fields.slice(4, fields.length - 1)
      //   } as GPGSV;
      default:
        // console.log("Unknown or excluded sentence type: ", sentenceType);
        return undefined;
    };
};
