import { UserBook } from "@/types/userBook";

export async function fetchReadingBooks(): Promise<UserBook[]> {
  const response = await fetch("/api/books/reading");

  if (!response.ok) {
    throw new Error("Failed to fetch reading books");
  }

  return response.json();
}
