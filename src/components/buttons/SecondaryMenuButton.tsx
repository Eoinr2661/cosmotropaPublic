import React, {FC} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { sovietButtonStyles, sovietTextStyles } from '../../assets/sovietStyles';

interface SecondaryMenuButtonProps {
    onPress: () => void;
    title: string;
  }
/**
 * This is a variation of the WideButton.tsx, slightly different styling
 * @param param0 
 * @returns 
 */
export const SecondaryMenuButton: FC<SecondaryMenuButtonProps> = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={ sovietButtonStyles.secondaryMenuButton}>
    <Text style={[ sovietTextStyles.smallButtonText]}>
      {title}
    </Text>
  </TouchableOpacity>
);