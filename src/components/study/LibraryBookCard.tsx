/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { UserBook } from "@/types/userBook";
import Image from "next/image";

interface LibraryBookCardProps {
  userBook: UserBook;
  isCurrentlyReading: boolean;
}

const cardContainer = (isCurrentlyReading: boolean) => css`
  background: rgba(255, 255, 255);
  border-radius: 16px;
  padding: ${isCurrentlyReading ? "1.5rem" : "1rem"};
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 100%;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const titleContainer = css`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #000;
`;

const contentContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;
`;

const imageContainer = css`
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 150px;
`;

const imageStyle = css`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const completedBookContainer = css`
  text-align: center;
  margin-top: 0.5rem;
`;

const completedBookTitle = css`
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.2rem;
  line-height: 1.3;
`;

const completedBookAuthor = css`
  font-size: 0.8rem;
  color: #000;
  margin-bottom: 0.5rem;
`;

const completedBadge = css`
  display: inline-flex;
  align-items: center;
  background: #6b4eff;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
`;

export default function LibraryBookCard({
  userBook,
  isCurrentlyReading,
}: LibraryBookCardProps) {
  return (
    <div css={cardContainer(isCurrentlyReading)}>
      {isCurrentlyReading && (
        <div css={titleContainer}>
          {userBook.book.title.length > 20
            ? userBook.book.title.slice(0, 20) + "..."
            : userBook.book.title}
        </div>
      )}

      <div css={contentContainer}>
        <div css={imageContainer}>
          <Image
            src={userBook.book.cover}
            alt={userBook.book.title}
            height={isCurrentlyReading ? 150 : 160}
            width={isCurrentlyReading ? 150 : 120}
            css={imageStyle}
            priority
          />
        </div>

        {!isCurrentlyReading && (
          <div css={completedBookContainer}>
            <div css={completedBookTitle}>
              {userBook.book.title.length > 15
                ? userBook.book.title.slice(0, 15) + "..."
                : userBook.book.title}
            </div>
            <div css={completedBookAuthor}>{userBook.book.author}</div>
            <div css={completedBadge}>✅ 완독</div>
          </div>
        )}
      </div>
    </div>
  );
}
