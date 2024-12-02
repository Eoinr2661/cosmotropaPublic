import React from 'react';
import { Text, View } from 'react-native';
import { sovietColours } from '../../assets/sovietStyles';
import { HeaderLogInOutButton } from '../buttons/HeaderLogInOutButton';

const StatsScreenHeader = ({ title }: { title: string }) => {

/**
 * Simpl header that has a logout button, and a title for each different screen
 */
  return (
    <View style={{ backgroundColor: sovietColours.sovietRed, padding: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flex: 1, marginLeft: 5, justifyContent: 'flex-start', flexDirection: 'row' }}>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 3, height: '100%', marginVertical: 5, }}>
        <Text style={{ fontFamily: 'kremlin', fontSize: 35, color: sovietColours.sovietMustard }}>{title}</Text>
      </View>
      <View style={{ flex: 1, marginRight: 5, justifyContent: 'flex-end', flexDirection: 'row' }}>
        <HeaderLogInOutButton />
      </View>
    </View>
  );
};
export default StatsScreenHeader;