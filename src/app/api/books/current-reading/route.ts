import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
  }

  const userEmail = session.user.email;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: userEmail },
    select: { id: true },
  });

  const currentReadingBooks = await prisma.userBook.findMany({
    where: {
      userId: user.id,
      status: "CURRENTLY_READING",
    },
    include: {
      book: true,
      records: true,
    },
  });
  console.log(currentReadingBooks);

  return NextResponse.json(currentReadingBooks);
}
