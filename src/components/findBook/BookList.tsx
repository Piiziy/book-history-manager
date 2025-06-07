// File: app/page.tsx
/** @jsxImportSource @emotion/react */
"use client";

import { useState } from "react";
import { css } from "@emotion/react";
import { fetchBooks, BookItem } from "@/lib/fetchBooks";
import Image from "next/image";

export default function BookList() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!query) return;
    setLoading(true);
    fetchBooks(query)
      .then((data) => {
        setBooks(data.item);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <main
      css={css`
        padding: 2rem;
      `}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
        css={css`
          padding: 0.5rem;
          width: 100%;
          margin-bottom: 1rem;
        `}
      />
      <button
        css={css`
          padding: 0.5rem;
          width: 100%;
          margin-bottom: 1rem;
          background-color: #e6e6fa;
        `}
        onClick={handleSearch}
      >
        검색
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && books.length > 0 && (
        <div>
          {books.map((book) => (
            <div
              key={book.isbn}
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <h3 dangerouslySetInnerHTML={{ __html: book.title }} />
              <p>
                Author:{" "}
                <span dangerouslySetInnerHTML={{ __html: book.author }} />
              </p>
              <p>Publisher: {book.publisher}</p>
              <p>Published: {book.pubdate}</p>
              <Image
                src={book.cover}
                alt={book.title}
                height={200}
                width={200}
                style={{ width: "200px", height: "auto" }}
              />
              <p dangerouslySetInnerHTML={{ __html: book.description }} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
