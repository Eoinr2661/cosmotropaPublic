import { TouchableOpacity } from "react-native";
import { sovietButtonStyles } from "../../assets/sovietStyles";
import React, { FC } from "react";
import Icon from "react-native-ionicons";

interface MapLocationButtonProps {
    onPress: () => void;
}
/**
 * This button ended up not being implemented due to time contstraints, its purpose was to centre the map camera back on the user's location
 * @param param0 
 * @returns 
 */
export const MapLocationButton: FC<MapLocationButtonProps> = ({ onPress }) => (
    <TouchableOpacity style={sovietButtonStyles.MapLocationButtonStyle} onPress={onPress}>
        <Icon name={'locate'} size={30} color="black" />
    </TouchableOpacity>
);