import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FastConvert - Free Online File Converter",
  description: "Simple, fast, and secure file conversion tools. PDF, Word, and Images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white border-b sticky top-0 z-10">
          <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              FastConvert
            </Link>
            <div className="space-x-4 hidden md:flex">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            </div>
          </nav>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-50 border-t py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 FastConvert MVP. All rights reserved. Files are deleted after 30 minutes.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
