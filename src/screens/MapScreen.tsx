import React from 'react';
import Map from '../components/fragments/Map';
import ScreenHeader from '../components/fragments/ScreenHeader'
import SelectedRocketSheet from '../components/fragments/SelectedRocketSheet';

// Implementing the Mapbox API and many functions of the Maps in general had to follow the documentation outlined on their website
// https://docs.mapbox.com/
export default function MapScreen() {

  return (
    <>
      <ScreenHeader title='TRACKER' />
      <Map />
      <SelectedRocketSheet/>
    </>
  );
}