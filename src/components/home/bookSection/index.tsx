/** @jsxImportSource @emotion/react */
"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { readingBookAtom } from "@/store/readingBook";
import { useAtom } from "jotai";
import ReadingBookInfo from "./readingBookInfo";

export default function BookSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [readingBooks] = useAtom(readingBookAtom);

  const settings = {
    speed: 500,
    cssEase: "ease-in-out",
    arrows: false,
    dots: true,
    swipeToSlide: true,
    waitForAnimate: false,
    touchThreshold: 10,
    draggable: true,
    swipe: true,
    touchMove: true,
    useTransform: true,
    useCSS: true,
    infinite: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    dotsClass: "slick-dots custom-dots",
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
      <div
        css={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: currentSlide === i ? "#6B4EFF" : "#D1D1D1",
          transition: "all 0.3s ease",
        }}
      />
    ),
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        fontWeight: 700,
        padding: "0 1rem",
        width: "100%",
        ".slick-slider": {
          width: "100%",
          overflow: "hidden",
        },
        ".slick-list": {
          margin: "0 -1rem",
          overflow: "visible",
        },
        ".slick-track": {
          display: "flex",
          gap: "2rem",
        },
        ".slick-slide": {
          "> div": {
            height: "100%",
          },
        },
        ".slick-dots": {
          bottom: "-40px",
          li: {
            margin: "0 8px",
          },
        },
      }}
    >
      <Slider {...settings}>
        {readingBooks.map((userBook, idx) => {
          return <ReadingBookInfo key={idx} userBook={userBook} />;
        })}
      </Slider>
    </div>
  );
}
