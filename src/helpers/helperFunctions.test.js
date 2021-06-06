import {
   findMaxMag,
   mapDataOnGlobeMarkers,
   assignColor,
} from '../helpers/helperFunctions';
import { magnitudeColors } from './config';
import data from '../object.json';

const { blue, green, yellowGreen, orange, red } = magnitudeColors;

/**
 * test findMaxMag
 */
describe('return value if a string', () => {
   it('should return the id as a string', () => {
      const id = findMaxMag(data);
      expect(id).toMatch('');
   });
});
/**
 * test mapDataOnGlobeMarkers
 */
test('invalid input for word object', () => {
   const nullOrUndefinedOrEmpty = () => mapDataOnGlobeMarkers();
   const testString = () => mapDataOnGlobeMarkers('asdasd');
   const testNumber = () => mapDataOnGlobeMarkers(10);
   const testArray = () => mapDataOnGlobeMarkers([]);

   expect(nullOrUndefinedOrEmpty).toThrowError(
      new Error('null, undefined or empty object')
   );
   expect(testString).toThrowError(new Error('not an object'));
   expect(testNumber).toThrowError(new Error('not an object'));
   expect(testArray).toThrowError(new Error('not an object'));
});

test('mapped word object structure', () => {
   const quake = {
      type: 'Feature',
      properties: {
         mag: 2.00999999,
         place: '8 km E of Pāhala, Hawaii',
         time: 1622900393410,
         updated: 1622900588030,
         tz: null,
         url: 'https://earthquake.usgs.gov/earthquakes/eventpage/hv72506707',
         detail:
            'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/hv72506707.geojson',
         felt: null,
         cdi: null,
         mmi: null,
         alert: null,
         status: 'automatic',
         tsunami: 0,
         sig: 62,
         net: 'hv',
         code: '72506707',
         ids: ',hv72506707,',
         sources: ',hv,',
         types: ',origin,phase-data,',
         nst: 49,
         dmin: null,
         rms: 0.119999997,
         gap: 151,
         magType: 'md',
         type: 'earthquake',
         title: 'M 2.0 - 8 km E of Pāhala, Hawaii',
      },
      geometry: {
         type: 'Point',
         coordinates: [-155.399505615234, 19.2158336639404, 32.439998626709],
      },
      id: 'hv72506707',
   };
   expect(mapDataOnGlobeMarkers(quake)).toHaveProperty('label');
   expect(mapDataOnGlobeMarkers(quake)).toHaveProperty('volume');
   expect(mapDataOnGlobeMarkers(quake)).toHaveProperty('sentiment');
});

/**
 * test assignColor
 */
test('invalid input for color', () => {
   const nullOrUndefined = () => assignColor();
   const notNumber = () => assignColor('asdasd');
   const notPositive = () => assignColor(-1);

   expect(nullOrUndefined).toThrowError(new Error('null or undefined'));
   expect(notNumber).toThrowError(new Error('not a number'));
   expect(notPositive).toThrowError(new Error('not a positive number'));
});

test('correct color attribution', () => {
   expect(assignColor(0)).toBe(red);
   expect(assignColor(39)).toBe(red);
   expect(assignColor(40)).toBe(grey);
   expect(assignColor(41)).toBe(grey);
   expect(assignColor(59)).toBe(grey);
   expect(assignColor(60)).toBe(grey);
   expect(assignColor(61)).toBe(green);
   expect(assignColor(2000)).toBe(green);
});
