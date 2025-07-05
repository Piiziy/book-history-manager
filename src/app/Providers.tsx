"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";
import RootStyleRegistry from "./emotion";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return (
    <RootStyleRegistry>
      <SessionProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </SessionProvider>
    </RootStyleRegistry>
  );
}
