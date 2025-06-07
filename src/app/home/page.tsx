/** @jsxImportSource @emotion/react */
"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div
      css={{
        margin: "5rem 0 0 2rem",
        fontWeight: 700,
      }}
    >
      <p css={{ fontSize: "2rem", fontWeight: 700 }}>
        {session?.user?.name}
        <span css={{ fontSize: "1.5rem" }}>님 반갑습니다!</span>
      </p>
    </div>
  );
}
