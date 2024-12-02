import React, { FC } from "react";
import { View, Text } from "react-native";
import { sovietColours, sovietFragmentStyles, sovietTextStyles } from "../../assets/sovietStyles";
import { RocketData } from "../../interfaces/RocketDataInterface";

interface RocketDataReadoutProps {
  rocketData: RocketData;
}
/**
 * This is the readout in the stats screen that provides the most recent information in a readable format. 
 * Straightforward enough, it just takes the data and puts it into a nice container. 
 * @param param0 
 * @returns 
 */
const RocketDataReadout: FC<RocketDataReadoutProps> = ({ rocketData }) => {
  return (
    <View style={sovietFragmentStyles.FortyPercentHeightContainer}>
      <View style={sovietFragmentStyles.statsBottomPanel}>
        <View style={sovietFragmentStyles.blackMarginBottom}>
          <Text style={{
            fontFamily: 'kremlin',
            fontSize: 25,
            color: sovietColours.sovietBlack,
            textAlign: 'center' as 'center',
            marginVertical: 2,
          }}>
            ROCKET DATA:</Text>
        </View>

        <View style={sovietFragmentStyles.statsPanelRow}>
          <View style={sovietFragmentStyles.statsBottomPanelColumn}>
            <View style={sovietFragmentStyles.statsBottomPanelItem}>
              <Text style={sovietTextStyles.statsBottomPanelText}>
                Connected: {rocketData.isConnected ? 'Yes' : 'No'}</Text>
            </View>
            <View style={sovietFragmentStyles.statsBottomPanelItem}>
              <Text style={sovietTextStyles.statsBottomPanelText}>
                Lat: {(rocketData.latitude)?.toFixed(4)}</Text>
            </View>
            <View style={sovietFragmentStyles.statsBottomPanelItem}>
              <Text style={sovietTextStyles.statsBottomPanelText}>
                Long: {(rocketData.longitude)?.toFixed(4)}</Text>
            </View>
          </View>

          <View style={sovietFragmentStyles.statsBottomPanelColumn}>
            <View style={sovietFragmentStyles.statsBottomPanelItem}>
              <Text style={sovietTextStyles.statsBottomPanelText}>
                Alt: {(rocketData.altitude)?.toFixed(2)} </Text>
            </View>
            <View style={sovietFragmentStyles.statsBottomPanelItem}>
              <Text style={sovietTextStyles.statsBottomPanelText}>
                Speed: {(rocketData.velocityMS)?.toFixed(2)}m/s</Text>
            </View>
            <View style={sovietFragmentStyles.statsBottomPanelItem}>
              <Text style={sovietTextStyles.statsBottomPanelText}>
                Satellites: {rocketData.numberOfSatellitesBeingTracked}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RocketDataReadout;