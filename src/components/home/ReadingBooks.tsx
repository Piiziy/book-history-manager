/** @jsxImportSource @emotion/react */

import { useSession } from "next-auth/react";
import { use, useState, useCallback } from "react";
import { useReadingBooksPromise } from "@/components/providers/ReadingBooksProvider";
import {
  getCurrentReadingBooksAction,
  revalidateCurrentReadingBooks,
} from "@/lib/actions/fetchBookHistory";
import BookSection from "./bookSection";

export default function ReadingBooks() {
  const { data: session } = useSession();
  const readingBooksPromise = useReadingBooksPromise();

  // 초기 데이터를 상태로 관리
  const initialReadingBooks = use(readingBooksPromise);
  const [readingBooks, setReadingBooks] = useState(initialReadingBooks);

  const refreshBooks = useCallback(async () => {
    try {
      // 캐시 재검증 먼저 실행
      await revalidateCurrentReadingBooks();

      // 새로운 데이터 가져오기
      const updatedBooks = await getCurrentReadingBooksAction();
      setReadingBooks(updatedBooks);
    } catch (error) {
      console.error("Error refreshing books:", error);
    }
  }, []);

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
          현재 읽고 계신 책 {readingBooks?.length || 0}권이 있습니다
        </p>
      </div>

      <BookSection readingBooks={readingBooks} onRecordAdded={refreshBooks} />
    </>
  );
}
