/** @jsxImportSource @emotion/react */
"use client";

import { AiOutlineLeft } from "@react-icons/all-files/ai/AiOutlineLeft";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";
import { AiOutlineDoubleLeft } from "@react-icons/all-files/ai/AiOutlineDoubleLeft";
import { AiOutlineDoubleRight } from "@react-icons/all-files/ai/AiOutlineDoubleRight";
import { css } from "@emotion/react";

interface PaginationProps {
  total: number;
  page: number;
  setPage: (page: 1 | 2 | 3 | 4 | 5) => void;
  pageGroup: number;
  setPageGroup: (pageGroup: number) => void;
  handleSearch: (pageGroup: number) => void;
}

const paginationContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const iconButtonStyles = css`
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const pageButtonStyles = (isActive: boolean) => css`
  ${iconButtonStyles}
  background-color: ${isActive ? "rgba(0, 0, 0, 0.1)" : "white"};
`;

export default function Pagination({
  total,
  page,
  setPage,
  pageGroup,
  setPageGroup,
  handleSearch,
}: PaginationProps) {
  const maxPageGroup = Math.ceil(total / 50);
  const maxPage = Math.ceil(total / 10);
  const pageStartNumber = (pageGroup - 1) * 5 + 1;
  const pageEndNumber = Math.min(pageStartNumber + 4, maxPage);
  const pageNumbers = Array.from(
    { length: pageEndNumber - pageStartNumber + 1 },
    (_, i) => pageStartNumber + i
  );

  return (
    <div css={paginationContainerStyles}>
      <AiOutlineDoubleLeft
        css={iconButtonStyles}
        onClick={() => {
          if (pageGroup === 1) return;
          setPageGroup(1);
          setPage(1);
          handleSearch(1);
        }}
      />
      <AiOutlineLeft
        css={iconButtonStyles}
        onClick={() => {
          if (pageGroup === 1) return;
          setPageGroup(pageGroup - 1);
          setPage(1);
          handleSearch(pageGroup - 1);
        }}
      />

      {pageNumbers.map((num, idx) => (
        <div
          key={idx}
          onClick={() => setPage((idx + 1) as 1 | 2 | 3 | 4 | 5)}
          css={pageButtonStyles(num === (pageGroup - 1) * 5 + page)}
        >
          {num}
        </div>
      ))}

      <AiOutlineRight
        css={iconButtonStyles}
        onClick={() => {
          if (pageGroup === maxPageGroup) return;
          setPageGroup(pageGroup + 1);
          setPage(1);
          handleSearch(pageGroup + 1);
        }}
      />
      <AiOutlineDoubleRight
        css={iconButtonStyles}
        onClick={() => {
          if (pageGroup === maxPageGroup) return;
          setPageGroup(Math.ceil(total / 50));
          setPage(1);
          handleSearch(Math.ceil(total / 50));
        }}
      />
    </div>
  );
}
