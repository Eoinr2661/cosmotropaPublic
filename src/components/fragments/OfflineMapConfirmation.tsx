import { View } from "react-native";
import React, { FC } from 'react';
import { SecondaryMenuButton } from "../buttons/SecondaryMenuButton";
import { StyleURL } from "@rnmapbox/maps";

export interface OfflineMapConfirmationProps {
  mapStyle: StyleURL;
  handleOfflinePackCancellation: () => void;
  handleOfflinePackCreation: (mapStyle: StyleURL) => void;
}

/**
 * This is the confirmation for the offline maps
 * @param param0 
 * @returns 
 */
export const OfflineMapConfirmation: FC<OfflineMapConfirmationProps> = ({
  mapStyle,
  handleOfflinePackCancellation,
  handleOfflinePackCreation,
}) => {
  return (
    <View style={{ flex: 1, bottom: 25, width: '100%', alignItems: 'center', position: 'absolute' }}>
      <View style={{
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: '75%',
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
          <SecondaryMenuButton onPress={() => handleOfflinePackCreation(mapStyle)} title="CONFIRM" />
          <SecondaryMenuButton onPress={() => handleOfflinePackCancellation()} title="CANCEL" />
        </View>
      </View>
    </View>
  )
}

