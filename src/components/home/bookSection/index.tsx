/** @jsxImportSource @emotion/react */

import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { readingBookAtom } from "@/store/readingBook";
import { useAtom } from "jotai";
import BookInfo from "./BookInfo";
import BookHistoryGraph from "./BookHistoryGraph";
import AddRecordButton from "./AddRecordButton";

interface BookSectionProps {
  onRecordAdded: () => void;
}

export default function BookSection({ onRecordAdded }: BookSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [readingBooks] = useAtom(readingBookAtom);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    speed: 500,
    cssEase: "ease-in-out",
    arrows: false,
    dots: false,
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
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      css={{
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        fontWeight: 700,
        padding: "0 1rem",
        width: "100%",
        position: "relative",
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
        ".slick-dots": {},
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
          padding: "10px 0",
        }}
      >
        {readingBooks.map((_, index) => (
          <button
            key={index}
            css={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: currentSlide === index ? "#6B4EFF" : "#D1D1D1",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: currentSlide === index ? "#5A3FD9" : "#B0B0B0",
              },
            }}
            onClick={() => {
              sliderRef.current?.slickGoTo(index);
            }}
          />
        ))}
      </div>

      <Slider ref={sliderRef} {...settings}>
        {readingBooks.map((userBook, idx) => {
          return (
            <div key={idx}>
              <BookInfo userBook={userBook} />
              <AddRecordButton
                userBook={userBook}
                onRecordAdded={onRecordAdded}
              />
              <BookHistoryGraph userBook={userBook} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
