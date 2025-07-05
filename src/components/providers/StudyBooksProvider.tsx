"use client";

import { UserBook } from "@/types/userBook";
import { createContext, useContext, ReactNode } from "react";

interface StudyBooksContextType {
  readingBooksPromise: Promise<UserBook[]>;
  finishedBooksPromise: Promise<UserBook[]>;
}

const StudyBooksContext = createContext<StudyBooksContextType | null>(null);

interface StudyBooksProviderProps {
  readingBooksPromise: Promise<UserBook[]>;
  finishedBooksPromise: Promise<UserBook[]>;
  children: ReactNode;
}

export function StudyBooksProvider({
  readingBooksPromise,
  finishedBooksPromise,
  children,
}: StudyBooksProviderProps) {
  return (
    <StudyBooksContext.Provider
      value={{ readingBooksPromise, finishedBooksPromise }}
    >
      {children}
    </StudyBooksContext.Provider>
  );
}

export function useStudyBooksPromises() {
  const context = useContext(StudyBooksContext);
  if (!context) {
    throw new Error(
      "useStudyBooksPromises must be used within StudyBooksProvider"
    );
  }
  return context;
}

export function useReadingBooksPromise() {
  const context = useContext(StudyBooksContext);
  if (!context) {
    throw new Error(
      "useReadingBooksPromise must be used within StudyBooksProvider"
    );
  }
  return context.readingBooksPromise;
}

export function useFinishedBooksPromise() {
  const context = useContext(StudyBooksContext);
  if (!context) {
    throw new Error(
      "useFinishedBooksPromise must be used within StudyBooksProvider"
    );
  }
  return context.finishedBooksPromise;
}
