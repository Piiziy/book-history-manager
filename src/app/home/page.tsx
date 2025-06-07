/** @jsxImportSource @emotion/react */
"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return <div css={{ height: 200 }}>{session?.user?.name}</div>;
}
