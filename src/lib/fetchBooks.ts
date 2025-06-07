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

interface FetchBooksProps {
  query: string;
  MaxResults?: number;
  start?: number;
  sort?: "sim" | "date";
}

export async function fetchBooks({
  query,
  MaxResults = 50,
  start = 1,
  sort = "sim",
}: FetchBooksProps): Promise<BookSearchResult> {
  const params = new URLSearchParams({
    query,
    display: MaxResults.toString(),
    start: start.toString(),
    sort,
  });

  const res = await fetch(`/api/books/search?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Error fetching books: ${res.statusText}`);
  }

  return res.json();
}
