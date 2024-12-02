import { View, Text } from "react-native";
import React from "react";
import { sovietFragmentStyles, sovietTextStyles } from "../../assets/sovietStyles";

/**
 * This is the component used to represent a single item in the paired devices list on the bluetooth screen.
 * @param param0 
 * @returns 
 */
const DeviceItem = ({ pairName }) => {
    return (
      <View style={sovietFragmentStyles.deviceItem}>
        <Text style={sovietTextStyles.smallDeviceNameText}>{pairName.toUpperCase().slice(0, 12)}</Text>
      </View>
    );
  };

  export default DeviceItem;