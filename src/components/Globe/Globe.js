import React from 'react';
import PropTypes from 'prop-types';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import ReactGlobe from 'react-globe';

/**
 * Globe component creates configuration for the ReactGlobe
 *
 * @param {array} data Array with earthquakes to be mapped on globe.
 */
const Globe = ({ data }) => {
   const options = {
      cameraRotateSpeed: 0.5,
      focusAnimationDuration: 2000,
      markerTooltipRenderer: (marker) =>
         `LOCATION: ${marker.city} \n MAGNITUDE: ${marker.value}`,
      globeBackgroundTexture: '../../bcg.png',
      ambientLightIntensity: 1.05,
      globeGlowPower: 5,
      globeGlowRadiusScale: 0.2,
      pointLightPositionRadiusScales: [-1, 1.5, -2.5],
   };

   return (
      <ReactGlobe
         height='84vh'
         width='84vh'
         markers={data}
         options={options}
         globeBackgroundTexture={options.globeBackgroundTexture}
      />
   );
};

Globe.propTypes = {
   words: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
         weight: PropTypes.number.isRequired,
         color: PropTypes.string.isRequired,
      })
   ),
   handleClickedWord: PropTypes.func,
};

export default Globe;
