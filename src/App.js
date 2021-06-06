import './App.scss';
import React, { useEffect, useState } from 'react';

// components
import EarthquakeDataContainer from './containers/EarthquakeDataContainer/EarthquakeDataContainer';

// temporary data for testing
// import dataSet from './dataSet';

function App() {
   // const [reset, setReset] = useState([]);
   const [data, setData] = useState([]);
   const [param, setParam] = useState('all_day');

   // useEffect(() => {
   //    const clear = setInterval(myFn, 4000);
   // }, [reset]);

   useEffect(() => {
      (async () => {
         //  use short polling to get real-time data from API
         fetch(
            `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${param}.geojson`
         )
            .then((res) => res.json())
            .then((data) => setData(data.features));
      })();
   }, [param]);

   const getParam = (target) => {
      setParam(target);
   };

   return (
      <div className='App' title='app'>
         <EarthquakeDataContainer
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
