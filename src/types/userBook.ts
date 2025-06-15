export interface UserBook {
  id: string;
  user: User;
  userId: string;
  book: Book;
  bookId: string;

  status: ReadingStatus;
  startedAt: Date;
  finishedAt: Date;
  records: ReadingRecord[];
}

export type ReadingStatus = "CURRENTLY_READING" | "COMPLETED";

export interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  cover: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
}

export interface ReadingRecord {
  id: string;
  date: Date;
  pagesRead: number;
  cumulativePages: number;
}

export interface AladinBookItem {
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
  pubDate: string;
  cover: string;
  totalPages: number;
}
