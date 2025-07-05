/** @jsxImportSource @emotion/react */

import { UserBook } from "@/types/userBook";
import { useState, ChangeEvent } from "react";
import { css } from "@emotion/react";
import { addReadingRecord } from "@/lib/readingRecord";
import { createPortal } from "react-dom";
import Toast from "@/ui/Toast";

interface AddRecordButtonProps {
  userBook: UserBook;
  refreshBooks: () => Promise<void>;
}

const buttonStyles = css`
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const primaryButtonStyles = css`
  ${buttonStyles}
  width: 40vw;
  background-color: rgb(143, 59, 246);
  color: white;
  border: none;
  &:hover {
    background-color: #2563eb;
  }
`;

const confirmButtonStyles = css`
  ${primaryButtonStyles}
  width: auto;
`;

const cancelButtonStyles = css`
  ${confirmButtonStyles}
  background-color: white;
  color: #374151;
  border: 1px solid #d1d5db;
  &:hover {
    background-color: #f9fafb;
  }
`;

const inputStyles = css`
  width: 30vw;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const containerStyles = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

const dialogStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
  min-width: 300px;
`;

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const titleStyles = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2563eb;
`;

const messageStyles = css`
  margin-bottom: 1.5rem;
  color: #4b5563;
  line-height: 1.5;
`;

const closeButtonStyles = css`
  ${buttonStyles}
  background-color: #3b82f6;
  color: white;
  width: 100%;
  &:hover {
    background-color: #2563eb;
  }
`;

const CompletionDialog = ({
  isOpen,
  onClose,
  bookTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
}) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div css={overlayStyles} onClick={onClose} />
      <div css={dialogStyles}>
        <h2 css={titleStyles}>축하합니다! 🎉</h2>
        <p css={messageStyles}>
          {bookTitle}을(를) 완독하셨습니다!
          <br />
          다음 목표를 향해 계속 나아가세요.
        </p>
        <button css={closeButtonStyles} onClick={onClose}>
          확인
        </button>
      </div>
    </>,
    document.body
  );
};

export default function AddRecordButton({
  userBook,
  refreshBooks,
}: AddRecordButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState("");
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await addReadingRecord({
        userBookId: userBook.id,
        pages: parseInt(pages),
        date: new Date().toISOString(),
      });

      setIsEditing(false);
      setPages("");
      setToastMessage("페이지가 추가되었습니다");
      setTimeout(() => setToastMessage(null), 3000);

      if (response.cumulativePages >= userBook.book.totalPages) {
        setShowCompletionDialog(true);
      }

      // Call the callback to refresh data
      refreshBooks();
    } catch (error) {
      console.error("Error adding reading record:", error);
      setToastMessage("페이지 추가에 실패했습니다");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <>
      <div css={containerStyles}>
        {isEditing ? (
          <>
            <input
              type="number"
              value={pages}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPages(e.target.value)
              }
              placeholder="읽은 페이지 수"
              css={inputStyles}
            />
            <button onClick={handleSubmit} css={confirmButtonStyles}>
              확인
            </button>
            <button
              onClick={() => setIsEditing(false)}
              css={cancelButtonStyles}
            >
              취소
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} css={primaryButtonStyles}>
            오늘 읽은 페이지 추가
          </button>
        )}
      </div>

      {toastMessage && <Toast message={toastMessage} />}

      <CompletionDialog
        isOpen={showCompletionDialog}
        onClose={() => setShowCompletionDialog(false)}
        bookTitle={userBook.book.title}
      />
    </>
  );
}
