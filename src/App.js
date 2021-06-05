import './App.css';
import React, { useEffect } from 'react';
import ReactGlobe from 'react-globe';

function App() {
   useEffect(() => {
      (async () => {
         //  use short polling to get real-time data from API
         fetch(
            `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`
         )
            .then((res) => res.json())
            .then((data) => console.log(data));
      })();
   }, []);
   // simple and extensive options to configure globe
   const options = {
      ambientLightColor: '#5d6191',
      cameraRotateSpeed: 0.5,
      focusAnimationDuration: 2000,
      focusEasingFunction: ['Linear', 'None'],
      pointLightColor: '#ede8c8',
      pointLightIntensity: 3,
      markerTooltipRenderer: (marker) => `${marker.city} (${marker.value})`,
      globeBackgroundTexture:
         'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/background.png',
      globeCloudsTexture:
         'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/clouds.png',
      globeTexture:
         'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg',
      ambientLightIntensity: 2.5,
      cameraAutoRotateSpeed: 0.01,
      enableCameraZoom: false,
      enableDefocus: false,
      globeCloudsOpacity: 0.1,
      globeGlowCoefficient: 0.1,
      globeGlowColor: 'white',
      globeGlowPower: 5,
      globeGlowRadiusScale: 0.2,
      pointLightPositionRadiusScales: [-1, 1.5, -2.5],
   };

   return (
      <ReactGlobe
         height='100vh'
         width='100vw'
         options={options}
         globeBackgroundTexture={options.globeBackgroundTexture}
         globeCloudsTexture={options.globeCloudsTexture}
         globeTexture={options.globeTexture}
      />
   );
}

export default App;
