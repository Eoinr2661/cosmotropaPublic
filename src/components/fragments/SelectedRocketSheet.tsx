import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { Text, Image, View, Alert } from 'react-native';
import { useRocket } from '../../contexts/RocketContext';
import { sovietColours, sovietFragmentStyles, sovietTextStyles } from '../../assets/sovietStyles';
import { BottomSheetButton } from '../buttons/BottomSheetButton';
import Icon from 'react-native-ionicons';
import Clipboard from '@react-native-clipboard/clipboard';

// @ts-ignore
import CCCPBadge from '../../assets/images/cccpBadge.png';

/**
 * NOTE, FUTURE UPDATE REQUIRED, the issue was incorrectly merged into #1854 on the gorhom react-native-bottom-sheet 
 * This is solved in the Alpha update, however continuing to use the "@gorhom/bottom-sheet": "^5.0.0-alpha.10", update might cause other errors in the future, 
 * So need to update to the full release when it comes out and then test to ensure everything still works
 * 
 * See error that appeared on the older version of bottom sheet: (This is fixed in the Alpha version above)
 * [Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet. (Err code)
 * fixed the above by upgrading to an alpha version, need to keep an eye on this
 */

/**
 * This is the selectedRocketSheet, it allows users to enable the line route and also copy coordinates to be shared
 * @returns 
 */
export default function SelectedRocketSheet() {
  const { selectedRocket, distance, routeTime, showDirections, setShowDirections } = useRocket();

  const toggleDirections = () => {
    setShowDirections(!showDirections);
};

  const copyCoordsToClipboard = () => {
    if (selectedRocket.latitude === undefined || selectedRocket.longitude === undefined) {
      Alert.alert('rocket coords undefined',
        'double check your connection to the groundstation')
      return;
    }
    if (!selectedRocket) {
      Alert.alert('Select a Rocket',
        'Ensure you have tapped the rocket on the map, before trying to copy coordinates')
      return;
    }
    const latitude = selectedRocket.latitude?.toString();
    const longitude = selectedRocket.longitude?.toString();

    const coordinates = `${latitude}, ${longitude}`;

    Clipboard.setString(coordinates);
    Alert.alert('Copied to Clipboard', 
      `The coordinates have been copied: ${coordinates}`);
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  useEffect(() => {
    if (selectedRocket) {
      bottomSheetRef.current?.expand();
    }
  }, [selectedRocket]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[35, 200]}
      backgroundStyle={{ backgroundColor: sovietColours.sovietLightGrey }}
    >
      <BottomSheetView style={{ padding: 10, gap: 10 }}>
        {/* Top part */}
        <View style={{ flexDirection: 'row', justifyContent:'center', alignItems: 'center', gap: 10 }}>
          {/* Left Image TOP */}
          <Image source={CCCPBadge} style={{ width: 90, height: 90 }} />
        </View>

        {/* Bottom part */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 10 }}>
          <BottomSheetButton title="COPY LOCATION" onPress={copyCoordsToClipboard} />
          <BottomSheetButton title={showDirections ? "HIDE ROUTE" : "SHOW ROUTE"} onPress={toggleDirections} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );

}