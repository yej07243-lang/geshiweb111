import { TOOLS } from "../lib/tools";
import Link from "next/link";
import { FileText, Image as ImageIcon, ArrowRight, Zap, Shield, MousePointer2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100 rounded-full blur-[120px] opacity-50"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-8 shadow-sm">
            <Zap size={14} className="fill-blue-600" />
            <span>快速、免费、且无限制</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 leading-[1.1]">
            无限可能地<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x">
              转换您的文件
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            体验数秒内的高质量转换。无需注册、无水印、无限制，专注于极致效率。
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group glass-card p-10 rounded-[2.5rem] tool-grid-item hover:shadow-2xl hover:shadow-blue-200/40 transition-all border-slate-200/60 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                {tool.id.includes("pdf") ? <FileText size={120} /> : <ImageIcon size={120} />}
              </div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {tool.id.includes("pdf") || tool.id.includes("word") ? (
                  <FileText className="text-white" size={32} />
                ) : (
                  <ImageIcon className="text-white" size={32} />
                )}
              </div>
              
              <h2 className="text-2xl font-black mb-4 flex items-center text-slate-900">
                {tool.name}
                <ArrowRight className="ml-2 w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600" />
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-4">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">为什么选择 EasyFormat?</h2>
            <p className="text-slate-400">您的隐私和效率是我们的首要任务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
                <Shield className="text-blue-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">隐私至上</h3>
              <p className="text-slate-400 leading-relaxed">文件在 30 分钟后自动销毁。我们采用端到端加密，绝不存储您的任何数据。</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
                <Zap className="text-indigo-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">极速转换</h3>
              <p className="text-slate-400 leading-relaxed">基于优化的云计算引擎，确保即使是大型文档也能在瞬息之间转换完成。</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
                <MousePointer2 className="text-emerald-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">零干扰体验</h3>
              <p className="text-slate-400 leading-relaxed">无账户、无广告弹窗、无干扰。打开网页，立即开始您的高效转换工作。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}