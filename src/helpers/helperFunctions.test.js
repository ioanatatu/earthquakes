import {
   findMinMaxByProperty,
   mapWordMetadata,
   assignSize,
   assignColor,
} from '../helpers/helperFunctions';
import { wordColors } from './config';
import data from '../object.json';

const { green, red, grey } = wordColors;

/**
 * test findMinMaxByProperty
 */
describe('return value if a string', () => {
   it('should return the id as a string', () => {
      const id = findMinMaxByProperty(data.topics, 'sentimentScore', 'max');
      expect(id).toMatch('');
   });
});
/**
 * test mapWordMetadata
 */
test('invalid input for word object', () => {
   const nullOrUndefinedOrEmpty = () => mapWordMetadata();
   const testString = () => mapWordMetadata('asdasd');
   const testNumber = () => mapWordMetadata(10);
   const testArray = () => mapWordMetadata([]);

   expect(nullOrUndefinedOrEmpty).toThrowError(
      new Error('null, undefined or empty object')
   );
   expect(testString).toThrowError(new Error('not an object'));
   expect(testNumber).toThrowError(new Error('not an object'));
   expect(testArray).toThrowError(new Error('not an object'));
});

test('mapped word object structure', () => {
   const word = {
      id: '1751295897__Berlin',
      label: 'Berlin',
      volume: 165,
      type: 'topic',
      sentiment: {
         negative: 3,
         neutral: 133,
         positive: 29,
      },
      sentimentScore: 65,
      burst: 13,
      days: [
         {
            date: '2014-06-06T00:00:00.000+0000',
            volume: 22,
         },
         {
            date: '2014-06-04T00:00:00.000+0000',
            volume: 43,
         },
         {
            date: '2014-06-09T00:00:00.000+0000',
            volume: 0,
         },
         {
            date: '2014-06-07T00:00:00.000+0000',
            volume: 12,
         },
         {
            date: '2014-06-08T00:00:00.000+0000',
            volume: 11,
         },
         {
            date: '2014-06-03T00:00:00.000+0000',
            volume: 39,
         },
         {
            date: '2014-06-05T00:00:00.000+0000',
            volume: 38,
         },
      ],
      pageType: {
         blog: 17,
         facebook: 56,
         forum: 22,
         general: 5,
         image: 0,
         news: 26,
         review: 1,
         twitter: 35,
         video: 3,
      },
      queries: [
         {
            id: 1751295897,
            name: 'Berghain',
            volume: 165,
         },
      ],
   };
   expect(mapWordMetadata(word)).toHaveProperty('label');
   expect(mapWordMetadata(word)).toHaveProperty('volume');
   expect(mapWordMetadata(word)).toHaveProperty('sentiment');
});

/**
 * test assignSize
 */
test('invalid input for size', () => {
   // refactor these into one function that tests invalid input for positive numbers
   const nullOrUndefined = () => assignSize();
   const notNumber = () => assignSize('asdasd');
   const notPositive = () => assignSize(-1);

   expect(nullOrUndefined).toThrowError(new Error('null or undefined'));
   expect(notNumber).toThrowError(new Error('not a number'));
   expect(notPositive).toThrowError(new Error('not a positive number'));
});

test('correct size attribution', () => {
   // val > 10 && val <= 30;
   expect(assignSize(0)).toBe(12);
   expect(assignSize(10)).toBe(12);
   expect(assignSize(11)).toBe(16);
   expect(assignSize(29)).toBe(16);
   expect(assignSize(30)).toBe(16);
   // val > 30 && val <= 60;
   expect(assignSize(31)).toBe(20);
   expect(assignSize(59)).toBe(20);
   expect(assignSize(60)).toBe(20);
   // val > 60 && val <= 90;
   expect(assignSize(61)).toBe(24);
   expect(assignSize(89)).toBe(24);
   expect(assignSize(90)).toBe(24);
   // val > 90 && val <= 120;
   expect(assignSize(91)).toBe(28);
   expect(assignSize(119)).toBe(28);
   expect(assignSize(120)).toBe(28);
   // val > 120;
   expect(assignSize(121)).toBe(30);
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
