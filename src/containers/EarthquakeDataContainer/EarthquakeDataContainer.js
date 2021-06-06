import style from './EarthquakeDataContainer.module.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import Globe from '../../components/Globe/Globe';
import NewEarthquakeAlert from '../../components/Data/NewEarthquakeAlert/NewEarthquakeAlert';
import Stats from '../../components/Data/Stats';
import Menu from '../../components/Data/Menu';
import List from '../../components/Data/List';

// helper functions
import {
   findMinMaxByProperty,
   assignColor,
} from '../../helpers/helperFunctions';
import { menu } from '../../helpers/config';

/**
 * EarthquakeDataContainer component receives data and maps it for WordCloud and Metadata props
 *
 * @param {string} title The title given to the globe and data wrapper.
 * @param {array} data Array of earthquakes.
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
   // const [currentQuake, setCurrentQuake] = useState({});

   console.log('data__', lastHour);
   useEffect(() => {
      /*
       * find earthquake with highest magnitude and
       * display its data as default
       */
      if (data.length) {
         const earthquakeMaxMag = data.find(
            (quake) =>
               findMinMaxByProperty(data, 'properties.mag', 'max') === quake.id
         );
         console.log(earthquakeMaxMag);
         setMaxMag(earthquakeMaxMag.properties.mag);
      }

      // map incoming data on globe data model in state
      const mappedData = data.map((quake) => {
         return {
            id: quake.id,
            // city: quake.properties.place,
            city: quake.properties.mag,
            color: assignColor(quake.properties.mag),
            coordinates: [
               quake.geometry.coordinates[1],
               quake.geometry.coordinates[2],
            ],
            // value: assignSize(quake.properties.mag),
            value: quake.properties.mag,
         };
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
            <Stats total={data.length} maxMag={maxMag} />
            <Menu menu={menu} handleClick={getParam} />
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
