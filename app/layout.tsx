import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "trendsAI",
  description: "Explore most innovative AI applications and models",
  icons: "/favicon.ico",
  openGraph: {
    title: "trendsAI | Built by Divyanshu Soni",
    description: "Directory of most innovative AI applications and models",
    url: "https://trendsai.vercel.app/",
    siteName: "trendsAI",
    locale: "en-US",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
