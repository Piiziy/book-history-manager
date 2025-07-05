/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { use } from "react";
import { useStudyBooksPromises } from "@/components/providers/StudyBooksProvider";
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
  const { readingBooksPromise, finishedBooksPromise } = useStudyBooksPromises();

  // use hook으로 Promise들 resolve
  const readingBooks = use(readingBooksPromise);
  const finishedBooks = use(finishedBooksPromise);

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

      <CurrentlyReadingSection readingBooks={readingBooks} />
      <FinishedBooksSection finishedBooks={finishedBooks} />
    </div>
  );
}
