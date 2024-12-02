import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { RocketData } from '../interfaces/RocketDataInterface';
import { useEffect, useState } from 'react';
import { useBluetooth } from '../contexts/BluetoothContext';

export interface FirebaseDataServiceProps {
  isRecording: boolean;
  flightName: string;
  setFlightName: (flightName: string) => void;
  setIsRecording: (isRecording: boolean) => void;
}

/**
 * This code makes use of the Firebase Firestore docs https://firebase.google.com/docs/firestore/
 * The functions from Firebase are derived directly from the docs of course, 
 * However the specific configurations, and figuring out the minutae of how Firebase works, 
 * For example, the UID must be set to something as the files can't be read unless the first layer has a value, which I thought was a strange feature, hence the UID is set to 0 if nobody is logged in, rather than leaving it as undefined or empty. 
 * 
 * Additionally, organising the database structure was an interesting endeavour, because Firebase doesn't require strict schema, and can even store completely unstructured data, which was a big bit of learning
 * Ultimately, due to my familiarity with mySQL i still wanted to store the data in a structured way, to just make it understandable, so that is why the addFlightEntry function is so long compared to the docs, where it is just a few short lines
 * 
 * @returns 
 */
const useFirebaseDataService = (): FirebaseDataServiceProps => {
  const [flightName, setFlightName] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [accountID, setAccountID] = useState<number | string>(0);

  const { rocketData } = useBluetooth();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // User signed in, set UID
        setAccountID(user.uid);
      } else {
        // Not signed in, UID = 0
        setAccountID(0);
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * Adds datapoint to flight, creates new flight if it doesn't exist
   * Creates custom document ID, and sanitises data to avoid undefined entries
   * @param flightName - name of the flight to be added to
   * @param rocketData - data to be added to the flight
   */
  const addFlightEntry = async (flightName: string, rocketData: RocketData) => {
    try {
      const flight = firestore().collection('rocketFlight').doc(flightName);
      await flight.set({ account: accountID }, { merge: true });
      const customDocumentID = `Date_${rocketData.timestamp[0]}_Time_${rocketData.timestamp[1]}_${Math.random().toString(36).substring(2, 15)}`;
      const sanitisedRocketData = Object.fromEntries(
        Object.entries(rocketData).map(([key, value]) => [key, value === undefined ? null : value])
      );
      await flight.collection('flight_entries').doc(customDocumentID).set(sanitisedRocketData);
    } catch (error) {
      console.error("Error adding flight data: ", error);
    }
  }

  useEffect(() => {
    if (isRecording) {
      addFlightEntry(flightName, rocketData);
    }
  }, [rocketData, isRecording])

  return {
    isRecording,
    flightName,
    setFlightName,
    setIsRecording,
  }
}

export default useFirebaseDataService;