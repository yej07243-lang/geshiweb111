"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { TOOLS, Tool } from "../../../lib/tools";
import AdSlot from "../../../components/AdSlot";
import { Upload, FileText, Download, RefreshCcw, AlertCircle, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { LanguageContext } from "../../layout";
import { dict } from "../../../lib/i18n";

export default function ToolPage() {
  const params = useParams();
  const { lang } = useContext(LanguageContext);
  const t = dict[lang as keyof typeof dict];
  
  const [tool, setTool] = useState<Tool | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "completed" | "error">("idle");
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const found = TOOLS.find((t) => t.id === params.id);
    if (found) setTool(found);
  }, [params.id]);

  const handleUpload = async () => {
    if (!file || !tool) return;
    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setJobId(data.job_id);
      await fetch(`/api/convert?job_id=${data.job_id}&target_format=${tool.to}`, { method: "POST" });
      setStatus("processing");
      checkStatus(data.job_id);
    } catch (e) {
      setStatus("error");
    }
  };

  const checkStatus = async (id: string) => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/status/${id}`);
      const data = await res.json();
      if (data.status === "completed") {
        clearInterval(interval);
        setStatus("completed");
      } else if (data.status === "failed") {
        clearInterval(interval);
        setStatus("error");
      }
    }, 2000);
  };

  if (!tool) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1 font-medium"><Home size={14} /> {t.allTools}</Link>
        <ChevronRight size={14} />
        <span className="font-bold text-slate-900">{tool.name[lang as keyof typeof tool.name]}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="glass-card rounded-[2.5rem] p-10 md:p-14 shadow-sm border-slate-200/60 mb-10">
            <h1 className="text-4xl font-black mb-4 text-slate-900">{tool.name[lang as keyof typeof tool.name]}</h1>
            <p className="text-slate-500 text-lg mb-12">{tool.description[lang as keyof typeof tool.description]}</p>

            {status === "idle" && (
              <div 
                className="border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }}
              >
                <input type="file" className="hidden" id="fileInput" onChange={(e) => e.target.files && setFile(e.target.files[0])} accept={tool.from.join(",")} />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100/50">
                    <Upload className="text-blue-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t.uploadClick}</h3>
                  <p className="text-slate-400 font-medium">{tool.from.join(", ")} (Max 20MB)</p>
                </label>
              </div>
            )}

            {file && status === "idle" && (
              <div className="mt-10 p-8 bg-slate-50 rounded-3xl flex items-center justify-between border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border border-slate-100">
                    <FileText className="text-blue-600" size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg break-all">{file.name}</p>
                    <p className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={handleUpload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-200 active:scale-95 text-lg"
                >
                  {t.convertNow}
                </button>
              </div>
            )}

            {(status === "uploading" || status === "processing") && (
              <div className="text-center py-24 bg-slate-50/50 rounded-[2rem]">
                <div className="relative w-32 h-32 mx-auto mb-10">
                   <div className="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div>
                   <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin duration-700"></div>
                   <RefreshCcw className="absolute inset-0 m-auto text-blue-600" size={48} />
                </div>
                <h3 className="text-3xl font-black mb-3">
                  {status === "uploading" ? "Uploading..." : "Converting..."}
                </h3>
                <p className="text-slate-500 font-medium">Sit tight, our cloud engines are on it!</p>
              </div>
            )}

            {status === "completed" && (
              <div className="text-center py-24 bg-emerald-50/60 rounded-[2.5rem] border border-emerald-100 shadow-sm">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-100">
                  <Download size={48} />
                </div>
                <h3 className="text-3xl font-black mb-8 text-emerald-900">{t.ready}</h3>
                <a 
                  href={`/api/download/${jobId}`}
                  className="inline-flex items-center gap-4 bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-[1.5rem] font-black transition-all shadow-2xl shadow-emerald-200 active:scale-95 text-xl"
                >
                  <Download size={24} /> {t.download}
                </a>
                <button 
                  onClick={() => {setFile(null); setStatus("idle");}}
                  className="block mx-auto mt-10 text-emerald-600 font-bold hover:underline text-lg"
                >
                  {t.another}
                </button>
              </div>
            )}

            {status === "error" && (
              <div className="text-center py-24 bg-red-50/50 rounded-[2rem] border border-red-100">
                <AlertCircle className="text-red-600 mx-auto mb-6" size={64} />
                <h3 className="text-2xl font-black mb-3 text-red-900">{t.error}</h3>
                <p className="text-red-500 mb-10 font-medium">Please try another file or refresh the page.</p>
                <button onClick={() => setStatus("idle")} className="text-slate-700 font-bold underline px-6 py-2 rounded-lg hover:bg-red-100 transition-colors">{t.tryAgain}</button>
              </div>
            )}
          </div>

          <div className="glass-card rounded-[2.5rem] p-10 md:p-14 border-slate-200/60">
             <h2 className="text-3xl font-black mb-10 text-slate-900">{t.faq}</h2>
             <div className="space-y-10">
                {tool.faqs.map((faq, index) => (
                  <div key={index} className="pb-10 border-b border-slate-100 last:border-0 last:pb-0">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Q: {faq.q[lang as keyof typeof faq.q]}</h3>
                    <p className="text-slate-500 text-lg leading-relaxed">{faq.a[lang as keyof typeof faq.a]}</p>
                  </div>
                ))}
                {tool.faqs.length === 0 && (
                   <div className="text-slate-400 italic">No FAQs available for this tool yet.</div>
                )}
             </div>
          </div>
        </div>

        <aside className="w-full lg:w-96 flex flex-col gap-10">
          <div className="sticky top-24">
            <div className="bg-slate-50/80 rounded-[2.5rem] p-8 text-center border border-slate-200 min-h-[500px] flex flex-col items-center justify-center text-slate-400 italic backdrop-blur-sm shadow-inner">
               <AdSlot />
               <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-slate-300">{t.advertisement}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
