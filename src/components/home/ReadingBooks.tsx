/** @jsxImportSource @emotion/react */
"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { getCurrentReadingBooks } from "@/lib/currentReadingBooks";
import { readingBookAtom } from "@/store/readingBook";
import { useAtom } from "jotai";
import BookSection from "./bookSection";

export default function ReadingBooks() {
  const { data: session } = useSession();
  const [readingBooks, setReadingBooks] = useAtom(readingBookAtom);

  const refreshBooks = useCallback(async () => {
    try {
      const books = await getCurrentReadingBooks();
      setReadingBooks(books);
    } catch (error) {
      console.error("Error refreshing books:", error);
    }
  }, [setReadingBooks]);

  useEffect(() => {
    refreshBooks();
  }, [refreshBooks]);

  return (
    <>
      <div
        css={{
          margin: "5rem 0 4rem 2rem",
          fontWeight: 700,
        }}
      >
        <p css={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          {session?.user?.name}
          <span css={{ fontSize: "1.5rem" }}>님 반갑습니다!</span>
        </p>
        <p css={{ fontSize: "1.2rem", color: "#666" }}>
          현재 읽고 계신 책 {readingBooks.length}권이 있습니다
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
      <BookSection onRecordAdded={refreshBooks} />
    </>
  );
}
