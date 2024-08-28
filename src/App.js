import React, { useState } from 'react';
import { ColorExtractor } from 'react-color-extractor'; 
import WebcamCapture from './components/Webcam.js'; 
import DisplayImage from './components/DisplayImage.js';

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [colors, setColors] = useState([]);

  // Function to render color swatches
  const renderSwatches = () => {
    return colors
      .filter((color) => {
        // Convert the color to RGB
        const rgb = color.match(/\d+/g);
  
        // Check if it's a valid RGB color
        if (rgb && rgb.length === 3) {
          const [r, g, b] = rgb.map(Number);
  
          // Define the logic for green and yellow
          const isGreen = g > r && g > b;
          console.log("rgb", rgb);
          const isYellow = r > 200 && g > 200 && b < 100; // can change these thresholds
  
          // Return true if the color is either green or yellow
          return isGreen || isYellow;
        }
  
        return false; // If color format isn't recognized, exclude it
      })
      .map((color, id) => (
        <div
          key={id}
          style={{
            backgroundColor: color,
            width: 100,
            height: 100,
            margin: '5px',
          }}
        />
      ));
  };
  

  // Function to update the colors state
  const getColors = (extractedColors) => {
    setColors([...colors, ...extractedColors]);
  };

  console.log("image source", imageSrc);

  return (
    <div>
      <h1>Matcha Shade Finder</h1>
      <DisplayImage/>
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
