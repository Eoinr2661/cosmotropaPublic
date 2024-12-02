import React, { createContext, FC, ReactNode, useContext } from 'react'
import useFirebaseDataService, { FirebaseDataServiceProps } from '../db/FirebaseDataLogic';

const FirebaseDataContext = createContext<FirebaseDataServiceProps | undefined>(undefined);
/**
 * I liked to split the custom hooks from the provider as it is neater, so here it calls the custom hook, wraps it up and provides the context to the rest of the app via the App.tsx
 * @returns 
 */
export const useFirebaseData = (): FirebaseDataServiceProps => {
  const context = useContext(FirebaseDataContext);
  if (context === undefined) {
    throw new Error('useFirebaseData must be used within an FirebaseDataProvider');
  }
  return context;
}

export const FirebaseDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const firebaseDataService = useFirebaseDataService();

  return (
    <FirebaseDataContext.Provider value= { firebaseDataService } >
    {children}
    </FirebaseDataContext.Provider>
  );
};