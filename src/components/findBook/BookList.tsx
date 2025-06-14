/** @jsxImportSource @emotion/react */

import { AladinBookItem } from "@/types/userBook";
import Image from "next/image";

interface ListProps {
  book: AladinBookItem;
  setSelectedBook: (book: AladinBookItem) => void;
  setIsOpenDialog: (isOpen: boolean) => void;
}

export default function List({
  book,
  setSelectedBook,
  setIsOpenDialog,
}: ListProps) {
  return (
    <div
      key={book.isbn}
      css={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        marginBottom: "3rem",
      }}
      onClick={() => {
        setSelectedBook(book);
        setIsOpenDialog(true);
      }}
    >
      <Image
        src={book.cover}
        alt={book.title}
        height={0}
        width={100}
        style={{ height: "auto" }}
      />
      <div
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          css={{
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {book.title.length > 50
            ? book.title.slice(0, 30) + "..."
            : book.title}
        </p>
        <div
          css={{
            fontSize: "0.75rem",
            fontWeight: "normal",
          }}
        >
          {book.author && (
            <div css={{ marginBottom: "0.25rem" }}>저자: {book.author}</div>
          )}
          {book.publisher && <div>출판사: {book.publisher}</div>}
        </div>
      </div>
    </div>
  );
}
