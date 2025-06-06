// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// 1) AuthOptions 정의
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), // Prisma Adapter 연동
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      // 특히 Google에서 반드시 scope에 profile,email 요청
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    // (필요하다면 다른 프로바이더 추가 가능)
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET, // 세션 암호화 등 내부적으로 필요
  session: {
    strategy: "database", // 세션 데이터를 DB에 저장
  },
  callbacks: {
    // 세션에 포함할 사용자 정보 확장 (필요 시)
    async session({ session, user }) {
      if (session.user) {
        session.user.email = user.email;
        session.user.name = user.name;
        session.user.image = user.image;
      }
      return session;
    },
  },
};

// 2) NextAuth 핸들러 내보내기
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
