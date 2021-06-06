import './App.scss';
import React, { useEffect, useState } from 'react';

// components
import EarthquakeDataContainer from './containers/EarthquakeDataContainer/EarthquakeDataContainer';

// temporary data for testing
import dataSet from './dataSet';

function App() {
   const [lastHour, setLastHour] = useState([]);
   const [data, setData] = useState([]);
   const [param, setParam] = useState('all_day');

   useEffect(() => {
      // get data firts time component mounts
      (async () => {
         fetch(
            `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`
         )
            .then((res) => res.json())
            .then((res) => setLastHour(res.features));
      })();

      //  use short polling to get real-time data from API
      setInterval(() => {
         (async () => {
            fetch(
               `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`
            )
               .then((res) => res.json())
               .then((res) => setLastHour(res.features));
         })();
      }, 1000 * 60);
   }, []);

   useEffect(() => {
      (async () => {
         fetch(
            `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${param}.geojson`
         )
            .then((res) => res.json())
            .then((res) => setData(res.features));
      })();
   }, [param]);

   const getParam = (target) => {
      setParam(target);
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
