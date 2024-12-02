import { TouchableOpacity } from "react-native";
import { sovietButtonStyles } from "../../assets/sovietStyles";
import React, { FC } from "react";
import Icon from "react-native-ionicons";

interface MapLayerToggleButtonProps {
    onPress: () => void;
    isSatellite: boolean;
}

/**
 * This button is the little icon that swaps between street view and satellite view on the map
 * @param param0 
 * @returns 
 */
export const MapLayerToggleButton: FC<MapLayerToggleButtonProps> = ({ onPress, isSatellite }) => (
    <TouchableOpacity style={sovietButtonStyles.MapLayerToggleButtonStyle} onPress={onPress}>
        <Icon name={isSatellite ? 'sunny' : 'map'} size={30} color="black" />
    </TouchableOpacity>
);