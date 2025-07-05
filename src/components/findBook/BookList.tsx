/** @jsxImportSource @emotion/react */

import { AladinBookItem } from "@/types/userBook";
import Image from "next/image";
import { css } from "@emotion/react";

interface ListProps {
  book: AladinBookItem;
  setSelectedBook: (book: AladinBookItem) => void;
  setIsOpenDialog: (isOpen: boolean) => void;
}

const listContainerStyles = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 3rem;
  cursor: pointer;
`;

const imageStyles = css`
  height: auto;
`;

const contentContainerStyles = css`
  display: flex;
  flex-direction: column;
`;

const titleStyles = css`
  font-size: 1rem;
  font-weight: bold;
`;

const infoContainerStyles = css`
  font-size: 0.75rem;
  font-weight: normal;
`;

const authorStyles = css`
  margin-bottom: 0.25rem;
`;

export default function List({
  book,
  setSelectedBook,
  setIsOpenDialog,
}: ListProps) {
  return (
    <div
      key={book.isbn}
      css={listContainerStyles}
      onClick={() => {
        setSelectedBook(book);
        setIsOpenDialog(true);
      }}
    >
      <Image
        src={book.cover}
        alt={book.title}
        height={150}
        width={100}
        css={imageStyles}
      />
      <div css={contentContainerStyles}>
        <p css={titleStyles}>
          {book.title.length > 50
            ? book.title.slice(0, 30) + "..."
            : book.title}
        </p>
        <div css={infoContainerStyles}>
          {book.author && <div css={authorStyles}>저자: {book.author}</div>}
          {book.publisher && <div>출판사: {book.publisher}</div>}
        </div>
      </div>
    </div>
  );
}
