import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://easyformat.co"),
  title: {
    default: "Free Online File Converter | EasyFormat",
    template: "%s | EasyFormat",
  },
  description:
    "Convert PDF, Word, JPG, PNG, WebP and more online for free. Fast, simple, secure, no signup required.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Online File Converter | EasyFormat",
    description:
      "Convert PDF, Word, JPG, PNG, WebP and more online for free. Fast, simple, secure, no signup required.",
    url: "https://easyformat.co",
    siteName: "EasyFormat",
    type: "website",
  },
};

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="EasyFormat">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-700 text-white shadow-sm">
                <ArrowRightLeft size={20} strokeWidth={2.4} />
              </span>
              <span className="text-xl font-black tracking-normal text-slate-950">EasyFormat</span>
            </Link>

            <div className="flex items-center gap-4 text-sm font-bold text-slate-700">
              <Link href="/tools" className="focus-ring rounded-md hover:text-teal-800">
                Tools
              </Link>
              <Link href="/about" className="focus-ring hidden rounded-md hover:text-teal-800 sm:inline">
                About
              </Link>
              <Link href="/blog" className="focus-ring hidden rounded-md hover:text-teal-800 sm:inline">
                Blog
              </Link>
              <Link href="/contact" className="focus-ring hidden rounded-md hover:text-teal-800 sm:inline">
                Contact
              </Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="font-black text-slate-900">
                EasyFormat
              </Link>
              <p className="mt-2">© 2026 EasyFormat. Files are deleted automatically after 30 minutes.</p>
            </div>
            <div className="flex flex-wrap gap-4 font-bold">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="focus-ring rounded-md hover:text-teal-800">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
