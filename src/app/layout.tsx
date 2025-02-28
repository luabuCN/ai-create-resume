import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";

const AlimamaShuHeiTi = localFont({
  src: "../assets/fonts/AlimamaShuHeiTi-Bold.woff",
  variable: "--font-ali",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s - AI简历生成器",
    absolute: "AI简历生成器",
  },
  description: "AI简历生成器是帮助你创建专业简历、获得理想工作的最简单方式。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${AlimamaShuHeiTi.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
