import style from './NewEarthquakeAlert.module.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GrNotification } from 'react-icons/gr';

/**
 * NewEarthquakeAlert component receives the lastest eartquake
 * location and time in unix format
 *
 * @param {string} location Location of the latest earthquake.
 * @param {number} time The time of the latest earthquake.
 */
const NewEarthquakeAlert = ({ location, time }) => {
   const [ring, setRing] = useState(false);

   useEffect(() => {
      setRing(true);

      // set ring to false after 2.5s, so that it will be triggered again
      // upon new incoming data
      setTimeout(() => {
         setRing(false);
      }, 2500);
   }, [location]);

   return (
      <div className={style.card}>
         <span className={style.bellContainer}>
            <GrNotification className={ring ? style.bell : null} />
         </span>
         <span className={style.info}>
            <h3>New Earthquake Alert</h3>
            <p className={style.location}>{location}</p>
            <p className={style.time}>{Date(time).split('(')[0]}</p>
         </span>
      </div>
   );
};

NewEarthquakeAlert.propTypes = {
   location: PropTypes.string,
   time: PropTypes.number,
};

export default NewEarthquakeAlert;
