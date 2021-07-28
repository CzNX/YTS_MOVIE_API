import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { noPicture } from "../config/Config";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ cast }) => {
  const items = cast?.map((c) => (
    <div className="carouselItem">
      <div className="carousel_img">
        <img
          src={`${c.url_small_image ? c.url_small_image : noPicture}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noPicture;
          }}
          alt="err"
          className={`${cast.length <= 2 ? "carousel_img2" : "carousel_img"}`}
          onDragStart={handleDragStart}
        />
      </div>
      <b className="car_name">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  if (cast) {
    return (
      <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    );
  }
  return <div className="cast_info">Cast Not Available Right Now...</div>;
};

export default Carousel;
