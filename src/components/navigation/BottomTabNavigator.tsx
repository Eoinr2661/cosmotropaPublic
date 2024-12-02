import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import BluetoothStack from './BluetoothStack';
import Icon from 'react-native-ionicons';
import { sovietColours } from '../../assets/sovietStyles';
import MapScreen from '../../screens/MapScreen';
import StatsScreen from '../../screens/StatsScreen';
import AccountManagementStack from './AccountManagementStack';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import AccountScreen from '../../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const iconColourActive = sovietColours.sovietMustard;
const iconColourInactive = sovietColours.sovietWhite;

/**
 * So this is the root of the root, the index is the entry point, the app is the root, and this is the central component of the root, through which everything is rendered
 * Its the route root. 
 * There are some options to hide the header, as I have a custom one, additionally there are icons that go with the bottom tabs, and the relevant components
 * The inactive and active colours are set to suit the theme of the application. 
 * @returns 
 */
const BottomTabNavigator = () => {
  const { currentUser } = useAuthentication();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: iconColourActive,
        tabBarInactiveTintColor: iconColourInactive,
        tabBarStyle: {
          backgroundColor: sovietColours.sovietRed,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name='rocket' size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Bluetooth"
        component={BluetoothStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="bluetooth" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="navigate" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="podium" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={currentUser ? AccountScreen : AccountManagementStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;