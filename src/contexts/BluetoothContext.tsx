import React, { createContext, FC, ReactNode, useContext } from 'react';
import useBluetoothService, { BluetoothServiceProps } from '../logicUtils/BluetoothLogic';

const BluetoothContext = createContext<BluetoothServiceProps | undefined>(undefined);

/**
 * I liked to split the custom hooks from the provider as it is neater, so here it calls the custom hook, wraps it up and provides the context to the rest of the app via the App.tsx
 * @returns 
 */
export const useBluetooth = (): BluetoothServiceProps => {
  const context = useContext(BluetoothContext);
  if (context === undefined) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  return context;
};

export const BluetoothProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const bluetoothService = useBluetoothService();

  return (
    <BluetoothContext.Provider value={bluetoothService}>
      {children}
    </BluetoothContext.Provider>
  );
};


