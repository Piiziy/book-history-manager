import { UserBook } from "@/types/userBook";

export async function getCurrentReadingBooks(): Promise<UserBook[]> {
  const res = await fetch("/api/books/current-reading");
  const userBooks = await res.json();
  return userBooks;
}
