import React from 'react';
import PropTypes from 'prop-types';

import ReactGlobe from 'react-globe';

/**
 * Globe component creates configuration for the ReactGlobe component
 *
 * @param {array} data Array with earthquakes to be mapped.
 */
const Globe = ({ data }) => {
   const options = {
      // ambientLightColor: '#a0a6e7',
      ambientLightColor: '#6ea6ff',
      cameraRotateSpeed: 0.5,
      focusAnimationDuration: 2000,
      focusEasingFunction: ['Linear', 'None'],
      pointLightColor: '#ede8c8',
      pointLightIntensity: 3.5,
      markerTooltipRenderer: (marker) => `${marker.city} (${marker.value})`,
      globeBackgroundTexture:
         'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/background.png',
      globeCloudsTexture:
         'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/clouds.png',
      globeTexture:
         'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg',
      ambientLightIntensity: 3,
      cameraAutoRotateSpeed: 0.1,
      globeCloudsOpacity: 0.1,
      globeGlowCoefficient: 0.1,
      globeGlowColor: 'white',
      globeGlowPower: 5,
      globeGlowRadiusScale: 0.2,
      pointLightPositionRadiusScales: [-1, 1.5, -2.5],
   };

   return (
      <ReactGlobe
         height='500px'
         width='500px'
         options={options}
         globeBackgroundTexture={options.globeBackgroundTexture}
         globeCloudsTexture={options.globeCloudsTexture}
         globeTexture={options.globeTexture}
         markers={data}
         // onClickMarker={(marker, markerObject, event) =>
         //    console.log(marker, markerObject, event)
         // }
         // onMouseOverMarker={(marker, markerObject, event) =>
         //    console.log(marker, markerObject, event)
         // }
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
