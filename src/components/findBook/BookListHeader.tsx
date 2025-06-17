/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Search } from "lucide-react";

interface BookListHeaderProps {
  query: string;
  setQuery: (query: string) => void;
  setPage: (page: 1 | 2 | 3 | 4 | 5) => void;
  setPageGroup: (pageGroup: number) => void;
  handleSearch: (pageGroup: number) => void;
}

const headerContainerStyles = css`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: calc(100% - 4rem);
  padding: 0 2rem;
  z-index: 100;
`;

const titleStyles = css`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 80px;
  margin-bottom: 1rem;
`;

const searchContainerStyles = css`
  position: relative;
  width: 80vw
  margin-bottom: 1rem;
`;

const inputStyles = css`
  padding: 0.5rem 3rem 0.5rem 0.5rem;
  border: none;
  border-bottom: 0.5px solid rgb(221, 221, 221);
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-bottom: 0.5px solid #9370db;
  }
`;

const searchIconStyles = css`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

export default function BookListHeader({
  query,
  setQuery,
  setPage,
  setPageGroup,
  handleSearch,
}: BookListHeaderProps) {
  return (
    <>
      <div css={headerContainerStyles}>
        <div css={titleStyles}>책 추가하기</div>
        <div css={searchContainerStyles}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력해주세요."
            css={inputStyles}
          />
          <Search
            css={searchIconStyles}
            onClick={() => {
              setPage(1);
              setPageGroup(1);
              handleSearch(1);
            }}
          />
        </div>
      </div>
    </>
  );
}
