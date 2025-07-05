import { UserBook } from "@/types/userBook";

export async function getFinishedBooks(): Promise<UserBook[]> {
  const res = await fetch("/api/books/finished", {
    credentials: "include",
  });

  if (res.status === 401) {
    window.location.href = "/login";
    return [];
  }

  if (!res.ok) {
    throw new Error(`Error fetching finished books: ${res.statusText}`);
  }

  return res.json();
}
