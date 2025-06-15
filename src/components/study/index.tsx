/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { readingBookAtom } from "@/store/readingBook";
import { finishedBooksAtom } from "@/store/finishedBooks";
import { getCurrentReadingBooks } from "@/lib/currentReadingBooks";
import { getFinishedBooks } from "@/lib/fetchFinishedBooks";
import CurrentlyReadingSection from "./CurrentlyReadingSection";
import FinishedBooksSection from "./FinishedBooksSection";

const containerStyle = css`
  min-height: 100vh;
`;

const headerStyle = css`
  margin: 5rem 0 4rem 2rem;
  font-weight: 700;
`;

const titleStyle = css`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const subtitleStyle = css`
  font-size: 1.2rem;
  opacity: 0.9;
`;

export default function Study() {
  const [readingBooks, setReadingBooks] = useAtom(readingBookAtom);
  const [finishedBooks, setFinishedBooks] = useAtom(finishedBooksAtom);

  const LoopUpBooks = useCallback(async () => {
    try {
      const [currentBooks, completedBooks] = await Promise.all([
        getCurrentReadingBooks(),
        getFinishedBooks(),
      ]);
      setReadingBooks(currentBooks);
      setFinishedBooks(completedBooks);
    } catch (error) {
      console.error("Error refreshing books:", error);
    }
  }, [setReadingBooks, setFinishedBooks]);

  useEffect(() => {
    LoopUpBooks();
  }, [LoopUpBooks]);

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <p css={titleStyle}>나의 서재</p>
        <p css={subtitleStyle}>
          현재 읽고 있는 책{" "}
          <span css={{ color: "#3b82f6", fontWeight: "600" }}>
            {readingBooks.length}
          </span>
          권 • 읽은 책{" "}
          <span css={{ color: "#10b981", fontWeight: "600" }}>
            {finishedBooks.length}
          </span>
          권
        </p>
      </div>

      <CurrentlyReadingSection />
      <FinishedBooksSection />
    </div>
  );
}
