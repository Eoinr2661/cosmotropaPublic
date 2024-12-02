import React, { useState } from 'react';
import { View, ImageBackground, ImageSourcePropType, Alert, Modal, TextInput } from 'react-native';
import { sovietColours, sovietFragmentStyles } from '../assets/sovietStyles';
import ScreenHeader from "../components/fragments/ScreenHeader";
import { useBluetooth } from '../contexts/BluetoothContext'
import { useAuthentication } from '../contexts/AuthenticationContext';
import { useFirebaseData } from '../contexts/FirebaseDataContext';
import { SecondaryMenuButton } from '../components/buttons/SecondaryMenuButton';
import ConnectionGraphic from '../components/fragments/ConnectionGraphic';
import PauseRecordStopFrag from '../components/fragments/PauseRecordStopFrag';
import FlightInformationPanel from '../components/fragments/FlightInformationPanel';

/**
 * This screen is doing a lot of heavy lifting, it pulls in all of the various components required for full flight management
 * A lot of UI components were needed to make this a straightforward UX for users. 
 * @returns 
 */
const HomeScreen = () => {

  const [flightNameModalVisibility, setFlightNameModalVisibility] = useState(false); // this controls the appearance of the naming modal 
  const { rocketData } = useBluetooth(); // destructuring rocketData from the context
  const { flightName, setFlightName, isRecording, setIsRecording } = useFirebaseData(); // destructring from the firestore context
  const { currentUser } = useAuthentication(); // destructuring from the Firebase authentication

  const setFlightNameInputBoxVisible = () => {
    // Can't record a flight if not connected to Bluetooth
    if (!rocketData.isConnected) {
      Alert.alert('Connect to rocket',
        "Please connect to your rocket before recording a flight, via the bluetooth screen");
      return;
    }
    setFlightNameModalVisibility(true);
  };

  const handleFlightNameInputSubmit = () => {
    setFlightNameModalVisibility(false);
  };

  // Various UI components pulled together on the HomeScreen here, the main pieces are the 
  // Connection grpahic, flight info panel, and the flight configuration piece, then at the bottom is 
  // A modal, and then what used to be a modal but was re-factored into just a regular bit of tsx, for simplicity
  return (
    <ImageBackground
      source={require('../assets/images/SolarSystemSat.png') as ImageSourcePropType}
      style={sovietFragmentStyles.backgroundImage}
    >
      <View>
        <ScreenHeader title='HOME' />
        <View style={{ height: '100%' }}>
          
          <ConnectionGraphic
            isConnected={rocketData.isConnected}
            currentUser={currentUser}
            isRecording={isRecording}
            flightName={flightName}
            numberOfSatellitesBeingTracked={rocketData.numberOfSatellitesBeingTracked} />

          <FlightInformationPanel
            isConnected={rocketData.isConnected}
            currentUser={currentUser}
            isRecording={isRecording}
            flightName={flightName}
            numberOfSatellitesBeingTracked={rocketData.numberOfSatellitesBeingTracked} />

          <PauseRecordStopFrag
            isConnected={rocketData.isConnected}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            flightName={flightName} setFlightName={setFlightName}
            setFlightNameInputBoxVisible={setFlightNameInputBoxVisible} />

        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={flightNameModalVisibility}
        onRequestClose={() => {
          setFlightNameModalVisibility(!flightNameModalVisibility);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={sovietFragmentStyles.SovietModalStyle}>
            <View style={{ width: '100%', gap: 20 }}>
              <TextInput placeholder='Flight Name' value={flightName} placeholderTextColor={sovietColours.sovietLightGreyTranslucent} onChangeText={setFlightName}
                style={sovietFragmentStyles.SovietModalTextInputStyle} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>

                <SecondaryMenuButton onPress={handleFlightNameInputSubmit} title='SUBMIT' />
                <SecondaryMenuButton onPress={() => setFlightNameModalVisibility(false)} title='CANCEL' />

              </View>
            </View>
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
};

export default HomeScreen;