import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { sovietColours } from '../../assets/sovietStyles';

interface TertiaryMenuButtonProps {
  onPress: () => void;
  title: string;
  selected: boolean;
}

/**
 * This is a variation of the WideButton.tsx, slightly different styling
 * @param param0 
 * @returns 
 */
export const TertiaryMenuButton: FC<TertiaryMenuButtonProps> = ({ onPress, title, selected }) => {
  let buttonColour = '';

  if (selected) {
    buttonColour = sovietColours.sovietRed;
  } else {
    buttonColour = sovietColours.sovietLightGreyTranslucent;
  }

  return (
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: buttonColour,
      padding: 10,
      borderRadius: 10,
      width: '30%',
      display: 'flex' as 'flex',
      justifyContent: 'center' as 'center',
      alignItems: 'center' as 'center',
      borderColor: sovietColours.sovietMustard,
      borderWidth: 2,
    }}>
      <Text style={{
        fontFamily: 'kremlin',
        color: sovietColours.sovietMustard,
        fontSize: 13,
        textAlign: 'center' as 'center',
        justifyContent: 'center' as 'center',
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
