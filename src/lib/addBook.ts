import { BookItem } from "./fetchBooks";

export async function addBook(book: BookItem) {
  const response = await fetch("/api/books/add", {
    method: "POST",
    body: JSON.stringify(book),
  });
  const data = await response.json();
  if (response.status === 409) {
    throw new Error("이미 등록된 책입니다");
  }
  if (response.status === 500) {
    throw new Error("책 추가에 실패했습니다");
  }

  return data;
}
