import React, { useState } from 'react';
import { ColorExtractor } from 'react-color-extractor'; 
import WebcamCapture from './components/Webcam.js'; 
import DisplayImage from './components/DisplayImage.js';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [colors, setColors] = useState([]);
  const [savedColors, setSavedColors] = useState([]); 

  // Function to handle saving a color swatch
  const handleSaveSwatch = (id) => {
    console.log("here inside save color");
    if (!savedColors.includes(id)){
      setSavedColors([...savedColors, id]);
    }else{
      // it's already included so deselect or remove it 
    setSavedColors(savedColors.filter(colorId => colorId !== id));
    }
    console.log("colors saved", savedColors);
  };
  

  // Function to render color swatches
  const renderSwatches = () => {
    return colors
      .filter((color) => {
        // Convert the color to RGB
        const rgb = color.match(/\d+/g);
        console.log("rgb", rgb);
        // Check if it's a valid RGB color
        if (rgb) {
          const [r, g, b] = rgb.map(Number);
  
          // Define the logic for green and yellow
          const isGreen = g > r || g > b;
          console.log("rgb", rgb);
          const isYellow = r > 10 && g > 10  && b < 10; // allows for more grey ish hues
          const isBlack = r < 20 && g < 20 && b < 20; // Close to black

          // Return true if the color is either green or yellow and not black
          return (isGreen || isYellow) && !isBlack;
  
        }
  
        return false; // If color format isn't recognized, exclude it
      })
      .map((color, id) => (
        <div
          key={id}
          onClick={()=>handleSaveSwatch(id)} 
          style={{
            backgroundColor: color,
            width: 100,
            height: 100,
            margin: '5px',
            cursor: 'pointer', // Add pointer cursor to indicate it's clickable
            border: savedColors.includes(id) ? '2px solid red' : 'none', // Add red border if saved
          }}
        />
      ));
  };
  

  // Function to update the colors state
  const getColors = (extractedColors) => {
    setColors([...colors, ...extractedColors]);
  };

  console.log("image source", imageSrc);
  console.log("colors", colors)
  const apiKey = process.env.REACT_APP_MAPS_API_KEY;
  console.log("api key" , apiKey);
  console.log("test",process.env.REACT_APP_TEST_VAR );

  return (
    <div>
      <h1>Matcha Shade Finder</h1>
      <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
      <div style={{ width: '100%', height: '500px' }}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: 40.761885049185, lng:  -73.9575577126986 }}
          onCameraChanged={(ev) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
        />
      </div>
      </APIProvider>
      <DisplayImage setImgSrc={setImageSrc}/>
      <WebcamCapture onCapture={setImageSrc} />
      {/* Assuming ColorExtractor expects children to extract colors from */}
      { imageSrc && (
      <ColorExtractor getColors={getColors}>
        {imageSrc && <img src={imageSrc} alt="Captured" />}
      </ColorExtractor>
      )}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          flexWrap: 'wrap', // Allows colors to wrap to the next line
          justifyContent: 'center',
        }}
      >
        {renderSwatches()}
      </div>
    </div>
  );
}

export default App;
