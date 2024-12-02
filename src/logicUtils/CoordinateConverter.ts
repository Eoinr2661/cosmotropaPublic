import { Coordinates } from "../interfaces/CoordinatesInterface";


/**
 * This function takes in coordinates in decimal format and converts to NSWE format
 * Example: 40.7128° N, 74.0060° W
 * 
 * @param coordinates 
 * @returns 
 */
function convertToNSWE(coordinates: Coordinates): { latitudeNS: string, longitudeWE: string } {
    const { latitude, longitude } = coordinates;
    const latitudeNS = latitude >= 0 ? `${latitude.toFixed(5)} N` : `${(-latitude).toFixed(5)} S`;
    const longitudeWE = longitude >= 0 ? `${longitude.toFixed(5)} E` : `${(-longitude).toFixed(5)} W`;
    return { latitudeNS, longitudeWE };
}

/**
 * This function takes in coordinates in decimal format and converts to DMS format
 * Example: 40° 26' 46.8" N, 79° 58' 56.4" W
 * @param coordinates 
 * @returns 
 */
function convertToDMS(coordinates: Coordinates): { latitudeDMS: string, longitudeDMS: string } {
    const { latitude, longitude } = coordinates;

    const toDMS = (decimal: number): string => {
        const degrees = Math.floor(decimal);
        const minutesDecimal = (decimal - degrees) * 60;
        const minutes = Math.floor(minutesDecimal);
        const seconds = ((minutesDecimal - minutes) * 60).toFixed(3);

        return `${degrees}° ${minutes}' ${seconds}"`;
    };

    const latitudeDMS = latitude >= 0 ? `${toDMS(latitude)} N` : `${toDMS(-latitude)} S`;
    const longitudeDMS = longitude >= 0 ? `${toDMS(longitude)} E` : `${toDMS(-longitude)} W`;

    return { latitudeDMS: latitudeDMS, longitudeDMS: longitudeDMS };
}

/**
 * 
 * @param fullCoord This could be longitude or latitude, includes value and the direction
 * @returns 
 */
const convertToDecimalCoordinate = (fullCoord: string) => {
    if (!fullCoord) {
        return 0;
    }
    let coordValue = fullCoord.split(' ')[0];
    let direction = fullCoord.split(' ')[1].trim();
    let degrees: number;
    let minutes: number;

    if (direction === 'N' || direction === 'S') {
        // Latitude has 2 degrees digits
        degrees = parseFloat(coordValue.slice(0, 2));
        minutes = parseFloat(coordValue.slice(2));
    } else if (direction === 'E' || direction === 'W') {
        // Longitude has 3 degrees digits
        degrees = parseFloat(coordValue.slice(0, 3));
        minutes = parseFloat(coordValue.slice(3));
    } else {
        return 0;
    }

    let decimal = degrees + minutes / 60;
    if (direction === 'S' || direction === 'W') {
        decimal = -decimal;
    }
    return decimal;
};

export { convertToNSWE, convertToDMS, convertToDecimalCoordinate };