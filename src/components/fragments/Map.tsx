import Mapbox, { Camera, LocationPuck, MapView, StyleURL } from "@rnmapbox/maps";
import config from '../../../config';
import { useRocket } from "../../contexts/RocketContext";
import React, { FC, useRef, useState } from "react";
import RouteLine from "./RouteLine";
import RocketIconShape from "./RocketIconShape";
import { useBluetooth } from "../../contexts/BluetoothContext";
import { View } from "react-native";
import { MapLayerToggleButton } from "../buttons/MapLayerToggleButton";
import DropdownMenu from '../../components/fragments/MapDropdownMenu';
import offlineMapPackLogic from "../../logicUtils/OfflineMapPackLogic";
import { OfflineMapOptionsModal } from "./OfflineMapOptionsModal";
import { OfflineMapConfirmation } from "./OfflineMapConfirmation";
import { OfflineMapRectangle } from "./OfflineMapRectangle";
import { OfflineMapDownloadProgressBar } from "./OfflineMapDownloadProgressBar";

Mapbox.setAccessToken(config.MAP_BOX_PUBLIC_TOKEN);

/**
 * This is the primary component of the Map view
 * @returns 
 */
const Map: FC = () => {

  // This is where all of the variables and functions are defined for use in the component
  const [isSatellite, setIsSatellite] = useState(false); // this is for the satellite view, state variable
  const mapStyle = isSatellite ? StyleURL.Satellite : StyleURL.Street; // This uses the state variable to define the map style
  const cameraRef = useRef<Camera>(null); // set up reference for the camera
  const toggleMapStyle = () => {setIsSatellite(!isSatellite);}; // this swaps the map style between satellite and street view
  const { directionCoordinates, showDirections } = useRocket(); // route/direction data
  const { rocketData } = useBluetooth(); // importing rocket data from the bluetooth provider
  const { SMALL_SIZE, MEDIUM_SIZE, LARGE_SIZE, size, packName, dropdownVisible, 
    rectangleCoordinates, isCreatingOfflineMap, isPackOptionsModalVisible,
    offlineMapDownloadProgress, isPackConfirmationVisible,
    setSize, setPackName, setDropdownVisible,
    getAllPacks, removeAllPacks, beginCreatingPack, handlePackOptionsSubmit,
    handleOfflinePackCreation, handleOfflinePackCancellation, captureOfflineMapCentrePointCoords,
  } = offlineMapPackLogic(); // destructuring from the offline map logic
  const menuOptions = [
    { title: 'Load offline maps', onPress: getAllPacks },
    { title: 'Delete offline maps', onPress: removeAllPacks },
    { title: 'Create Offline Map', onPress: beginCreatingPack },
  ]; // menu options for the offline maps

  /**
   * This is the rendered part of the component, it contains multiple other components as can be seen. 
   * The "MapView" is the Map component, with the buttons and modals rendered on top of it, or hidden in the case of the modals
   */
  return (
    <View style={{ flex: 1 }}>
      <DropdownMenu options={menuOptions} dropdownVisible={dropdownVisible} setDropdownVisible={setDropdownVisible} />
      <MapLayerToggleButton onPress={toggleMapStyle} isSatellite={isSatellite} />
      {offlineMapDownloadProgress > 5 && offlineMapDownloadProgress < 100 && (
        <OfflineMapDownloadProgressBar offlineMapDownloadProgress={offlineMapDownloadProgress} />
      )}
      <MapView style={{ flex: 1 }} styleURL={mapStyle} onPress={captureOfflineMapCentrePointCoords}>
        <Camera ref={cameraRef} followZoomLevel={13} followUserLocation />
        <LocationPuck pulsing={{ isEnabled: true }} puckBearingEnabled puckBearing="heading" />
        <RocketIconShape />
        {showDirections && directionCoordinates && (
          <RouteLine coordinates={directionCoordinates} />
        )}
        {rectangleCoordinates.length > 0 && isCreatingOfflineMap && (
          <OfflineMapRectangle rectangleCoordinates={rectangleCoordinates} />
        )}
      </MapView>
      <OfflineMapOptionsModal SMALL_SIZE={SMALL_SIZE} MEDIUM_SIZE={MEDIUM_SIZE} LARGE_SIZE={LARGE_SIZE} size={size}
        packName={packName} isPackOptionsModalVisible={isPackOptionsModalVisible} setSize={setSize} setPackName={setPackName}
        handlePackOptionsSubmit={handlePackOptionsSubmit} handleOfflinePackCancellation={handleOfflinePackCancellation} />
      {isPackConfirmationVisible && (
        <OfflineMapConfirmation
          handleOfflinePackCancellation={handleOfflinePackCancellation}
          handleOfflinePackCreation={handleOfflinePackCreation}
          mapStyle={mapStyle} />
      )}

    </View>
  );
}
export default Map;