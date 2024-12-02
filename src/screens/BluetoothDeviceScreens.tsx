import { View, ScrollView, Text, ImageBackground, } from 'react-native';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import React, { useEffect } from 'react';
import { sovietButtonStyles, sovietColours, sovietFragmentStyles, sovietTextStyles } from '../assets/sovietStyles';
import { WideButton } from '../components/buttons/WideButton'
import ConnectDisconnectButton from '../components/buttons/ConnectDisconnectButton';
import ScreenHeader from '../components/fragments/ScreenHeader';
import { ImageSourcePropType } from 'react-native';
import { useBluetooth } from '../contexts/BluetoothContext';
import DeviceItem from '../components/fragments/BluetoothDeviceItem';

/**
 * This is the Bluetooth screen, I was originally planning on breaking this into two screens via stack, but going to keep like this now
 * This was to try and implmenent connecting to multiple devices, however its set up so that this could be easily implemented in a future update if that is indeed possible using Android,
 * As the Bluetooth stack is already there. 
 * @returns 
 */
const BluetoothDeviceScreens = () => {
  const {
    pairedDevices,
    selectedDevice,
    isConnected,
    rocketData,
    startDeviceDiscovery,
    connectToDevice,
    disconnect,
    setupBluetooth,
  } = useBluetooth();

  useEffect(() => {
    setupBluetooth();
  }, []);

  return (

    <ImageBackground
      source={require('../assets/images/InTheNameOfPeaceSmol.png') as ImageSourcePropType}
      style={sovietFragmentStyles.backgroundImage} >

      <View>
        {/* Start of First Screen */}
        <ScreenHeader title='DEVICES' />
        <ScrollView>
          {!isConnected && (
            <> 
            <View style={sovietFragmentStyles.PrimaryButtonContainer}>
              <WideButton onPress={startDeviceDiscovery} title='REFRESH' ></WideButton>
            </View>

              <Text style={sovietTextStyles.pairedDevicesText}>PAIRED DEVICES:</Text>
              {pairedDevices.map((pair: BluetoothDevice, i) => (
                <View key={i} style={sovietFragmentStyles.pairedDevicesRow}>
                  <DeviceItem pairName={pair.name} />
                  <ConnectDisconnectButton
                    isConnected={isConnected}
                    connectToDevice={() => connectToDevice(pair)}
                    disconnect={disconnect}
                  />
                </View>
              ))}
            </>
          )}
          {/* Second screen part here, connected and device is selected */}
          {isConnected && selectedDevice && (
            <>
              <View
                style={sovietButtonStyles.BluetoothContainerStyle}>
                <View style={sovietFragmentStyles.deviceItem}>
                  <Text style={sovietTextStyles.smallDeviceNameText}>{selectedDevice.name}</Text>
                </View>
                <ConnectDisconnectButton
                  isConnected={isConnected}
                  connectToDevice={() => connectToDevice(selectedDevice)}
                  disconnect={disconnect}
                />
              </View>

              <View style={{
                backgroundColor: sovietColours.sovietLightGreyTranslucent,
                borderRadius: 10,
                margin: 5,
              }}>
                <View style={{
                  marginHorizontal: 5,
                  borderBottomColor: sovietColours.sovietBlack,
                  borderBottomWidth: 2
                }}>
                  <Text style={{
                    fontFamily: 'kremlin',
                    fontSize: 25,
                    color: sovietColours.sovietBlack,
                    textAlign: 'center' as 'center',
                    marginVertical: 2,
                  }}>DATA STREAM:</Text>
                </View>

                <View style={{ margin: 5 }}>
                  <Text style={sovietTextStyles.statsBottomPanelText}>Tracked Satellites: {rocketData.numberOfSatellitesBeingTracked}</Text>
                  <Text style={sovietTextStyles.statsBottomPanelText}>Alt: {rocketData.altitude}</Text>
                  <Text style={sovietTextStyles.statsBottomPanelText}>Lat: {rocketData.latitude}</Text>
                  <Text style={sovietTextStyles.statsBottomPanelText}>Lon: {rocketData.longitude}</Text>
                  <Text style={sovietTextStyles.statsBottomPanelText}>Speed: {rocketData.velocityKMH}</Text>
                  <Text style={sovietTextStyles.statsBottomPanelText}>Time: {rocketData.timestamp[1]}</Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};
export default BluetoothDeviceScreens;
