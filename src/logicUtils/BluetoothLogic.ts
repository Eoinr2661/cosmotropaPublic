import { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { sentenceParserNMEA } from './SentenceParserNMEA';
import Geolocation from '@react-native-community/geolocation';
import { RocketData } from '../interfaces/RocketDataInterface';
import { Coordinates } from '../interfaces/CoordinatesInterface';
import { convertToDecimalCoordinate } from './CoordinateConverter';

export interface BluetoothServiceProps {
  pairedDevices: BluetoothDevice[];
  selectedDevice?: BluetoothDevice;
  isConnected: boolean;
  rocketData: RocketData;
  currentLocation: Coordinates;
  setSelectedDevice: (device: BluetoothDevice) => void;
  setIsConnected: (connected: boolean) => void;
  startDeviceDiscovery: () => void;
  connectToDevice: (device: BluetoothDevice) => void;
  readData: () => void;
  disconnect: () => void;
  setupBluetooth: () => void;
}

const useBluetoothService = (): BluetoothServiceProps => {
  const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<BluetoothDevice>();
  const [isConnected, setIsConnected] = useState(false);
  const [rocketData, setRocketData] = useState<RocketData>({
    altitude: undefined,
    longitude: undefined,
    latitude: undefined,
    velocityMS: undefined,
    velocityKMH: undefined,
    timestamp: ['', ''],
    isConnected: false,
    numberOfSatellitesBeingTracked: undefined,
  });
  // this is the device position i.e. the phone, or laptop, or whatever is connected to the groundstation
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, distanceFilter: 5 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  /**
   * https://www.aranacorp.com/en/creating-a-bluetooth-application-for-esp32-with-react-native/amp/
   * I have implemented the Bluetooth checking function here.
   * The code follows standard practices as outlined by both the React Native documentation and general Android development guidelines.
   * Since this function involves a specific, standardised procedure, there is essentially only one correct way to implement it, resulting in similar code regardless of the source. 
   * However, I have referenced the document that I primarily used to guide the implementation of this function.
   */
  const checkBluetoothEnabled = async () => {
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        await RNBluetoothClassic.requestBluetoothEnabled();
      }
    } catch (error) {
      console.error('Bluetooth Classic not available on this device.');
    }
  };

  /**
   * https://www.aranacorp.com/en/creating-a-bluetooth-application-for-esp32-with-react-native/amp/
   * I have implemented the Bluetooth discovery function here.
   * The code follows standard practices as outlined by both the React Native documentation and general Android development guidelines.
   * Since this function involves a specific, standardised procedure, there is essentially only one correct way to implement it, resulting in similar code regardless of the source. 
   * However, I have referenced the document that I primarily used to guide the implementation of this function.
   */
  const startDeviceDiscovery = async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices();
      setPairedDevices(paired);
    } catch (error) {
      console.error('Error bonded devices:', error);
    }
  };

  /**
   * This function is based on the code found at https://www.aranacorp.com/en/creating-a-bluetooth-application-for-esp32-with-react-native/amp/
   * I have refined and adapted it to better fit the needs of this application. However, there is essentially only one correct way to implement
   * so it remains quite similar to the referenced document, with small changes to suit this particular programme
   * @param device 
   */
  const connectToDevice = async (device: BluetoothDevice) => {
    try {
      let connection = await device.isConnected();
      if (!connection) {
        await device.connect({
          connectorType: "rfcomm",
          DELIMITER: "\n",
          DEVICE_CHARSET: Platform.OS === "ios" ? 1536 : "utf-8",
        });
      }
      setSelectedDevice(device);
      setIsConnected(true);
      setRocketData(prevData => ({
        ...prevData,
        isConnected: true,
      }));

    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  /**
   * This function is similar to the code found at https://www.aranacorp.com/en/creating-a-bluetooth-application-for-esp32-with-react-native/amp/
   * I have changed it to update relevant state variables and otherwise suit the programme, 
   * however it is still going to remain similar regardless, as there is only one correct way 
   * to implement this. 
   * 
   */
  const disconnect = async () => {
    if (selectedDevice) {
      try {
        await selectedDevice.clear();
        await selectedDevice.disconnect();

        setSelectedDevice(undefined);
        setIsConnected(false);
        setRocketData(prevData => ({
          ...prevData,
          isConnected: false,
        }));

      } catch (error) {
        console.error("Disconnection error", error);
      }
    }
  };

  /** 
   * This prevents the readData function from being triggered multiple times when the app is under heavy load.
   * I have adjusted the readData function's execution speed to avoid overlapping calls in typical usage scenarios.
   * This serves as a precautionary measure, primarily for devices with lower performance, or on occassion where the app slows down. 
   * Declared here to be correctly scoped
   */
  let isReadingData = false;

  /**
   * This version of readData function is my own work. 
   * Originally based on the `readData` function found at https://www.aranacorp.com/en/creating-a-bluetooth-application-for-esp32-with-react-native/amp/
   * This function serves as the backbone of the bluetooth module. While it started out closely resembling the referenced code,
   * it has undergone extensive development, optimisation, and experimentation. 
   * Over time, it has been refined to meet the specific needs of this application. As a result, I now consider this code to be my own work.
   * The original source was instrumental in helping me grasp the implementation of the Bluetooth library.
   *
   * @returns 
   */
  const readData = async () => {

    if (isReadingData) {
      console.log("Already reading data", isReadingData);
      return;
    }
    if (!selectedDevice) {
      console.log("No selected device", selectedDevice);
      return;
    }
    if (!isConnected) {
      console.log("Device is not connected", isConnected);
      return;
    }
    isReadingData = true;
    try {
      let sentence = await selectedDevice.read();
      if (sentence) {
        sentence = sentence.trim();
        const parsedSentence = sentenceParserNMEA(sentence.toString());
        if (!parsedSentence) {
          return;
        }
        switch (parsedSentence.type) {
          case 'GPGSV': // no info required from this sentence
            break;
          case 'GPRMC':
            setRocketData(prevData => ({
              ...prevData,
              timestamp: [parsedSentence.date, parsedSentence.time],
            }));
            break;
          case 'GPVTG':
            let speedFloatKMH = parseFloat(parsedSentence.speed);
            setRocketData(prevData => ({
              ...prevData,
              velocityKMH: speedFloatKMH,
              velocityMS: (speedFloatKMH * 1000) / 3600,
            }));
            break;
          case 'GPGGA':
            let altitudeFloat = parseFloat(parsedSentence.altitude);
            let convertedLatitude = convertToDecimalCoordinate(parsedSentence.latitude);
            let convertedLongitude = convertToDecimalCoordinate(parsedSentence.longitude);
            if (convertedLatitude === 0 || convertedLatitude === undefined || convertedLatitude === null ||
              convertedLongitude === 0 || convertedLongitude === undefined || convertedLongitude === null ||
              isNaN(altitudeFloat)) {
              break;
            }
            setRocketData(prevData => ({
              ...prevData,
              latitude: convertedLatitude,
              longitude: convertedLongitude,
              altitude: altitudeFloat,
              numberOfSatellitesBeingTracked: parseInt(parsedSentence.numberOfSatellitesBeingTracked),
            }));
            break;
          case 'GPGLL': // no info required from this sentence
            break;
          case 'GPGSA': // no info required from this sentence
            break;
        };
      }
    } catch (error) {
      Alert.alert(
        'Connection Disruption',
        `Bluetooth Connection disrupted, please re-connect\n\nError Details: ${error.toString()}`
      );
      setIsConnected(false)
      disconnect();
    }
    finally {
      isReadingData = false;
    }
  };

  /**
   * This is what calls the readData function, the interval currently 200ms, but this has been lowered multiple times as I have optimised the application. 
   */
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (selectedDevice && isConnected) {
      intervalId = setInterval(() => readData(), 200);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isConnected, selectedDevice]);

  /**
   * https://www.aranacorp.com/en/creating-a-bluetooth-application-for-esp32-with-react-native/amp/
   * I have implemented Android permissions function here...
   * The code used for requesting permissions follows standard practices detailed by both the React Native documentation and general Android development guidelines. 
   * Given that requesting permissions involves a specific, standardised procedure, the code would be similar regardless of the source, but I have referenced the 
   * document I primarily used to help implement this code. 
   * 
   */
  async function requestBluetoothPermission() {
    try {
      const grantedLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Fine Location Permission',
          message: 'This app needs device location for mapping and bluetooth services.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );

      const grantedScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: 'Bluetooth Scan Permission',
          message: 'This app needs Bluetooth Scan permission to see paired devices.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );

      const grantedConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Bluetooth Connect Permission',
          message: 'This app needs Bluetooth Connect permission to connect to devices.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );

      if (
        grantedLocation === PermissionsAndroid.RESULTS.GRANTED &&
        grantedScan === PermissionsAndroid.RESULTS.GRANTED &&
        grantedConnect === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Bluetooth permissions granted');
      } else {
        console.log('Bluetooth permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  /**
   * This function is used to check for bluetooth setup, it calls the other functions defined in this file
   */
  async function setupBluetooth() {
    checkBluetoothEnabled();
    requestBluetoothPermission().then(() => {
      startDeviceDiscovery();
    });
  }

  useEffect(() => {
    setupBluetooth();
  }, []);

  return {
    pairedDevices,
    selectedDevice,
    isConnected,
    rocketData,
    currentLocation,
    setSelectedDevice,
    setIsConnected,
    startDeviceDiscovery,
    connectToDevice,
    readData,
    disconnect,
    setupBluetooth
  };
};

export default useBluetoothService;
