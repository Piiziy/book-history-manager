/** @jsxImportSource @emotion/react */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

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
    <>
      <h1
        css={{
          marginLeft: "2rem",
          marginTop: "6rem",
          marginBottom: "6rem",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#333",
        }}
      >
        만나서 반갑습니다!
      </h1>
      <div
        css={{
          margin: "0 2rem",
          width: "calc(100% - 4rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          css={{
            marginBottom: "1rem",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#9299A0",
          }}
        >
          소설 계정으로 로그인하기
        </p>
        <button
          onClick={() => signIn("google")}
          css={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.75rem",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",

            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            },
            "& img": {
              marginRight: "0.5rem",
              width: "20px",
              height: "20px",
            },
          }}
        >
          <Image
            src="/logo/google-logo.png"
            alt="Google logo"
            width={16}
            height={16}
          />
          구글로 시작하기
        </button>
      </div>
    </>
  );
}
