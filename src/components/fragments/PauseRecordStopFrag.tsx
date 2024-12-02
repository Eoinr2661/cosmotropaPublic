import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { sovietColours} from "../../assets/sovietStyles";
import { WideButton } from "../buttons/WideButton";
import Icon from 'react-native-ionicons';


interface PauseRecordStopFragProps {
  isConnected: boolean;
  isRecording: boolean;
  flightName: string;
  setFlightName: (flightName: string) => void;
  setIsRecording: (isRecording: boolean) => void;
  setFlightNameInputBoxVisible: () => void;

}

/**
 * This is the bottom component in the home screen that manages the configuration and management of flight recordings. 
 * I was going to re-factor the CSS into classes, but I know that I would just be re-doing that anyway as the CSS needs to be refactored using a framework like tailwind at a future date anyway. 
 * As in, I will be redoing the entire project's CSS using tailwind, having experimented with Vanilla CSS for my own learning. 
 * @param param0 
 * @returns 
 */
const PauseRecordStopFrag: FC<PauseRecordStopFragProps> = ({ isConnected, isRecording, setFlightName, setIsRecording, setFlightNameInputBoxVisible, flightName }) => {
  return (
    <View style={{
      borderRadius: 10,
      height: '20%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      margin: 10,
    }}>
      {/* No flight name set */}
      {!flightName && (
        <View style={{
          backgroundColor: sovietColours.sovietLightGreyTranslucent,
          height: '100%',
          width: '100%',
          borderRadius: 10,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <WideButton onPress={() => setFlightNameInputBoxVisible()} title='CONFIGURE RECORDING' />
        </View>
      )}
      {/* Flight name is set */}
      {flightName && (
        <View style={{
          flex: 1,
          flexDirection: 'row' as 'row',
          gap: 10,
        }}>
          {/* Start recording */}
          {!isRecording && (
            <TouchableOpacity onPress={() => setIsRecording(true)}
              style={{
                flex: 1,
                flexDirection: 'column' as 'column',
                backgroundColor: sovietColours.sovietLightGreyTranslucent,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: sovietColours.sovietMustard,
                justifyContent: 'space-between' as 'space-between',
                alignItems: 'center' as 'center',
              }}>
              <View style={{ marginTop: 10 }}>
                <Icon name="play-circle" size={150} color='green' /></View>
              <View style={{
                margin: 10,
                width: '90%' as '90%',
                borderTopColor: sovietColours.sovietBlack,
                borderTopWidth: 2,
                justifyContent: 'flex-end' as 'flex-end',
                alignItems: 'center' as 'center',
              }}>
                <Text style={{
                  fontFamily: 'kremlin',
                  fontSize: 15,
                  color: sovietColours.sovietBlack,
                  textAlign: 'center' as 'center',
                  marginTop: 5,
                }}>
                  START RECORDING
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* Pause recording */}
          {isRecording && (
            <TouchableOpacity onPress={() => setIsRecording(false)} style={{
              flex: 1,
              flexDirection: 'column' as 'column',
              backgroundColor: sovietColours.sovietLightGreyTranslucent,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: sovietColours.sovietMustard,
              justifyContent: 'space-between' as 'space-between',
              alignItems: 'center' as 'center'
            }}>
              <View style={{ marginTop: 10 }}>
                <Icon name="pause" size={150} color={sovietColours.sovietBlue} /></View>
              <View style={{
                margin: 10,
                width: '90%' as '90%',
                borderTopColor: sovietColours.sovietBlack,
                borderTopWidth: 2,
                justifyContent: 'flex-end' as 'flex-end',
                alignItems: 'center' as 'center',
              }}>
                <Text style={{
                  fontFamily: 'kremlin',
                  fontSize: 15,
                  color: sovietColours.sovietBlack,
                  textAlign: 'center' as 'center',
                  marginTop: 5,
                }}>
                  PAUSE RECORDING
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* End recording */}

          <TouchableOpacity onPress={() => { setFlightName(''); setIsRecording(false); }}
            style={{
              flex: 1,
              flexDirection: 'column' as 'column',
              backgroundColor: sovietColours.sovietLightGreyTranslucent,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: sovietColours.sovietMustard,
              justifyContent: 'space-between' as 'space-between',
              alignItems: 'center' as 'center'
            }}>
            <View style={{ marginTop: 10 }}>
              <Icon name="square" size={150} color={sovietColours.sovietRed} /></View>
            <View style={{
              margin: 10,
              width: '90%' as '90%',
              borderTopColor: sovietColours.sovietBlack,
              borderTopWidth: 2,
              justifyContent: 'flex-end' as 'flex-end',
              alignItems: 'center' as 'center',
            }}>
              <Text style={{
                fontFamily: 'kremlin',
                fontSize: 15,
                color: sovietColours.sovietBlack,
                textAlign: 'center' as 'center',
                marginTop: 5,
              }}>
                STOP RECORDING
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      )}
    </View>
  );
};

export default PauseRecordStopFrag;