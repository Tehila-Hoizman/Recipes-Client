import React from "react";
import ImageGallery from "react-image-gallery";
import "../../styles/ImageGallery.css"
const ImagesGallery = (props) => {
  const images = props.images.map((image) => {
    return {
      original: image,
      thumbnail: image,
    };
  });
  return ( 
    <ImageGallery showNav={false} showFullscreenButton={false} autoPlay={true} showPlayButton={false} items={images} />
   );
}
 
export default ImagesGallery;
