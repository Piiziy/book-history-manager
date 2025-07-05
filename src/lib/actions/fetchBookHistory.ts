"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { UserBook } from "@/types/userBook";

async function _getCurrentReadingBooks(userId: string): Promise<UserBook[]> {
  const currentReadingBooks = await prisma.userBook.findMany({
    where: {
      userId,
      status: "CURRENTLY_READING",
    },
    include: {
      book: true,
      records: true,
    },
  });

  return currentReadingBooks as unknown as UserBook[];
}

async function _getFinishedBooks(userId: string): Promise<UserBook[]> {
  const finishedBooks = await prisma.userBook.findMany({
    where: {
      userId,
      status: "COMPLETED",
    },
    include: {
      book: true,
      records: {
        orderBy: { date: "asc" },
      },
    },
    orderBy: {
      finishedAt: "desc",
    },
  });

  return finishedBooks as unknown as UserBook[];
}

const getCachedCurrentReadingBooks = unstable_cache(
  _getCurrentReadingBooks,
  ["current-reading-books"],
  {
    tags: ["current-reading-books"],
    revalidate: 60 * 5, // 5분 캐시
  }
);

const getCachedFinishedBooks = unstable_cache(
  _getFinishedBooks,
  ["finished-books"],
  {
    tags: ["finished-books"],
    revalidate: 60 * 5, // 5분 캐시
  }
);

export async function getCurrentReadingBooksAction(): Promise<UserBook[]> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return [];
  }

  const userEmail = session.user.email;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: userEmail },
    select: { id: true },
  });

  return getCachedCurrentReadingBooks(user.id);
}

export async function getFinishedBooksAction(): Promise<UserBook[]> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return [];
  }

  const userEmail = session.user.email;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: userEmail },
    select: { id: true },
  });

  return getCachedFinishedBooks(user.id);
}

export async function revalidateCurrentReadingBooks() {
  "use server";

  revalidateTag("current-reading-books");
}

export async function revalidateFinishedBooks() {
  "use server";

  revalidateTag("finished-books");
}

export async function revalidateAllBooks() {
  "use server";

  revalidateTag("current-reading-books");
  revalidateTag("finished-books");
}
