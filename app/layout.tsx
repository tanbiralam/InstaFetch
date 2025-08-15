import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InstaFetch - Instagram Video & Photo Downloader",
  description:
    "Download Instagram videos, photos, stories, and reels in high quality. Fast, free, and easy to use Instagram downloader.",
  keywords:
    "instagram downloader, download instagram video, instagram photo downloader, instagram reels downloader",
  authors: [{ name: "InstaFetch" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "InstaFetch - Instagram Video & Photo Downloader",
    description:
      "Download Instagram videos, photos, stories, and reels in high quality. Fast, free, and easy to use Instagram downloader.",
    type: "website",
    url: "https://instafetch.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaFetch - Instagram Video & Photo Downloader",
    description:
      "Download Instagram videos, photos, stories, and reels in high quality. Fast, free, and easy to use Instagram downloader.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
