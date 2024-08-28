import React, { useState } from 'react';
import WebcamCapture from './Webcam';
// import ColorFinder from  './Colorfinder'


function App() {
  const [imageSrc, setImageSrc] = useState(null);

    return (
      <div>
        <h1>Matcha Shade Finder</h1>
        <WebcamCapture onCapture={setImageSrc} />
        {/* {imageSrc && <ColorFinder imageSrc={imageSrc} />} */}
      </div>
    );

}

export default App;
