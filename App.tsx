/**
 * App.tsx is the root of the project, and is registered via the entry point, index.js 
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './src/components/navigation/BottomTabNavigator';
import { BluetoothProvider } from './src/contexts/BluetoothContext';
import RocketProvider from './src/contexts/RocketContext'
import { AuthenticationProvider } from './src/contexts/AuthenticationContext';
import { FirebaseDataProvider } from './src/contexts/FirebaseDataContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthenticationProvider>
        <BluetoothProvider>
          <FirebaseDataProvider>
            <RocketProvider>
              <NavigationContainer>
                <BottomTabNavigator />
              </NavigationContainer>
            </RocketProvider>
          </FirebaseDataProvider>
        </BluetoothProvider>
      </AuthenticationProvider>
    </GestureHandlerRootView>
  );
}

