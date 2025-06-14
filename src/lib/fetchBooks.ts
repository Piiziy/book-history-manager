import { AladinBookItem } from "@/types/userBook";

interface FetchBookSearchResult {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  item: AladinBookItem[];
}

interface FetchBookSearchRequest {
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
}: FetchBookSearchRequest): Promise<FetchBookSearchResult> {
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
