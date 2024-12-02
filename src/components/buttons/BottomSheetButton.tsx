/**
 * This component is the button found on the pop up sheet for when you select a rocket in the map view. 
 */
import React, {FC} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { sovietButtonStyles, sovietTextStyles } from '../../assets/sovietStyles';

/**
 * Props are defined here, it takes a function and a title, like most other button components in the app
 */
type BottomSheetButtonProps = {
  onPress: () => void;
  title: string;}

export const BottomSheetButton: FC<BottomSheetButtonProps> = ({ onPress, title }) => (
      <TouchableOpacity
        style={sovietButtonStyles.bottomSheetButton}
        onPress={onPress}>
        <Text style={sovietTextStyles.smallButtonText}>{title}</Text>
      </TouchableOpacity>
    );


