import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyFormat - 免费在线文件转换器",
  description: "简单、快速、安全的在线文件转换工具。支持 PDF, Word 和图片转换。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
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
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">所有工具</Link>
              <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">常见问题</Link>
              <Link href="https://easyformat.co" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                开始转换
              </Link>
            </div>
          </nav>
        </header>

        <main className="pt-20">
          {children}
        </main>

        <footer className="bg-white border-t border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <span className="text-xl font-black text-slate-900">EasyFormat</span>
                <p className="text-slate-400 text-sm mt-2">您的在线隐私转换专家</p>
              </div>
              <p className="text-slate-400 text-sm">
                &copy; 2026 EasyFormat. 保留所有权利。所有文件将在转换后 30 分钟内自动删除。
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}