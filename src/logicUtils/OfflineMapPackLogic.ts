import { offlineManager, StyleURL } from "@rnmapbox/maps";
import { useState } from "react";
import { Alert } from "react-native";

interface OfflineMapLogicProps {
  SMALL_SIZE: number;
  MEDIUM_SIZE: number;
  LARGE_SIZE: number;

  size: number;
  packName: string;
  dropdownVisible: boolean;
  rectangleCoordinates: [number, number][];
  isCreatingOfflineMap: boolean;
  isPackOptionsModalVisible: boolean;
  offlineMapDownloadProgress: number;
  isPackConfirmationVisible: boolean;

  setSize: (size: number) => void;
  setPackName: (name: string) => void;
  setDropdownVisible: (visible: boolean) => void;

  getAllPacks: () => void;
  removeAllPacks: () => void;
  beginCreatingPack: () => void;
  handlePackOptionsSubmit: () => void;
  handleOfflinePackCreation: (mapStyle: StyleURL) => void;
  handleOfflinePackCancellation: () => void;
  captureOfflineMapCentrePointCoords: (event: any) => void;
}

/**
 * A lot of variables going on in this component, however it really is quite simple. 
 * The reason for the various components are just because there are quite a few modals, menus and shapes that need to be hidden or shown depending on circumstances
 * As well as storing coordinates.
 * 90% of this component is just figuring out whether a certain element needs to be shown to the user. 
 * 
 * This component just handles all of the logic required for creating offline maps
 * @returns 
 */
const offlineMapPackLogic = (): OfflineMapLogicProps => {

  const SMALL_SIZE = 0.05;
  const MEDIUM_SIZE = 0.1;
  const LARGE_SIZE = 0.2;

  const [rectangleCoordinates, setRectangleCoordinates] = useState<[number, number][]>([]);
  const [isCreatingOfflineMap, setIsCreatingOfflineMap] = useState(false);
  const [isPackOptionsModalVisible, setPackOptionsModalVisible] = useState(false);
  const [isPackConfirmationVisible, setPackConfirmationVisible] = useState(false);
  const [size, setSize] = useState(0.001);
  const [packName, setPackName] = useState('');
  const [offlineMapDownloadProgress, setOfflineMapDownloadProgress] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);


  const getAllPacks = async () => {
    const packs = await offlineManager.getPacks();
    setDropdownVisible(false);
    if (packs.length === 0) {
      Alert.alert('No Offline Maps Saved.')
    } else {
      let packList: string = '';
      packs.forEach((pack) => {
        console.log('pack:', pack, 'name:', pack.name, 'bounds:', pack?.bounds);
        packList = packList.concat(pack.name + ', ')
      });
      Alert.alert(packList)
    }
  };

  const removeAllPacks = async () => {
    setDropdownVisible(false);
    const result = await offlineManager.resetDatabase();
    Alert.alert('Offline Maps Deleted')
    console.log('Reset DB done:', result);
  };

  const beginCreatingPack = () => {
    setDropdownVisible(false);
    setIsCreatingOfflineMap(true);
    setPackOptionsModalVisible(true); // asking for name and size
  };

  const handlePackOptionsSubmit = () => {
    setPackOptionsModalVisible(false);
    Alert.alert('Touch a Point',
      'Please tap the centre point for your offline map');
  };

  const captureOfflineMapCentrePointCoords = (event: any) => {
    if (!isCreatingOfflineMap) {
      return;
    };
    const { geometry } = event;
    const coords: [number, number] = geometry.coordinates;
    const rectCoords = generateRectangle(coords, size);
    setRectangleCoordinates(rectCoords);
    setPackConfirmationVisible(true);
  };

  const handleOfflinePackCreation = (mapStyle: StyleURL) => {
    const options = {
      name: packName,
      styleURL: mapStyle,
      minZoom: 10,
      maxZoom: 20,
      bounds: [rectangleCoordinates[2], rectangleCoordinates[0]] as [[number, number], [number, number]],
    };
    offlineManager.createPack(options, (region, status) =>
      setOfflineMapDownloadProgress((status.percentage))
      // console.log('=> progress callback region:', 'status: ', status),
    );
    setPackConfirmationVisible(false);
    setIsCreatingOfflineMap(false);
    setRectangleCoordinates([]);
    setPackName('');
  }

  const handleOfflinePackCancellation = () => {
    setPackOptionsModalVisible(false);
    setPackConfirmationVisible(false);
    setIsCreatingOfflineMap(false);
    setRectangleCoordinates([]);
    setPackName('');
  }
// the rectangle is made by adding or subtracting from the centrepoint selected by the user
  const generateRectangle = (centre: [number, number], rectangleSize: number): [number, number][] => {
    return [
      [centre[0] - rectangleSize, centre[1] - rectangleSize],
      [centre[0] + rectangleSize, centre[1] - rectangleSize],
      [centre[0] + rectangleSize, centre[1] + rectangleSize],
      [centre[0] - rectangleSize, centre[1] + rectangleSize],
      [centre[0] - rectangleSize, centre[1] - rectangleSize],
    ];
  };

  /**
   * This function was going to simplify the resetting of the various modals and vars upon completion or cancellation of an offline map, but I ended up keeping it the way I had it because I felt it was more readable. 
   * This would be a nice thing to do in a future update though, fairly minor 
   */
  const resetOfflinePackVariables = () => {

  }
  return {

    SMALL_SIZE,
    MEDIUM_SIZE,
    LARGE_SIZE,

    size,
    packName,
    dropdownVisible,
    rectangleCoordinates,
    isCreatingOfflineMap,
    isPackOptionsModalVisible,
    offlineMapDownloadProgress,
    isPackConfirmationVisible,

    setSize,
    setPackName,
    setDropdownVisible,

    getAllPacks,
    removeAllPacks,
    beginCreatingPack,
    handlePackOptionsSubmit,
    handleOfflinePackCreation,
    handleOfflinePackCancellation,
    captureOfflineMapCentrePointCoords,
  };
}

export default offlineMapPackLogic;
