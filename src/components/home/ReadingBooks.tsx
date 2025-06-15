/** @jsxImportSource @emotion/react */

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

      <BookSection onRecordAdded={refreshBooks} />
    </>
  );
}
