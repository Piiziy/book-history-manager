/** @jsxImportSource @emotion/react */

import useBookProgress from "@/hook/useBookProgress";
import { UserBook } from "@/types/userBook";
import Image from "next/image";
import { css } from "@emotion/react";

interface BookInfoProps {
  userBook: UserBook;
}

const containerStyles = css`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 100%;
`;

const titleStyles = css`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
`;

const contentContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const imageContainerStyles = css`
  position: relative;
  width: 45%;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
`;

const imageStyles = css`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const infoContainerStyles = css`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 2vw, 1rem);
  justify-content: flex-start;
  padding-top: 0.5rem;
`;

const progressContainerStyles = css`
  display: flex;
  align-items: baseline;
  margin-bottom: clamp(0.5rem, 1.5vw, 1rem);
`;

const currentPageStyles = css`
  font-size: clamp(1rem, 5vw, 10rem);
  font-weight: 600;
  color: #6b4eff;
`;

const totalPagesStyles = css`
  font-size: clamp(1rem, 5vw, 10rem);
  font-weight: 600;
  color: #555;
  margin-left: 4px;
`;

const progressBarContainerStyles = css`
  height: 8px;
  background-color: #e6e6fa;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: clamp(0.75rem, 2vw, 1.25rem);
`;

const progressBarStyles = (percentage: number) => css`
  width: ${percentage}%;
  height: 100%;
  background-color: #6b4eff;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const statsContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: clamp(0.3rem, 1vw, 0.5rem);
`;

const percentageStyles = css`
  font-size: clamp(0.8rem, 4vw, 10rem);
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const percentageValueStyles = css`
  color: #6b4eff;
`;

const remainingPagesStyles = css`
  font-size: clamp(0.8rem, 4vw, 10rem);
  color: #666;
  margin-bottom: clamp(0.2rem, 0.5vw, 0.4rem);
`;

const estimatedDaysStyles = css`
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  color: #6b4eff;
  font-weight: 600;
`;

export default function BookInfo({ userBook }: BookInfoProps) {
  const progress = useBookProgress(userBook);

  return (
    <div css={containerStyles}>
      <div css={titleStyles}>
        {userBook.book.title.length > 20
          ? userBook.book.title.slice(0, 20) + "..."
          : userBook.book.title}
      </div>
      <div css={contentContainerStyles}>
        <div css={imageContainerStyles}>
          <Image
            src={userBook.book.cover}
            alt={userBook.book.title}
            height={150}
            width={150}
            css={imageStyles}
            priority
          />
        </div>
        <div css={infoContainerStyles}>
          <div>
            <div css={progressContainerStyles}>
              <div css={currentPageStyles}>{progress.currentPage}</div>
              <div css={totalPagesStyles}>/ {progress.totalPages} 페이지</div>
            </div>
            <div css={progressBarContainerStyles}>
              <div css={progressBarStyles(progress.percentage)} />
            </div>
          </div>
          <div css={statsContainerStyles}>
            <div css={percentageStyles}>
              <span css={percentageValueStyles}>
                {Math.round(progress.percentage)}%
              </span>
              <span>완독</span>
            </div>
            <div css={remainingPagesStyles}>
              {progress.remainingPages > 0 && (
                <span>남은 페이지: {progress.remainingPages}p</span>
              )}
            </div>
            {progress.estimatedDaysToComplete && (
              <div css={estimatedDaysStyles}>
                약 {progress.estimatedDaysToComplete}일 후 완독 예정
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
