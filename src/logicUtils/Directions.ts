import config from '../../config';

// This Directions function is from the mapbox directions docs, https://docs.mapbox.com/api/navigation/directions/
// The only thing I really changed was breaking the big api string into its constituent parts
// Obviously with an API you have to interface with it as they expect, so not much can be changed, 
// However bits like walking, alernative routes, language are all things that should be modified depending on user
// So breaking the long url into components like I've done means it'll be really straightforward to implement these things in the future, 
// I can just go and change "walking" to "driving" or "cycling" using a state variable if that is something I want to change at a future date, really cool API from Mapbox. 
// All that I use this for is to show a line in the map, I didn't really think this should be developed further as the hard part of finding the rocket isn't which road to take, 
// its trying to find it in a field or bog somewhere, so this lineRoute / directions thing would be much more useful for big rockets that travel many kilometers away from the launch site. 
// This could be used to provide more in-depth directions like which turns to take, but probably a low-priority given the nature of just walking a few hundred meters for most launches. 

// Variables for the big url string, for future updates changing things like walking to driving etc... 
const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox/';
const MAPBOX_PUBLIC_KEY = config.MAP_BOX_PUBLIC_TOKEN;
const mode = "walking";
const alternatives = true;
const annotations = "distance,duration";
const language = "en";

if (!MAPBOX_PUBLIC_KEY) {
  throw new Error('MAPBOX_PUBLIC_KEY is not defined. Set it in config.');
}

export async function getDirections(startingCoordinates: [number, number], endingCoordinates: [number, number]) {
  console.log('getting directions');
  if (!Array.isArray(startingCoordinates) || !Array.isArray(endingCoordinates) ||
      startingCoordinates.length !== 2 || endingCoordinates.length !== 2 ||
      isNaN(startingCoordinates[0]) || isNaN(startingCoordinates[1]) ||
      isNaN(endingCoordinates[0]) || isNaN(endingCoordinates[1])) {
    throw new Error('Invalid coordinates');
  }

  const url = `${BASE_URL}${mode}/${startingCoordinates[0]},${startingCoordinates[1]};${endingCoordinates[0]},${endingCoordinates[1]}?alternatives=${alternatives}&annotations=${annotations}&continue_straight=true&geometries=geojson&language=${language}&overview=full&steps=true&access_token=${MAPBOX_PUBLIC_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching directions: ${response.statusText}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching directions:', error);
    throw error; 
  }
}
