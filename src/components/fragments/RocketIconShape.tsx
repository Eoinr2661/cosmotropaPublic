import { ShapeSource, SymbolLayer, Images } from "@rnmapbox/maps";
import React, { FC } from "react";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { featureCollection } from "@turf/helpers";
import { useRocket } from "../../contexts/RocketContext";
import { useBluetooth } from "../../contexts/BluetoothContext"
// @ts-ignore
import rocketIcon from '../../assets/images/RocketIcon.png';

// Implementing the rocket shapes followed this tutorial for a Bolt clone: https://www.youtube.com/live/uxj8jnlooP8?si=qncLQRjaKuwNgQoS
// Whilst that tutorial gave a good start, it didn't allow for the icon to move around the map, and simply plugging in the coordinates caused the entire map to re-render
// So whilst this tutorial was instrumental in helping me to understand the Mapbox documentation, ultimately the final implementation required a lot of work and fine-tuning to suit the needs
// of this particular application, so whilst it uses an external library, I feel that this constitutes my own work
const RocketIconShape: FC = () => {
  const { setSelectedRocket } = useRocket();
  const { rocketData } = useBluetooth();
  const points = rocketData
    ? [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [rocketData.longitude, rocketData.latitude],
        },
        properties: { id: 1 },
      },
    ] : [];
  const rocketsFeatures = featureCollection(points);
  const onPointPress = async (event: OnPressEvent) => {
    console.log('rocket selected');
    setSelectedRocket(rocketData)
  };

  return (
    <ShapeSource id={"rockets"} shape={rocketsFeatures} onPress={onPointPress}
      key={`${rocketData.longitude}-${rocketData.latitude}`}>
      <SymbolLayer
        id="symbolLocationSymbols"
        style={{
          iconImage: 'rocketIcon',
          iconSize: 0.09,
          iconAllowOverlap: true,
          iconAnchor: 'bottom',
        }}
      />
      <Images images={{ rocketIcon }} />
    </ShapeSource>
  )
}

export default RocketIconShape;