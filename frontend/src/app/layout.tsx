"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ArrowRightLeft, Languages } from "lucide-react";
import { dict } from "../lib/i18n";
import { LanguageContext, LanguageProvider } from "../components/LanguageProvider";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

function AppShell({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = useContext(LanguageContext);
  const t = dict[lang as keyof typeof dict] || dict.en;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label={t.brand}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-700 text-white shadow-sm">
              <ArrowRightLeft size={20} strokeWidth={2.4} />
            </span>
            <span className="text-xl font-black tracking-normal text-slate-950">{t.brand}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="focus-ring inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-teal-700 hover:text-teal-800"
              aria-label="Switch language"
            >
              <Languages size={17} />
              <span>{lang === "en" ? "中文" : "EN"}</span>
            </button>
            <Link
              href="/#tools"
              className="focus-ring hidden h-10 items-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-teal-800 sm:inline-flex"
            >
              {t.startBtn}
            </Link>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold text-slate-800">{t.brand}</span>
          <span>&copy; 2026 {t.footerDesc}</span>
        </div>
      </footer>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
