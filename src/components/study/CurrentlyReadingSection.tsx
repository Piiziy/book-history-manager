/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserBook } from "@/types/userBook";
import LibraryBookCard from "./LibraryBookCard";
import { BookOpen } from "lucide-react";

const emptyStateText = css`
  margin: 5rem 0;
  text-align: center;
  opacity: 0.8;
  color: #000;
`;

const sectionContainer = css`
  margin: 2rem 2rem 0 2rem;
`;

const sectionTitle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
`;

const sliderContainer = css`
  overflow: visible;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-weight: 700;
  padding: 0 1rem;
  width: 100%;
  position: relative;

  .slick-slider {
    width: 100%;
    overflow: hidden;
  }

  .slick-list {
    margin: 0 -1rem;
    overflow: visible;
  }

  .slick-track {
    display: flex;
    gap: 2rem;
  }

  .slick-slide > div {
    height: 100%;
  }
`;

const indicatorContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 10px 0;
`;

const indicatorButton = (isActive: boolean) => css`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${isActive ? "#6B4EFF" : "#D1D1D1"};
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: ${isActive ? "#5A3FD9" : "#B0B0B0"};
  },
}}
`;

interface CurrentlyReadingSectionProps {
  readingBooks: UserBook[];
}

export default function CurrentlyReadingSection({
  readingBooks,
}: CurrentlyReadingSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const BookOpenIcon = <BookOpen size={40} strokeWidth={1.5} color="#4c4f6d" />;

  if (readingBooks.length === 0) {
    return (
      <div css={sectionContainer}>
        <div css={sectionTitle}>
          {BookOpenIcon}
          현재 읽고 있는 책
        </div>
        <p css={emptyStateText}>현재 읽고 있는 책이 없습니다.</p>
      </div>
    );
  }

  return (
    <div css={sectionContainer}>
      <div css={sectionTitle}>
        {BookOpenIcon}
        현재 읽고 있는 책
      </div>

      <div css={sliderContainer}>
        <Slider ref={sliderRef} {...settings}>
          {readingBooks.map((userBook, idx) => (
            <div key={idx}>
              <LibraryBookCard userBook={userBook} isCurrentlyReading />
            </div>
          ))}
        </Slider>
        <div css={indicatorContainer}>
          {readingBooks.map((_, index) => (
            <button
              key={index}
              css={indicatorButton(currentSlide === index)}
              onClick={() => {
                sliderRef.current?.slickGoTo(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
