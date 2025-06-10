/** @jsxImportSource @emotion/react */
import { BookItem } from "../../lib/fetchBooks";
import styled from "@emotion/styled";
import Image from "next/image";

interface AddBookDialogProps {
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (book: BookItem) => void;
  book: BookItem | null;
}

export default function AddBookDialog({
  setIsOpen,
  onConfirm,
  book,
}: AddBookDialogProps) {
  const ClickButton = styled.div`
    width: 60px;
    height: 35px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    border: 1px solid #e0e0e0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  `;
  if (!book) return null;

  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.34)",
      }}
    >
      <div
        css={{
          backgroundColor: "white",
          padding: "2rem 2rem 1.5rem 2rem",
          borderRadius: "1rem",
          maxWidth: "60vw",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 0 100px 0 rgba(0, 0, 0, 0.5)",
        }}
      >
        <Image
          src={book.cover}
          alt={book.title}
          width={100}
          height={100}
          css={{ width: "100px", height: "auto" }}
        />
        <p css={{ fontSize: "1rem", fontWeight: "bold" }}>
          {book.title.length > 50
            ? book.title.slice(0, 50) + "..."
            : book.title}
        </p>
        <p>{book.author}</p>
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <ClickButton onClick={() => setIsOpen(false)}>취소</ClickButton>
          <ClickButton
            onClick={() => {
              onConfirm(book);
              setIsOpen(false);
            }}
            css={{
              backgroundColor: "rgb(0, 110, 255)",
              color: "white",
            }}
          >
            추가
          </ClickButton>
        </div>
      </div>
    </div>
  );
}
