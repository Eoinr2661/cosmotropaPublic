import React from 'react';
import { View, ImageBackground, ImageSourcePropType, Text } from 'react-native';
import { dynamicConnectionText, sovietColours, sovietFragmentStyles, sovietTextStyles } from '../assets/sovietStyles';
import { useBluetooth } from '../contexts/BluetoothContext';
import ScreenHeader from '../components/fragments/ScreenHeader';
import AltitudeGraph from '../components/graphs/AltitudeGraph';
import RocketDataReadout from '../components/fragments/RocketDataReadout';


/**
 * This is the statsScreen it displays various data readouts in user-friendly format, including the altitude graph. 
 * 
 * The getConnectionStrengthDescription was a fun bit of code, that changes colours and text for the connection readout depending on connection strength
 * I have it so that it says 4 satellites is a supreme connection, but this number should really be a good bit higher, possibly 8 or 9, as 4 satellites should theoretically provide enough accuracy, 
 * However it doesn't seem to from testing. 
 * @returns 
 */
const StatsScreen = () => {
  const { rocketData } = useBluetooth();

  const getConnectionStrengthDescription = (numberOfSatellitesBeingTracked: number | undefined) => {
    switch (numberOfSatellitesBeingTracked) {
      case undefined:
        return { connectionDescription: 'NULL', connectionColor: sovietColours.sovietLightGrey };
      case 0:
        return { connectionDescription: 'NONE', connectionColor: sovietColours.sovietBlack };
      case 1:
      case 2:
        return { connectionDescription: 'DEFICIENT', connectionColor: sovietColours.sovietRed };
      case 3:
        return { connectionDescription: 'SUFFICIENT', connectionColor: sovietColours.sovietMustard };
      case 4:
        return { connectionDescription: 'GOOD', connectionColor: '#00FF00' };
      default:
        if (numberOfSatellitesBeingTracked > 4) {
          return { connectionDescription: 'SUPREME', connectionColor: sovietColours.sovietBlue };
        } else {
          return { connectionDescription: 'NULL', connectionColor: sovietColours.sovietLightGrey };
        }
    }
  };


  const { connectionDescription, connectionColor } = getConnectionStrengthDescription(rocketData.numberOfSatellitesBeingTracked);

  return (
    <ImageBackground
      source={require('../assets/images/ProjectSputnik.png') as ImageSourcePropType}
      style={sovietFragmentStyles.backgroundImage}
    >
      <View style={{ flex: 1 }}>
        <ScreenHeader title='STATS' />

        <View style={sovietFragmentStyles.simpleFlex}>

          <View style={sovietFragmentStyles.SixtyPercentHeightContainer}>

            <View style={sovietFragmentStyles.statsWideBoxNoBorder}>
              <View style={sovietFragmentStyles.simpleFlex}>
                <AltitudeGraph rocketData={rocketData} />
              </View>
            </View>

            <View style={sovietFragmentStyles.statsBoxRow}>

              <View style={sovietFragmentStyles.statsNarrowBox}>
                <View style={{ justifyContent: 'center', flex: 1, marginTop: 15 }}>
                  <Text style={dynamicConnectionText(connectionColor)}>
                    {connectionDescription}
                  </Text>
                </View>
                <View style={sovietFragmentStyles.statsTopBoxLowerHalf}>
                  <Text style={sovietTextStyles.statsTopPanelText}>
                    CONNECTION STRENGTH
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <RocketDataReadout rocketData={rocketData} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default StatsScreen;