import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const finishedBooks = await prisma.userBook.findMany({
      where: {
        userId: user.id,
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

    return NextResponse.json(finishedBooks);
  } catch (error) {
    console.error("Error fetching finished books:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
