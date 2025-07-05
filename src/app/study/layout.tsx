import {
  getCurrentReadingBooksAction,
  getFinishedBooksAction,
} from "@/lib/actions/fetchBookHistory";
import { StudyBooksProvider } from "@/components/providers/StudyBooksProvider";
import { ReactNode } from "react";

interface StudyLayoutProps {
  children: ReactNode;
}

export default async function StudyLayout({ children }: StudyLayoutProps) {
  // 서버에서 데이터 Promise들 생성
  const readingBooksPromise = getCurrentReadingBooksAction();
  const finishedBooksPromise = getFinishedBooksAction();

  return (
    <StudyBooksProvider
      readingBooksPromise={readingBooksPromise}
      finishedBooksPromise={finishedBooksPromise}
    >
      {children}
    </StudyBooksProvider>
  );
}
