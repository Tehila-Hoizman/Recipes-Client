import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import "../styles/imageCarousel.css";
const ImageCaousel = () => {
  const recipies = useSelector((state) => state.recipies.recipies);
  let recipe = recipies[8];
  useEffect(() => {
    console.log("recipe", recipe);
  }
    , [recipe]);
  return (
    <Carousel autoPlay>
      {recipe.images.length != 0 &&
        recipe.images.map((img,i) => {
          return (
            <div key={i}>
              <img src={img} />
              <p className="legend">Legend 1</p>
            </div>
          );
        })}
    </Carousel>
  );
};
export default ImageCaousel;
