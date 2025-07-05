import { AladinBookItem } from "@/types/userBook";

export async function addBook(book: AladinBookItem) {
  console.log(book);
  const response = await fetch("/api/books/add", {
    method: "POST",
    body: JSON.stringify(book),
    credentials: "include",
  });

  if (response.status === 401) {
    window.location.href = "/login";
    return;
  }

  const data = await response.json();

  if (response.status === 409) {
    throw new Error("이미 등록된 책입니다");
  }

  if (response.status === 500) {
    throw new Error("책 추가에 실패했습니다");
  }

  return data;
}
