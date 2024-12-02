import { FillLayer, ShapeSource } from '@rnmapbox/maps';
import React, { FC } from 'react';

export interface OfflineMapRectangleProps {
  rectangleCoordinates: [number, number][];
}

/**
 * This is the rectangle that pops up on the view for confirming the downloaded area. 
 * Funnily, its actually a square but it just gets warped in the northern latitudes on the Mercador Map, if you use it at the equator, you can see its just a square. 
 * @param param0 
 * @returns 
 */
export const OfflineMapRectangle: FC<OfflineMapRectangleProps> = ({
  rectangleCoordinates,
}) => {
  return (
    <ShapeSource
      id="rectangleShapeSource"
      shape={{
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [rectangleCoordinates]
        },
        properties: {}
      }}>
      <FillLayer
        id="rectangleFill"
        style={{ fillColor: 'rgba(0, 0, 255, 0.3)' }}
      />
    </ShapeSource>
  )
}

