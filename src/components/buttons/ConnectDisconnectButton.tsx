import React, {FC} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { sovietButtonStyles, sovietTextStyles } from '../../assets/sovietStyles';

/**
 * Props are defined here, it takes two specific functions and a title, this button is slightly different in that it is quite specific to its use case, most other buttons are more generic and could be applied anywhere. 
 */
interface ConnectButtonProps {
    isConnected: boolean;
    connectToDevice: () => void;
    disconnect: () => void;
  }

const ConnectDisconnectButton: FC<ConnectButtonProps> = ({ isConnected, connectToDevice, disconnect }) => (
  <TouchableOpacity
    onPress={() => {
      if (isConnected) {
        disconnect();
      } else {
        connectToDevice();
      }
    }}
    style={sovietButtonStyles.smallButton}>
    <Text
      style={[
        sovietTextStyles.smallButtonText,
      ]}>
      {isConnected ? 'DISCONNECT' : 'CONNECT'}
    </Text>
  </TouchableOpacity>
);

export default ConnectDisconnectButton;