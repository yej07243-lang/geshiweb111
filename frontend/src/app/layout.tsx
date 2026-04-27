"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState, useEffect, createContext, useContext } from "react";
import { dict } from "../lib/i18n";

const inter = Inter({ subsets: ["latin"] });
const LanguageContext = createContext({ lang: "en", setLang: (l: string) => {} });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");

  return (
    <html lang={lang}>
      <body className={`${inter.className} antialiased`}>
        <LanguageContext.Provider value={{ lang, setLang }}>
          <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-slate-200/60 h-20">
            <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <span className="text-white font-black text-xl">E</span>
                </div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                  EasyFormat
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                  {dict[lang as keyof typeof dict].allTools}
                </Link>
                
                {/* Language Switcher */}
                <button 
                  onClick={() => setLang(lang === "en" ? "zh" : "en")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-all text-slate-600"
                >
                  <span className={lang === "en" ? "text-blue-600" : ""}>EN</span>
                  <span className="text-slate-300">|</span>
                  <span className={lang === "zh" ? "text-blue-600" : ""}>中文</span>
                </button>

                <Link href="https://easyformat.co" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                   {dict[lang as keyof typeof dict].startBtn}
                </Link>
              </div>
            </nav>
          </header>

          <main className="pt-20">
            {children}
          </main>

          <footer className="bg-white border-t border-slate-100 py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-slate-400 text-sm">
                &copy; 2026 EasyFormat. {dict[lang as keyof typeof dict].footerDesc}
              </p>
            </div>
          </footer>
        </LanguageContext.Provider>
      </body>
    </html>
  );
}

export { LanguageContext };