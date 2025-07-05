import { signOut } from "next-auth/react";

export async function logout(): Promise<void> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 401) {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
      return;
    }

    if (!response.ok) {
      throw new Error("서버 로그아웃 실패");
    }

    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  } catch (error) {
    console.error("로그아웃 처리 중 오류:", error);

    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  }
}
