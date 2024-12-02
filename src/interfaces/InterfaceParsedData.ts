import {GPGSV} from '../interfaces/InterfaceGPGSV';
import {GPRMC} from '../interfaces/InterfaceGPRMC';
import {GPVTG} from '../interfaces/InterfaceGPVTG';
import {GPGGA} from '../interfaces/InterfaceGPGGA';
import {GPGLL} from '../interfaces/InterfaceGPGLL';
import {GPGSA} from '../interfaces/InterfaceGPGSA';

export interface ParsedData {
    GPRMC: GPRMC;
    GPVTG: GPVTG;
    GPGGA: GPGGA;
    GPGLL: GPGLL;
    GPGSA: GPGSA;
    GPGSV: GPGSV[];
  }