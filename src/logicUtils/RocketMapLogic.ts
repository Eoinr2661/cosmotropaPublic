/**
 * It is responsible for fetching the directions, and just managing the logic around the 
 * rocket icon on the map. 
 * Used this tutorial to help with the initial implementation 
 * https://www.youtube.com/live/uxj8jnlooP8?si=qncLQRjaKuwNgQoS
 */
import { useEffect, useState } from "react";
import { useBluetooth } from "../contexts/BluetoothContext";
import { getDirections } from "../logicUtils/Directions";
import { RocketData } from "../interfaces/RocketDataInterface";

export interface RocketMapLogicProps {
  selectedRocket: RocketData;
  direction: any;
  directionCoordinates: number[][];
  routeTime: number;
  distance: number;
  showDirections: boolean;
  setShowDirections: (show: boolean) => void;
  setSelectedRocket: (rocket: RocketData) => void;
  setDirection: (direction: JSON) => void;
  setRouteTime: (time: number) => void;
  setDistance: (distance: number) => void;
}

const useRocketService = (): RocketMapLogicProps => {
  const { currentLocation } = useBluetooth();
  const [showDirections, setShowDirections] = useState(false);
  const [routeTime, setRouteTime] = useState<number>(); // (seconds) Also, would like to set this outside the provider, so keeping
  const [distance, setDistance] = useState<number>(); // (meters) Also, would like to set this outside the provider, so keeping
  const [selectedRocket, setSelectedRocket] = useState<RocketData>({
    altitude: undefined,
    longitude: undefined,
    latitude: undefined,
    velocityMS: undefined,
    velocityKMH: undefined,
    timestamp: ['', ''],
    isConnected: false,
    numberOfSatellitesBeingTracked: undefined,
  });
  const [direction, setDirection] = useState<any>(); // 'direction' is the route coords

  useEffect(() => {
    const fetchDirections = async () => {
      if (!selectedRocket || selectedRocket.latitude === undefined || selectedRocket.longitude === undefined) {
        console.log('No selected rocket, or else invalid coords');
        return;
      }
      const newDirection = await getDirections(
        [currentLocation.longitude, currentLocation.latitude],
        [selectedRocket.longitude, selectedRocket.latitude],
      );
      setDirection(newDirection);
    };
    if (selectedRocket) {
      fetchDirections();
    }
  }, [selectedRocket]) // when the rocket is pressed on the map directions are fetched

  return {
    selectedRocket,
    direction,
    directionCoordinates: direction?.routes?.[0]?.geometry?.coordinates,
    routeTime: direction?.routes?.[0]?.duration, // in seconds
    distance: direction?.routes?.[0]?.distance, // Distance in meters
    showDirections,
    setShowDirections,
    setSelectedRocket,
    setDirection,
    setRouteTime,
    setDistance,
  };

}

export default useRocketService;