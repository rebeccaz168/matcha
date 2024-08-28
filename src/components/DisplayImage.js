import React, { useState } from "react";

function DisplayImage() {
  const [imageSrc, setImageSrc] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Upload an Image of your Matcha</h1>
      <input type="file" name="myImage" onChange={onImageChange} />
      {imageSrc && <img src={imageSrc} alt="Uploaded Matcha Image" />}
    </div>
  );
}

export default DisplayImage;

