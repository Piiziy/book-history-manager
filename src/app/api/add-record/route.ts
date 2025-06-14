import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { userBookId, pages, date } = body;

    if (!userBookId || !pages || !date) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const userBook = await prisma.userBook.findFirst({
      where: {
        id: userBookId,
      },
      include: {
        book: true,
      },
    });

    if (!userBook) {
      return new NextResponse("UserBook not found", { status: 404 });
    }

    const lastRecord = await prisma.readingRecord.findFirst({
      where: {
        userBookId,
      },
      orderBy: {
        date: "desc",
      },
    });
    console.log(lastRecord, "lastRecord");

    const pagesRead = Number(pages);
    const cumulativePages = (lastRecord?.cumulativePages || 0) + pagesRead;

    const readingRecord = await prisma.readingRecord.create({
      data: {
        userBook: {
          connect: {
            id: userBookId,
          },
        },
        pagesRead,
        cumulativePages,
        date: new Date(date),
      },
    });

    if (cumulativePages >= userBook.book.totalPages) {
      await prisma.userBook.update({
        where: {
          id: userBookId,
        },
        data: {
          status: "COMPLETED",
        },
      });
    }

    return NextResponse.json(readingRecord);
  } catch (error) {
    console.error("[ADD_RECORD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
