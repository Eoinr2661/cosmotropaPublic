import { ShapeSource, LineLayer } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import React from "react";
/**
 * This Routeline code followed the tutorial https://www.youtube.com/live/uxj8jnlooP8?si=qncLQRjaKuwNgQoS
 * It is more or less straight from the Mapbox directions docs, and just swaps out the relevant variables to suit this project
 * https://docs.mapbox.com/api/navigation/directions/
 * @param param0 
 * @returns 
 */
export default function RouteLine({ coordinates }: { coordinates: Position[] }) {
  return (
    <ShapeSource
      id="routeSource"
      lineMetrics
      shape={{
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
        },
      }}>
      <LineLayer
        id="exampleLineLayer"
        style={{
          lineColor: '#42A2D9', // line colour here
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: 6,
        }}
      />
    </ShapeSource>
  )
}