import type { Metadata } from "next";
import Footer from "./Footer";
import Provider from "./Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "습관 관리",
  description: "습관 관리 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
