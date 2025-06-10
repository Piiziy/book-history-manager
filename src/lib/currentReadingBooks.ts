import { BookItem } from "./fetchBooks";

export async function getCurrentReadingBooks(): Promise<BookItem[]> {
  const res = await fetch("/api/books/current-reading");
  const readingBooks = await res.json();
  return readingBooks;
}
