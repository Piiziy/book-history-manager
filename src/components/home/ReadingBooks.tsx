/** @jsxImportSource @emotion/react */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BookItem } from "@/lib/fetchBooks";
import { getCurrentReadingBooks } from "@/lib/currentReadingBooks";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function ReadingBooks() {
  const { data: session } = useSession();
  const [readingBooks, setReadingBooks] = useState<BookItem[]>([]);
  console.log(readingBooks);
  const settings = {
    speed: 300,
    cssEase: "linear",
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
  };

  useEffect(() => {
    getCurrentReadingBooks().then((books) => setReadingBooks(books));
  }, []);

  return (
    <>
      <div
        css={{
          margin: "5rem 0 4rem 2rem",
          fontWeight: 700,
        }}
      >
        <p css={{ fontSize: "2rem", fontWeight: 700 }}>
          {session?.user?.name}
          <span css={{ fontSize: "1.5rem" }}>님 반갑습니다!</span>
        </p>
      </div>

      <div
        css={{
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "max(100vw, calc(100vh - 100px))",
          height: "max(100vw, calc(100vh - 100px))",
          background: "linear-gradient(to bottom, #E6E6FA 0%, #FFE4E1 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at bottom right, #000 max(70vw, calc(100vh - 100px)*0.7), transparent max(100vw, calc(100vh - 100px)))",
          WebkitMaskMode: "alpha",
          borderTopLeftRadius: "50%",
          zIndex: -1,
        }}
      />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          fontWeight: 700,
          padding: "0 1rem",
        }}
      >
        <Slider {...settings}>
          {readingBooks.map((book, idx) => (
            <div key={idx}>
              <p css={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {book.title.length > 30
                  ? book.title.slice(0, 30) + "..."
                  : book.title}
              </p>

              <Image
                src={book.cover}
                alt={book.title}
                height={200}
                width={200}
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
