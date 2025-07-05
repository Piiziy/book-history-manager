import { UserBook } from "@/types/userBook";

export async function getCurrentReadingBooks(): Promise<UserBook[]> {
  const res = await fetch("/api/books/current-reading", {
    credentials: "include",
  });

  if (res.status === 401) {
    window.location.href = "/login";
    return [];
  }

  if (!res.ok) {
    throw new Error(`Error fetching current reading books: ${res.statusText}`);
  }

  const userBooks = await res.json();
  return userBooks;
}
