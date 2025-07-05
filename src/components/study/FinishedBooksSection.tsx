/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserBook } from "@/types/userBook";
import LibraryBookCard from "./LibraryBookCard";
import { LibraryBig } from "lucide-react";

const emptyStateText = css`
  margin: 5rem 0;
  text-align: center;
  opacity: 0.8;
  color: #000;
`;

const sectionContainer = css`
  margin: 0rem 2rem 2rem 2rem;
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
    margin: 0 -0.5rem;
    overflow: visible;
  }

  .slick-track {
    display: flex;
    gap: 1rem;
  }

  .slick-slide > div {
    height: 100%;
    padding: 0 0.5rem;
  }
`;

const LibraryBigIcon = (
  <LibraryBig size={40} strokeWidth={1.5} color="#4c4f6d" />
);

interface FinishedBooksSectionProps {
  finishedBooks: UserBook[];
}

export default function FinishedBooksSection({
  finishedBooks,
}: FinishedBooksSectionProps) {
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
    slidesToShow: 2.2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (finishedBooks.length === 0) {
    return (
      <div css={sectionContainer}>
        <div css={sectionTitle}>
          {LibraryBigIcon}
          읽은 책
        </div>
        <p css={emptyStateText}>아직 완독한 책이 없습니다.</p>
      </div>
    );
  }

  return (
    <div css={sectionContainer}>
      <div css={sectionTitle}>
        {LibraryBigIcon}
        읽은 책
      </div>

      <div css={sliderContainer}>
        <Slider ref={sliderRef} {...settings}>
          {finishedBooks.map((userBook, idx) => (
            <div key={idx}>
              <LibraryBookCard userBook={userBook} isCurrentlyReading={false} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
