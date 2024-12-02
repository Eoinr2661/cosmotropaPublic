import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BluetoothClassicTerminal from "../../screens/BluetoothDeviceScreens";

const Stack = createStackNavigator();

/**
 * I had this Bluetooth Stack because I was thinking about implementing the possibility of connecting to multiple devices in a future update, 
 * However for the current plans, this stack could be simplified into a single screen. 
 * @returns 
 */
const BluetoothStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BluetoothTerminal"
      component={BluetoothClassicTerminal}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default BluetoothStack;