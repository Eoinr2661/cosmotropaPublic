import { TouchableOpacity, Text } from "react-native";
import { sovietButtonStyles, sovietTextStyles } from "../../assets/sovietStyles";
import React, { FC } from "react";

interface WideButtonProps {
  onPress: () => void;
  title: string;
}

/**
 * This is the primary button used throughout the app, it takes a function and title as props, highly re-usable
 * @param param0 
 * @returns 
 */
export const WideButton: FC<WideButtonProps> = ({ onPress, title}) => (
<TouchableOpacity onPress={onPress} style={sovietButtonStyles.wideButton}>
  <Text style={sovietTextStyles.fullWidthButtonText}>
    {title}
  </Text>
</TouchableOpacity>
);