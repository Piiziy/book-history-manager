/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface BookListHeaderProps {
  query: string;
  setQuery: (query: string) => void;
  setPage: (page: 1 | 2 | 3 | 4 | 5) => void;
  setPageGroup: (pageGroup: number) => void;
  handleSearch: (pageGroup: number) => void;
}

const backgroundStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 185px;
  background-color: white;
  z-index: 1;
`;

const headerContainerStyles = css`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
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
  display: flex;
  gap: 1rem;
`;

const inputStyles = css`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 0.5px solid rgb(221, 221, 221);
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border: 0.5px solid rgb(221, 221, 221);
  }
`;

const searchButtonStyles = css`
  padding: 0.5rem;
  width: 50px;
  margin-bottom: 1rem;
  background-color: #e6e6fa;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #d8d8f6;
  }
`;

const gradientStyles = css`
  height: 2rem;
  background: linear-gradient(to top, rgba(255, 255, 255, 0), #fff);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 2rem;
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
      <div css={backgroundStyles}></div>
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
          <button
            css={searchButtonStyles}
            onClick={() => {
              setPage(1);
              setPageGroup(1);
              handleSearch(1);
            }}
          >
            검색
          </button>
        </div>
        <div css={gradientStyles}></div>
      </div>
    </>
  );
}
