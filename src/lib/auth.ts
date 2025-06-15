import { signOut } from "next-auth/react";

/**
 * 사용자 로그아웃 처리
 * API를 통해 서버 측 로그아웃을 수행하고 클라이언트 세션을 정리합니다.
 */
export async function logout(): Promise<void> {
  try {
    // 서버 측 로그아웃 API 호출
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("서버 로그아웃 실패");
    }

    // NextAuth 클라이언트 세션 정리 및 리디렉션
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  } catch (error) {
    console.error("로그아웃 처리 중 오류:", error);

    // 서버 API 호출이 실패해도 클라이언트 세션은 정리
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  }
}
