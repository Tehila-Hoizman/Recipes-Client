import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "../../../store/addRecipeSlice";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.addRecipe.images);


  const handleImageChange = (e) => {
    dispatch(setImages([
      ...images,
      ...Array.from(e.target.files).map((file) => URL.createObjectURL(file)),
    ]));
    console.log(images);
  };

  const handleRemoveImage = (index) => {
    dispatch(setImages(images.filter((_, i) => i !== index)));
  };

  return (
    <div>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Upload Images:
      </label>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <div>
        {images.map((image, index) => {
              return(<div
          className="image-container"
            key={index}
            style={{
              position: "relative",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            <img src={image} alt={`Upload_${index}`} height="100" width="100" />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                background: "#76110a",
                color: "white",
                borderRadius:" 50%",
                padding:" 3px 6px",
                fontSize: "7px",
                cursor: "pointer",
                zIndex: 1,
                border: "none",
              }}
            >
              X
            </button>
          </div>)
})}
      </div>
    </div>
  );
};

export default ImageUpload;
