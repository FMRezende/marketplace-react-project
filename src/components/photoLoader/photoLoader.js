import React, { useEffect, useState } from 'react';
import uploadPicture from "../../assets/uploadPicture/uploadPicture.svg";
//import deletePicture from "../../assets/vector.svg";
import "./photoLoader.css";
const PhotoLoader = ({ productId }) => {
  const [photoArray, setPhotoArray] = useState([]);
  console.log(photoArray)
  const MAX_ALLOWED = 6;
  const photosAllowed = MAX_ALLOWED - photoArray.length;
  const content = [];
  console.log(content)
  const handleImageUpload = (e) => {
    debugger;
    console.log(e.target.files[0])
    let form_data = new FormData(); // https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/FormData
    form_data.append("photo_product_id",productId);
    form_data.append("photo", e.target.files[0]);
    form_data.append("created", new Date());
    form_data.append("updated", new Date());
    const options = {
      method: "POST",
      body: form_data,
    };
    fetch(`http://localhost:5000/api/photos/${productId}/photos`, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((response) => {
        setPhotoArray(...photoArray, response)
      })
      .catch((error) => {
        console.log("Error when retrieving images:", error);
      });
  };
for (var i = 0; i < photosAllowed; i++) {
    content.push(
      <div className="photoloader__container">
        <form
          id="photo"
          encType="multipart/form-data"
          className="form__container_of_photoloader"
          onSubmit={(e) => {
            debugger;
            e.preventDefault();
          }}
        >
    <label for="photos-input">
        <img src={uploadPicture} alt ="" />
    </label>
        <input id="photos-input" name="photos" type="file" onChange={handleImageUpload} />
        </form>
      </div>
    );
  }
  return (
    <>
      {photoArray &&
        photoArray.map((photo) => {
          const src = `data:${photo.mim};base64,${photo.image}`;
          return (
            <div className="photoloader__photouploaded__container">
              <img
                src={src}
                alt="uploaded_image"
                className="photoloader__photouploaded" />
            </div>
          );
        })}
      {content}
    </>
  );
};
export default PhotoLoader;