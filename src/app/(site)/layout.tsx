// app/layout.tsx

import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | kipiiler",
  description: "A personal portfolio site built with Sanity and Next.js",
  metadataBase: new URL("https://kipiiler.com"),
  openGraph: {
    title: "Portfolio | kipiiler",
    description: "A personal portfolio site built with Sanity and Next.js",
    url: "https://kipiiler.com",
    images: "https://static.thenounproject.com/png/707608-200.png",
    siteName: "kipiiler.com",
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={`${inter.className} bg-zinc-900 text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
