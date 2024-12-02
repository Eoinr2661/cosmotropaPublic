import React, { FC } from "react";
import { View, Text } from "react-native";
import { sovietFragmentStyles, sovietTextStyles } from "../../assets/sovietStyles";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface FlightInformationPanelProps {
  isConnected: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  isRecording: boolean;
  flightName: string;
  numberOfSatellitesBeingTracked: number | undefined;
}
/**
 * This is on the home page, it provides feedback to the user as to the current status of the connection and recording status. 
 * @param param0 
 * @returns 
 */
const FlightInformationPanel: FC<FlightInformationPanelProps> = ({ isConnected, currentUser, isRecording, flightName, numberOfSatellitesBeingTracked }) => {
  return (
    <View style={ sovietFragmentStyles.flightInfoPanel }>
      <View style={{ flex: 1 }}>
        <View style={sovietFragmentStyles.blackMarginBottom}>
          <Text style={sovietTextStyles.flightInfoPanelTextKremlin}>
            CONNECTION DATA:</Text>
        </View>
        <View style={{ alignItems: 'flex-start', gap: 2, marginLeft: 5 }}>
          <Text style={sovietTextStyles.flightInfoPanelTextSmall}>
            Flight: {flightName ? `${flightName}` : 'Please Configure'}</Text>
          <Text style={sovietTextStyles.flightInfoPanelTextSmall}>
            Groundstation: {isConnected ? 'Connected' : 'Disconnected'}</Text>
          <Text style={sovietTextStyles.flightInfoPanelTextSmall}>
            Recording Status: {isRecording ? 'Recording' : 'Stopped'}</Text>
        </View>
      </View>
    </View>
  );
};

export default FlightInformationPanel;