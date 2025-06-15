import { UserBook } from "@/types/userBook";

export async function getFinishedBooks(): Promise<UserBook[]> {
  const res = await fetch("/api/books/finished");
  if (!res.ok) {
    throw new Error(`Error fetching finished books: ${res.statusText}`);
  }
  return res.json();
}
