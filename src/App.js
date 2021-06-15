import './App.scss';
import React, { useEffect, useState, createContext } from 'react';

// components
import EarthquakeDataContainer from './containers/EarthquakeDataContainer/EarthquakeDataContainer';

// temporary data for testing
import dataSet from './dataSet';

// config files
import { pollingInterval } from './helpers/config';

// react context
export const ParameterContext = createContext();

/**
 * App is the highest componenent in charge with making requests to the API.
 *
 * First useEffect() makes the first API request, once the component mounts, and
 * it uses setInterval() for polling data every 20 seconds.
 *
 * Second useEffect() runs when params is updated and makes an API request to
 * the resource specified by param
 *
 */
function App() {
   const [lastHour, setLastHour] = useState([]);
   const [data, setData] = useState([]);
   const [parameter, setParameter] = useState('all_day');

   useEffect(() => {
      // get data first time component mounts
      requestData('all_hour', setLastHour);

      //  use short polling to get real-time data from API
      setInterval(() => {
         requestData('all_hour', setLastHour);
      }, pollingInterval);
   }, []);

   useEffect(() => {
      requestData(parameter, setData);
   }, [parameter]);

   const getParameter = (parameter) => {
      setParameter(parameter);
   };

   return (
      <div className='App' title='app'>
         <ParameterContext.Provider value={getParameter}>
            <EarthquakeDataContainer
               lastHour={lastHour}
               data={data}
               title={{
                  title: 'Earthquakes Around the Globe',
                  subtitle: 'Live from USGS',
               }}
            />
         </ParameterContext.Provider>
      </div>
   );
}

export default App;

/**
 * helper function: make asynchronous call to the API
 *
 */
async function requestData(parameter, setReactState) {
   fetch(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${parameter}.geojson`
   )
      .then((res) => res.json())
      .then((res) => setReactState(res.features))
      .catch((err) => console.log(err));
}
