import { getCurrentReadingBooksAction } from "@/lib/actions/fetchBookHistory";
import { ReadingBooksProvider } from "@/components/providers/ReadingBooksProvider";
import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  // 서버에서 데이터 Promise 생성
  const readingBooksPromise = getCurrentReadingBooksAction();

  return (
    <ReadingBooksProvider readingBooksPromise={readingBooksPromise}>
      {children}
    </ReadingBooksProvider>
  );
}
