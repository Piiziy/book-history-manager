import type { Metadata } from "next";
import Footer from "./Footer";
import Provider from "./Providers";
import MobileOnlyNotice from "./MobileOnlyNotice";
import "./globals.css";

export const metadata: Metadata = {
  title: "한눈에 보는 독서 기록장",
  description: "한눈에 보는 독서 기록장",
  icons: {
    icon: "/icons/icon-144x144.png",
  },
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
        <MobileOnlyNotice />
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
