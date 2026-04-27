"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TOOLS, Tool } from "../../../lib/tools";
import AdSlot from "../../../components/AdSlot";
import { Upload, FileText, Download, RefreshCcw, AlertCircle, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function ToolPage() {
  const params = useParams();
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
      const res = await fetch("http://localhost:8000/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setJobId(data.job_id);
      await fetch(`http://localhost:8000/api/convert?job_id=${data.job_id}&target_format=${tool.to}`, { method: "POST" });
      setStatus("processing");
      checkStatus(data.job_id);
    } catch (e) {
      setStatus("error");
    }
  };

  const checkStatus = async (id: string) => {
    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:8000/api/status/${id}`);
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1"><Home size={14} /> Home</Link>
        <ChevronRight size={14} />
        <span className="font-medium text-slate-900">{tool.name}</span>
      </nav>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="glass-card rounded-[2rem] p-8 md:p-12 shadow-sm border-slate-200/60 mb-8">
            <h1 className="text-3xl font-bold mb-2 text-slate-900">{tool.name}</h1>
            <p className="text-slate-500 mb-10">{tool.description}</p>
            {status === "idle" && (
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }}>
                <input type="file" className="hidden" id="fileInput" onChange={(e) => e.target.files && setFile(e.target.files[0])} accept={tool.from.join(",")} />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><Upload className="text-blue-600" size={32} /></div>
                  <h3 className="text-xl font-bold mb-2">Click or drag file to upload</h3>
                  <p className="text-slate-400 text-sm">Supported formats: {tool.from.join(", ")} (Max 20MB)</p>
                </label>
              </div>
            )}
            {file && status === "idle" && (
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><FileText className="text-blue-600" /></div>
                  <div><p className="font-medium text-slate-900 break-all">{file.name}</p><p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p></div>
                </div>
                <button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95">Convert Now</button>
              </div>
            )}
            {(status === "uploading" || status === "processing") && (
              <div className="text-center py-20">
                <div className="relative w-24 h-24 mx-auto mb-8">
                   <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                   <RefreshCcw className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{status === "uploading" ? "Uploading your file..." : "Processing conversion..."}</h3>
                <p className="text-slate-500 italic text-sm">This usually takes just a few seconds.</p>
              </div>
            )}
            {status === "completed" && (
              <div className="text-center py-20 bg-emerald-50/50 rounded-[2rem] border border-emerald-100">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><Download size={40} /></div>
                <h3 className="text-2xl font-bold mb-6 text-emerald-900">Your file is ready!</h3>
                <a href={`http://localhost:8000/api/download/${jobId}`} className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-extrabold transition-all shadow-xl shadow-emerald-200 active:scale-95"><Download size={20} /> Download File</a>
                <button onClick={() => {setFile(null); setStatus("idle");}} className="block mx-auto mt-6 text-emerald-600 font-medium hover:underline text-sm">Convert another file</button>
              </div>
            )}
            {status === "error" && (
              <div className="text-center py-20 bg-red-50/50 rounded-[2rem] border border-red-100">
                <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2 text-red-900">Conversion failed</h3>
                <p className="text-red-500 mb-6">Something went wrong. Please try again or check your file.</p>
                <button onClick={() => setStatus("idle")} className="text-slate-600 underline">Try again</button>
              </div>
            )}
          </div>
          <div className="glass-card rounded-[2rem] p-8 md:p-12 border-slate-200/60">
             <h2 className="text-2xl font-bold mb-8 text-slate-900">Frequently Asked Questions</h2>
             <div className="space-y-6">
                {tool.faqs.map((faq, index) => (
                  <div key={index} className="pb-6 border-b border-slate-100 last:border-0">
                    <h3 className="font-bold text-slate-800 mb-2">Q: {faq.q}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <div className="sticky top-8">
            <div className="bg-slate-100 rounded-[2rem] p-6 text-center border border-slate-200 min-h-[400px] flex flex-col items-center justify-center text-slate-400 italic">
               <AdSlot />
               <p className="mt-4 text-xs font-sans not-italic uppercase tracking-widest text-slate-400">Advertisement</p>
            </div>
            <div className="mt-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] text-white">
              <h4 className="font-bold mb-3">Why us?</h4>
              <ul className="text-sm space-y-3 text-slate-300">
                <li className="flex gap-2"> - 100% Free</li>
                <li className="flex gap-2"> - No Registration</li>
                <li className="flex gap-2"> - SSL Encryption</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}