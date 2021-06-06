import { magnitudeColors } from './config';

/**
 * findMaxMag
 *
 * @param {array} arr Array of earthquake objects.
 * @return {string} Id of the found word with min or max property value.
 */
export const findMaxMag = (arr) => {
   // handle invalid input
   // array
   if (!arr || !Array.isArray(arr) || !arr.length)
      throw new Error('invalid array');

   // declare starting point
   let quake = { id: arr[0].id };
   quake.mag = arr[0].properties.mag;

   for (let i = 1; i < arr.length; i++) {
      if (arr[i].properties.mag > quake.mag) {
         quake.id = arr[i].id;
         quake.mag = arr[i].properties.mag;
      }
   }
   return quake.id;
};

/**
 * mapDataOnGlobeMarkers
 *
 * @param {object} word Word data to be mapped on new data model.
 * @return {object} Word data model to be used in other components.
 */
export const mapDataOnGlobeMarkers = (quake) => {
   // cover invalid input
   if (!quake) throw new Error('null, undefined or empty object');
   if (typeof quake !== 'object' || Array.isArray(quake))
      throw new Error('not an object');

   return {
      id: quake.id,
      city: quake.properties.place,
      color: '',
      coordinates: [
         quake.geometry.coordinates[1],
         quake.geometry.coordinates[0],
      ],
      value: quake.properties.mag,
   };
};

/**
 * assignColor
 *
 * @param {number} val Value (in this case the magnitude) based on which color is assigned.
 * @return {string} Color depending on score.
 */
export const assignColor = (val) => {
   const { blue, green, yellowGreen, orange, red } = magnitudeColors;

   // cover invaid input
   if (isNaN(val) && !val) throw new Error('null or undefined');
   if (isNaN(val)) throw new Error('not a number');

   // handle valid cases
   return val > 3
      ? red
      : val > 2
      ? orange
      : val > 1
      ? yellowGreen
      : val > 0
      ? green
      : blue;
};
