import React, { FC, useEffect, useState } from "react";
import { View, Image } from "react-native";
import { sovietFragmentStyles } from "../../assets/sovietStyles";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

// connection images
// @ts-ignore
import noConnectionImage0 from '../../assets/images/ConnectionGraphic0of3.png';
// @ts-ignore
import noConnectionImage1 from '../../assets/images/ConnectionGraphic1of3.png';
// @ts-ignore
import connectedImage from '../../assets/images/ConnectionGraphicFullConnection.png';


interface DatabaseDashboardProps {
  isConnected: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  isRecording: boolean;
  flightName: string;
  numberOfSatellitesBeingTracked: number | undefined;

}

/**
 * This component is what swaps in the correct image depending on the stage/type of connection, the image can be viewed on the home page. 
 * @param param0 
 * @returns 
 */
const ConnectionGraphic: FC<DatabaseDashboardProps> = ({ isConnected, currentUser, isRecording, flightName, numberOfSatellitesBeingTracked }) => {

  const [connectionImage, setConnectionImage] = useState(noConnectionImage0);
  useEffect(() => {
    if (!isConnected) {
      setConnectionImage(noConnectionImage0);
    } else if (isConnected && !numberOfSatellitesBeingTracked) {
      setConnectionImage(noConnectionImage1);
    } else if (isConnected && numberOfSatellitesBeingTracked) {
      setConnectionImage(connectedImage);
    }
  }, [isConnected, numberOfSatellitesBeingTracked]);

  return (
    <View style={sovietFragmentStyles.connectionGraphic}>
      <Image
        source={connectionImage}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </View>
  );
};

export default ConnectionGraphic;