import React, { PropsWithChildren, createContext, useContext } from "react";
import useRocketService, { RocketMapLogicProps } from "../logicUtils/RocketMapLogic";

const RocketContext = createContext<RocketMapLogicProps | undefined>(undefined);

/**
 * I liked to split the custom hooks from the provider as it is neater, so here it calls the custom hook, wraps it up and provides the context to the rest of the app via the App.tsx
 * @returns 
 */
export const useRocket = () => {
  const context = useContext(RocketContext);
  if (context === undefined) {
    throw new Error("useRocket must be used within a RocketProvider");
  }
  return context;
};

export default function RocketProvider({ children }: PropsWithChildren) {
  const rocketLogic = useRocketService();

  return (
    <RocketContext.Provider value={rocketLogic}>
      {children}
    </RocketContext.Provider>
  );
}