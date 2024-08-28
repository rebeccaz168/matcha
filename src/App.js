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
  console.log("colors", colors)

  return (
    <div>
      <h1>Matcha Shade Finder</h1>
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
