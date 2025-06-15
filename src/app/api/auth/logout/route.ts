import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "로그인되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    console.log(`사용자 로그아웃: ${session.user?.email}`);

    return NextResponse.json(
      { message: "로그아웃이 완료되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그아웃 API 오류:", error);
    return NextResponse.json(
      { error: "로그아웃 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
