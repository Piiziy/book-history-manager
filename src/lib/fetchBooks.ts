export interface BookItem {
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
  pubDate: string;
  cover: string;
}

export interface BookSearchResult {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  item: BookItem[];
}

export async function fetchBooks(
  query: string,
  display = 10,
  start = 1,
  sort: "sim" | "date" = "sim"
): Promise<BookSearchResult> {
  const params = new URLSearchParams({
    query,
    display: display.toString(),
    start: start.toString(),
    sort,
  });

  const res = await fetch(`/api/books/search?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Error fetching books: ${res.statusText}`);
  }

  return res.json();
}
