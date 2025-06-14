import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Parser as Xml2JsParser } from "xml2js";

const ALADIN_TTB_KEY = process.env.ALADIN_TTB_KEY!;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
  }
  const { isbn, title, author, cover } = await req.json();

  const userEmail = session.user.email;

  const bookPageNumberapiUrl = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${ALADIN_TTB_KEY}&ItemId=${isbn}&output=xml&OptResult=itemPage`;

  try {
    const pageNumberResXml = await fetch(bookPageNumberapiUrl);
    const xmlText = await pageNumberResXml.text();
    const parser = new Xml2JsParser({ explicitArray: false });
    const jsonObj = await parser.parseStringPromise(xmlText);
    const totalPages = Number(jsonObj.object.item.bookinfo.itemPage);

    const existingBook = await prisma.book.findUnique({
      where: { id: isbn },
    });
    if (existingBook) {
      return NextResponse.json(
        { error: "이미 등록된 책입니다" },
        { status: 409 }
      );
    }

    const book = await prisma.book.create({
      data: {
        id: isbn,
        title,
        author,
        totalPages,
        cover,
      },
    });

    const user = await prisma.user.findUniqueOrThrow({
      where: { email: userEmail },
      select: { id: true },
    });
    const userBook = await prisma.userBook.upsert({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: book.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        bookId: book.id,
        status: "CURRENTLY_READING",
        startedAt: new Date(),
      },
    });

    return NextResponse.json({ book, userBook }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e.code, e.message);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
