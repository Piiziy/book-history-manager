"use client";

import { UserBook } from "@/types/userBook";
import { createContext, useContext, ReactNode } from "react";

interface ReadingBooksContextType {
  readingBooksPromise: Promise<UserBook[]>;
}

const ReadingBooksContext = createContext<ReadingBooksContextType | null>(null);

interface ReadingBooksProviderProps {
  readingBooksPromise: Promise<UserBook[]>;
  children: ReactNode;
}

export function ReadingBooksProvider({
  readingBooksPromise,
  children,
}: ReadingBooksProviderProps) {
  return (
    <ReadingBooksContext.Provider value={{ readingBooksPromise }}>
      {children}
    </ReadingBooksContext.Provider>
  );
}

export function useReadingBooksPromise() {
  const context = useContext(ReadingBooksContext);
  if (!context) {
    throw new Error(
      "useReadingBooksPromise must be used within ReadingBooksProvider"
    );
  }
  return context.readingBooksPromise;
}
