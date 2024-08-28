import React from "react";

function DisplayImage({setImgSrc}) {
  // const [UploadImageSrc, setUploadImageSrc] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // setUploadImageSrc(e.target.result);
        setImgSrc(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Upload an Image of your Matcha</h1>
      <input type="file" name="myImage" onChange={onImageChange} />
      {/* {UploadImageSrc && <img src={UploadImageSrc} alt="Uploaded Matcha Image" />} */}
    </div>
  );
}

export default DisplayImage;

