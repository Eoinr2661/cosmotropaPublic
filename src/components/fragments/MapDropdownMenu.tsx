import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons';
import { sovietColours, sovietFragmentStyles } from '../../assets/sovietStyles';

interface DropdownMenuProps {
  options: { title: string, onPress: () => void }[];
  dropdownVisible: boolean;
  setDropdownVisible: (visible: boolean) => void;
}

/**
 * Simple dropdown menu for managing the offline maps, options props are passing in via the Map component
 * @param param0 
 * @returns 
 */
const DropdownMenu: FC<DropdownMenuProps> = ({ options, dropdownVisible, setDropdownVisible }) => {
  return (
    <View style={{position:'relative'}}>
      <TouchableOpacity style={sovietFragmentStyles.dropdownMenuIconStyle} onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Icon name="menu" color='black' size={30} />
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={sovietFragmentStyles.dropdownStyle}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={{padding:10}} onPress={option.onPress}>
              <Text style={{color:sovietColours.sovietBlack}}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DropdownMenu;
