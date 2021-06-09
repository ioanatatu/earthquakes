import './App.scss';
import React, { useEffect, useState } from 'react';

// components
import EarthquakeDataContainer from './containers/EarthquakeDataContainer/EarthquakeDataContainer';

// temporary data for testing
import dataSet from './dataSet';

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
   const [param, setParam] = useState('all_day');

   useEffect(() => {
      // get data first time component mounts
      requestData('all_hour', setLastHour);

      //  use short polling to get real-time data from API
      setInterval(() => {
         requestData('all_hour', setLastHour);
      }, 1000 * 20);
   }, []);

   useEffect(() => {
      requestData(param, setData);
   }, [param]);

   const getParam = (parameter) => {
      setParam(parameter);
   };

   return (
      <div className='App' title='app'>
         <EarthquakeDataContainer
            lastHour={lastHour}
            data={data}
            title={{
               title: 'Earthquakes Around the Globe',
               subtitle: 'Live from USGS',
            }}
            getParam={getParam}
         />
      </div>
   );
}

export default App;

/**
 * helper function: make asynchronous call to the API
 *
 */
async function requestData(param, setReactState) {
   fetch(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${param}.geojson`
   )
      .then((res) => res.json())
      .then((res) => setReactState(res.features))
      .catch((err) => console.log(err));
}
