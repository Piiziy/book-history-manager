/** @jsxImportSource @emotion/react */

import { useCallback, useState } from "react";
import { fetchBooks } from "@/lib/fetchBooks";
import Pagination from "./Pagination";
import LoadingDotsSkeleton from "@/ui/Skeleton";
import Toast from "@/ui/Toast";
import BookListHeader from "./BookListHeader";
import { addBook } from "@/lib/addBook";
import { AladinBookItem } from "@/types/userBook";
import List from "./BookList";
import AppendBookDialog from "./AppendBookDialog";
import { css } from "@emotion/react";

const mainStyles = css`
  padding: 0 2rem;
`;

const contentContainerStyles = css`
  margin-top: 196px;
`;

const errorMessageStyles = css`
  color: #ff4d4f;
  text-align: center;
  line-height: 1.5;
`;

const bookListContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const noResultsStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999999;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.5;
`;

export default function AddBook() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<AladinBookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [pageGroup, setPageGroup] = useState(1);
  const [total, setTotal] = useState(0);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<AladinBookItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  console.log(error, loading, books?.length);

  const handleSearch = useCallback(
    (pageGroup: number) => {
      if (!query) return;
      setLoading(true);
      fetchBooks({ query, start: pageGroup })
        .then((data) => {
          setBooks(data.item);
          setTotal(data.totalResults);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    },
    [query]
  );

  const handleAddBook = async (book: AladinBookItem) => {
    try {
      await addBook(book);
      setToastMessage("책이 추가되었습니다");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setToastMessage(err.message);
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        setToastMessage("오류가 발생했습니다. 다시 시도해주세요.");
        setTimeout(() => setToastMessage(null), 3000);
      }
    }
  };

  return (
    <>
      <main css={mainStyles}>
        <BookListHeader
          query={query}
          setQuery={setQuery}
          setPage={setPage}
          setPageGroup={setPageGroup}
          handleSearch={handleSearch}
        />
        {toastMessage && <Toast message={toastMessage} />}
        <div css={contentContainerStyles}>
          {error && (
            <p css={errorMessageStyles}>
              오류가 발생했습니다. <br /> 다시 시도해주세요.
            </p>
          )}

          {loading && <LoadingDotsSkeleton />}

          {!error && !loading && books?.length > 0 && (
            <>
              <div css={bookListContainerStyles}>
                {books.slice((page - 1) * 10, page * 10).map((book) => (
                  <List
                    key={book.isbn}
                    book={book}
                    setSelectedBook={setSelectedBook}
                    setIsOpenDialog={setIsOpenDialog}
                  />
                ))}
              </div>
              <Pagination
                total={total}
                page={page}
                setPage={setPage}
                pageGroup={pageGroup}
                setPageGroup={setPageGroup}
                handleSearch={handleSearch}
              />
            </>
          )}

          {!error && !loading && (!books?.length || books?.length === 0) && (
            <p css={noResultsStyles}>검색 결과가 없습니다.</p>
          )}
        </div>
        {isOpenDialog && (
          <AppendBookDialog
            setIsOpen={setIsOpenDialog}
            onConfirm={handleAddBook}
            book={selectedBook}
          />
        )}
      </main>
    </>
  );
}
