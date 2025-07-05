/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Image from "next/image";
import { AladinBookItem } from "@/types/userBook";

interface AddBookDialogProps {
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (book: AladinBookItem) => void;
  book: AladinBookItem | null;
}

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.34);
`;

const dialogContainerStyles = css`
  background-color: white;
  padding: 2rem 2rem 1.5rem 2rem;
  border-radius: 1rem;
  max-width: 60vw;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 100px 0 rgba(0, 0, 0, 0.5);
`;

const imageStyles = css`
  width: 100px;
  height: auto;
`;

const titleStyles = css`
  font-size: 1rem;
  font-weight: bold;
`;

const buttonContainerStyles = css`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const buttonStyles = css`
  width: 60px;
  height: 35px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const confirmButtonStyles = css`
  ${buttonStyles}
  background-color: rgb(0, 110, 255);
  color: white;
  border: none;

  &:hover {
    background-color: rgb(0, 95, 230);
  }
`;

export default function AppendBookDialog({
  setIsOpen,
  onConfirm,
  book,
}: AddBookDialogProps) {
  if (!book) return null;

  return (
    <div css={overlayStyles}>
      <div css={dialogContainerStyles}>
        <Image
          src={book.cover}
          alt={book.title}
          width={100}
          height={150}
          css={imageStyles}
        />
        <p css={titleStyles}>
          {book.title.length > 50
            ? book.title.slice(0, 50) + "..."
            : book.title}
        </p>
        <p>{book.author}</p>
        <div css={buttonContainerStyles}>
          <button css={buttonStyles} onClick={() => setIsOpen(false)}>
            취소
          </button>
          <button
            css={confirmButtonStyles}
            onClick={() => {
              onConfirm(book);
              setIsOpen(false);
            }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
