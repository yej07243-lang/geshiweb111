import { TOOLS } from "../lib/tools";
import Link from "next/link";
import { FileText, Image as ImageIcon, ArrowRight, Zap, Shield, MousePointer2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100 rounded-full blur-[120px] opacity-50"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8">
            <Zap size={14} />
            <span>Fast, Free & Unlimited</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900">
            Convert Files <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Without Limits.
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience high-quality file conversion in seconds. No registration, no watermarks, just pure efficiency.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group glass-card p-8 rounded-3xl tool-grid-item hover:shadow-2xl hover:shadow-blue-100/50 transition-all border-slate-200/60"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                {tool.id.includes("pdf") || tool.id.includes("word") ? (
                  <FileText className="text-white" size={28} />
                ) : (
                  <ImageIcon className="text-white" size={28} />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-3 flex items-center text-slate-800">
                {tool.name}
                <ArrowRight className="ml-2 w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h2>
              <p className="text-slate-500 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Shield className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-slate-400 text-sm">Files are automatically deleted after 30 minutes. We never store your data.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <Zap className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-slate-400 text-sm">Optimized backend ensuring your conversions finish in the blink of an eye.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <MousePointer2 className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Friction</h3>
              <p className="text-slate-400 text-sm">No accounts, no credit cards. Start converting immediately for free.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
