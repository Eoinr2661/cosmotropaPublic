import React, { createContext, FC, ReactNode, useContext } from 'react'
import useAuthenticationService, { AuthenticationServiceProps } from '../db/AuthenticationLogic';
import LoadingScreen from '../screens/LoadingScreen';

const AuthenticationContext = createContext<AuthenticationServiceProps | undefined>(undefined);
/**
 * I liked to split the custom hooks from the provider as it is neater, so here it calls the custom hook, wraps it up and provides the context to the rest of the app via the App.tsx
 * @returns 
 */
export const useAuthentication = (): AuthenticationServiceProps => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
  }
  return context;
}

export const AuthenticationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const authenticationService = useAuthenticationService();

  if (authenticationService.loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthenticationContext.Provider value={authenticationService}>
      {children}
    </AuthenticationContext.Provider>
  );
};