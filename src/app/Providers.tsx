"use client";

import { SessionProvider } from "next-auth/react";
import RootStyleRegistry from "./emotion";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return (
    <RootStyleRegistry>
      <SessionProvider>{children}</SessionProvider>
    </RootStyleRegistry>
  );
}
