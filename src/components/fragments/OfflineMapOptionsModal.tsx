import { Modal, View, Text, TextInput } from "react-native";
import React, { FC } from 'react';
import { sovietColours } from "../../assets/sovietStyles";
import { TertiaryMenuButton } from "../buttons/TertiaryMenuButton";
import { SecondaryMenuButton } from "../buttons/SecondaryMenuButton";

export interface OfflineMapOptionsModalProps {
  SMALL_SIZE: number;
  MEDIUM_SIZE: number;
  LARGE_SIZE: number;
  size: number;
  packName: string;
  isPackOptionsModalVisible: boolean;
  setSize: (size: number) => void;
  setPackName: (name: string) => void;
  handlePackOptionsSubmit: () => void;
  handleOfflinePackCancellation: () => void;
}
/**
 * This is the modal that pops up to take the user's options for name and size of the map to be created. 
 * @param param0 
 * @returns 
 */
export const OfflineMapOptionsModal: FC<OfflineMapOptionsModalProps> = ({
  SMALL_SIZE,
  MEDIUM_SIZE,
  LARGE_SIZE,
  size,
  packName,
  isPackOptionsModalVisible,
  setSize,
  setPackName,
  handlePackOptionsSubmit,
  handleOfflinePackCancellation,
}) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isPackOptionsModalVisible}
      onRequestClose={() => {
        handleOfflinePackCancellation();
      }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          backgroundColor: sovietColours.sovietRed,
          margin: 10,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: sovietColours.sovietMustard,
          width: '75%',
          justifyContent: 'center' as 'center',
          alignItems: 'center' as 'center',
          shadowColor: sovietColours.sovietBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.,
          shadowRadius: 4,
          elevation: 5,
        }}>
          <View style={{ width: '100%', marginBottom: 5, paddingHorizontal: 20, padding: 5 }}>
            <Text style={{ color: 'black', marginBottom: 5, fontSize: 20, textAlign: "left", width: '100%', fontWeight: "700", marginLeft: 5 }}>Map Name:</Text>
            <TextInput placeholder="Enter pack name" value={packName} placeholderTextColor={sovietColours.sovietLightGreyTranslucent} onChangeText={text => setPackName(text)}
              style={{
                backgroundColor: sovietColours.sovietLightGreyTranslucent,
                width: '100%' as '100%',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: sovietColours.sovietMustard,
              }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
            </View>
          </View>
          <View style={{ marginVertical: 5, width: '100%', paddingHorizontal: 20 }}>
            <Text style={{ color: 'black', marginBottom: 5, fontSize: 20, textAlign: "left", width: '100%', fontWeight: "700", marginLeft: 5 }}>Map Size:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: 10 }}>
              <TertiaryMenuButton selected={size === SMALL_SIZE} title="SMALL" onPress={() => setSize(SMALL_SIZE)} />
              <TertiaryMenuButton selected={size === MEDIUM_SIZE} title="MEDIUM" onPress={() => setSize(MEDIUM_SIZE)} />
              <TertiaryMenuButton selected={size === LARGE_SIZE} title="LARGE" onPress={() => setSize(LARGE_SIZE)} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 5, paddingHorizontal: 20, padding: 5 }}>
            <SecondaryMenuButton onPress={() => handlePackOptionsSubmit()} title="SUBMIT" />
            <SecondaryMenuButton onPress={() => handleOfflinePackCancellation()} title="CANCEL" />
          </View>
        </View>
      </View>
    </Modal>
  )
};


