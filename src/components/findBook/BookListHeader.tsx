/** @jsxImportSource @emotion/react */

interface BookListHeaderProps {
  query: string;
  setQuery: (query: string) => void;
  setPage: (page: 1 | 2 | 3 | 4 | 5) => void;
  setPageGroup: (pageGroup: number) => void;
  handleSearch: (pageGroup: number) => void;
}

export default function BookListHeader({
  query,
  setQuery,
  setPage,
  setPageGroup,
  handleSearch,
}: BookListHeaderProps) {
  return (
    <>
      <div
        css={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "185px",
          backgroundColor: "white",
          zIndex: 1,
        }}
      ></div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: "0",
          left: "0",
          width: "calc(100% - 4rem)",
          padding: "0 2rem",
          zIndex: 100,
        }}
      >
        <div
          css={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginTop: "80px",
            marginBottom: "1rem",
          }}
        >
          책 추가하기
        </div>
        <div css={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력해주세요."
            css={{
              padding: "0.5rem",
              width: "100%",
              marginBottom: "1rem",
              border: "0.5px solid rgb(221, 221, 221)",
              borderRadius: "0.5rem",
              "&:focus": {
                outline: "none",
                border: "0.5px solid rgb(221, 221, 221)",
              },
            }}
          />
          <button
            css={{
              padding: "0.5rem",
              width: "50px",
              marginBottom: "1rem",
              backgroundColor: "#e6e6fa",
              border: "none",
              borderRadius: "0.5rem",
            }}
            onClick={() => {
              setPage(1);
              setPageGroup(1);
              handleSearch(1);
            }}
          >
            검색
          </button>
        </div>
        <div
          css={{
            height: "2rem",
            background: [
              "linear-gradient(to top,rgba(255,255,255,0), #fff)",
            ].join(", "),
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 2rem",
          }}
        ></div>
      </div>
    </>
  );
}
