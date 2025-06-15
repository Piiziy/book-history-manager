import { UserBook } from "@/types/userBook";

interface BookProgressInfo {
  currentPage: number;
  totalPages: number;
  percentage: number;
  isStarted: boolean;
  remainingPages: number;
  estimatedDaysToComplete?: number;
}

export default function useBookProgress(userBook: UserBook): BookProgressInfo {
  const currentPage =
    userBook.records.length > 0
      ? userBook.records[userBook.records.length - 1].cumulativePages
      : 0;
  const totalPages = userBook.book.totalPages;
  const percentage = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;
  const isStarted = currentPage > 0;
  const remainingPages = totalPages - currentPage;

  let estimatedDaysToComplete;
  if (isStarted && userBook.records.length >= 2) {
    const recentRecords = userBook.records.slice(-2);
    const dailyAverage =
      recentRecords[1].cumulativePages - recentRecords[0].cumulativePages;
    if (dailyAverage > 0) {
      estimatedDaysToComplete = Math.ceil(remainingPages / dailyAverage);
    }
  }

  return {
    currentPage,
    totalPages,
    percentage,
    isStarted,
    remainingPages,
    estimatedDaysToComplete,
  };
}
