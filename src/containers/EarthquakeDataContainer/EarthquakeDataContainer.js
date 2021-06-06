import style from './EarthquakeDataContainer.module.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import Globe from '../../components/Globe/Globe';
import NewEarthquakeAlert from '../../components/Data/NewEarthquakeAlert/NewEarthquakeAlert';
import Stats from '../../components/Data/Stats/Stats';
import Menu from '../../components/Data/Menu/Menu';
import List from '../../components/Data/List/List';

// helper functions
import {
   findMaxMag,
   mapDataOnGlobeMarkers,
   assignColor,
} from '../../helpers/helperFunctions';
import { menu } from '../../helpers/config';

/**
 * EarthquakeDataContainer component receives array of earthquakes and maps them
 * on data models for other components
 *
 * @param {string} title The title given to the globe and data wrapper.
 * @param {array} data Array of earthquakes.
 * @param {array} lastHour Array of earthquakes in the last hour.
 * @param {function} getParam Function that passes the info of clicked button
 * to its parent component.
 */
const EarthquakeDataContainer = ({
   title: { title, subtitle },
   data,
   lastHour,
   getParam,
}) => {
   const [maxMag, setMaxMag] = useState(null);
   const [mappedData, setMappedData] = useState([]);
   const [location, setLocation] = useState('');
   const [time, setTime] = useState('');

   useEffect(() => {
      /*
       * find earthquake with highest magnitude and
       * display its data as default
       */
      if (data.length) {
         const earthquakeMaxMag = data.find(
            (quake) => findMaxMag(data) === quake.id
         );
         setMaxMag(earthquakeMaxMag.properties.mag);
      }

      // map incoming data on globe data model in state
      const mappedData = data.map((quake) => {
         const quakeObj = mapDataOnGlobeMarkers(quake, assignColor);
         quakeObj.color = assignColor(quake.properties.mag);

         return quakeObj;
      });

      setMappedData(mappedData);
   }, [data, setMaxMag]);

   useEffect(() => {
      if (lastHour.length) {
         setLocation(lastHour[0].properties.place);
         setTime(lastHour[0].properties.time);
      }
   }, [lastHour]);

   return (
      <div className={style.wrapper}>
         <div className={style.columnOne}>
            <h1 className={style.title}>{title}</h1>
            <h2 className={style.subtitle}>{subtitle}</h2>
            <Globe data={mappedData} />
         </div>
         <div className={style.columnTwo}>
            <NewEarthquakeAlert location={location} time={time} />
            <Menu menu={menu} handleClick={getParam} />
            <Stats total={data.length} maxMag={maxMag} />
            <List data={mappedData} />
         </div>
      </div>
   );
};

EarthquakeDataContainer.propTypes = {
   title: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
   }),
   data: PropTypes.array,
   lastHour: PropTypes.array,
   getParam: PropTypes.func,
};

export default EarthquakeDataContainer;
