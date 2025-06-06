import type { NextConfig } from "next";
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NEXT_PUBLIC_NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

// @ts-expect-error next-pwa 5.6.0 버전에서 오류가 발생하여 무시
export default pwaConfig(nextConfig);
