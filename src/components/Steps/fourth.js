import { Box, Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setImage, setImages } from "../../store/addRecipeSlice";
import React, { useEffect } from "react";
import "../../styles/AddRecipeForm.css";
import "../../styles/Fourth.css";
import { useState } from "react";
import { Grid, Input } from "@material-ui/core";

const Fourth = (props) => {
  const handleNext = props.handleNext;
  const handleBack = props.handleBack;
  const dispatch = useDispatch();

  const image = useSelector((state) => state.addRecipe.imageUrl);
  // const imageUrl = useSelector((state) => state.addRecipe.imageUrl);
  const [file, setFile] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);

//   useEffect(() => {
//     if (image) {
//       const base64String = image; // replace with your base64 string
//       const filename = imageUrl;
// debugger
//       fetch(base64String)
//         .then((res) => res.blob())
//         .then((blob) => {
//           const file = new File([blob], filename, { type: "image/jpeg" });
//           console.log(file);
//           dispatch(setImage(file));
//         });
//       setSelectedImage(image);
//     }
//   }, [image, imageUrl]);
useEffect(() => {
  setSelectedImage(image);
}, []);
  let selectedFile = image;
  const handleImageUpload = (e) => {
    selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("Image", selectedFile);
    setFile(formData);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(selectedFile);
    console.log("selectedFile", selectedFile);
    console.log("selectedImage", selectedImage);
    console.log("file", file);
    dispatch(setImage(selectedFile));
  };

  return (
    <Container>
      <Grid item sx={{ height: "50px" }} xs={12}>
        <label htmlFor="image-upload"> תמונה של המתכון</label>
        <Input
          type="file"
          onChange={handleImageUpload}
          accept="image/*" // Specify accepted file types (images in this case)
          sx={{
            display: "none",
            height: "100px",
            bgcolor: "transparent",
          }} // Hide the default input style
          id="image-upload" // Set a unique id for the input
          name="image-upload" // Set a unique id for the input
        />

        {selectedImage && <img className="display-image" src={selectedImage} />}
      </Grid>
      <Box className="box-btns">
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
            קודם
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button type="submit" onClick={handleNext} className="btn-next">
            הבא
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Fourth;
