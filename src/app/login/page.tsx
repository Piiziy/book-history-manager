/** @jsxImportSource @emotion/react */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  return (
    <div
      css={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
        padding: "2rem",
      }}
    >
      <h1
        css={{
          marginBottom: "1.5rem",
          fontSize: "2rem",
          color: "#333",
        }}
      >
        환영합니다!
      </h1>
      <p
        css={{
          marginBottom: "2rem",
          fontSize: "1rem",
          color: "#555",
          textAlign: "center",
          maxWidth: "300px",
        }}
      >
        계속하려면 Google 계정으로 로그인하세요.
      </p>
      <button
        onClick={() => signIn("google")}
        css={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4285f4",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#357ae8",
          },
        }}
      >
        Google 계정으로 로그인
      </button>
    </div>
  );
}
