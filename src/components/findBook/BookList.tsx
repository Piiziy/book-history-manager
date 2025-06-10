/** @jsxImportSource @emotion/react */
"use client";

import { useCallback, useState } from "react";
import { fetchBooks, BookItem } from "@/lib/fetchBooks";
import Image from "next/image";
import Pagination from "./Pagination";
import LoadingDotsSkeleton from "@/ui/Skeleton";
import BookListHeader from "./BookListHeader";
import AddBookDialog from "./AddBookDialog";
import { addBook } from "@/lib/addBook";
import Toast from "@/ui/Toast";

export default function BookList() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [pageGroup, setPageGroup] = useState(1);
  const [total, setTotal] = useState(0);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const handleAddBook = async (book: BookItem) => {
    try {
      await addBook(book);
      setToastMessage("책이 추가되었습니다");
      setTimeout(() => setToastMessage(null), 3000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setToastMessage(err.message);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <>
      <main
        css={{
          padding: "0 2rem",
        }}
      >
        <BookListHeader
          query={query}
          setQuery={setQuery}
          setPage={setPage}
          setPageGroup={setPageGroup}
          handleSearch={handleSearch}
        />
        {toastMessage && <Toast message={toastMessage} />}
        <div css={{ marginTop: "196px" }}>
          {error && (
            <p>
              오류가 발생했습니다. <br /> 다시 시도해주세요.
            </p>
          )}
          {loading && <LoadingDotsSkeleton />}
          {!error && books.length > 0 && !loading && (
            <div>
              {books.slice((page - 1) * 10, page * 10).map((book) => (
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
                    height={200}
                    width={100}
                    style={{ width: "100px", height: "auto" }}
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
                        <div css={{ marginBottom: "0.25rem" }}>
                          저자: {book.author}
                        </div>
                      )}
                      {book.publisher && <div>출판사: {book.publisher}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {books.length > 0 && !loading && (
            <Pagination
              total={total}
              page={page}
              setPage={setPage}
              pageGroup={pageGroup}
              setPageGroup={setPageGroup}
              handleSearch={handleSearch}
            />
          )}
        </div>
        {isOpenDialog && (
          <AddBookDialog
            setIsOpen={setIsOpenDialog}
            onConfirm={handleAddBook}
            book={selectedBook}
          />
        )}
      </main>
    </>
  );
}
