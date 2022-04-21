import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { map } from "lodash";
import FeedMovie from "../FeedMovie/FeedMovie";
import "./MyCarousel.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const MyCarousel = ({ items, openMovie, setIsMoving }) => {
  return (
    <Carousel
      className="carousel"
      draggable={true}
      showDots={false}
      responsive={responsive}
      keyBoardControl={true}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item"
      beforeChange={() => setIsMoving(true)}
      afterChange={() => setIsMoving(false)}
      shouldResetAutoplay={false}
    >
      {map(items, (movie) => (
        <FeedMovie key={movie.id} movie={movie} openMovie={openMovie} />
      ))}
    </Carousel>
  );
};

export default MyCarousel;
