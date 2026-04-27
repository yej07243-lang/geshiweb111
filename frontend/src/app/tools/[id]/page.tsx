"use client";

import { useEffect, useState } from "react";
import { TOOLS, Tool } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";
import { Upload, File, CheckCircle2, AlertCircle, Loader2, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ToolPage({ params }: { params: { id: string } }) {
  const tool = TOOLS.find((t) => t.id === params.id);
  if (!tool) notFound();

  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "completed" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 20 * 1024 * 1024) {
        setError("File is too large (max 20MB)");
        return;
      }
      setFile(selectedFile);
      setError(null);
      setStatus("idle");
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 1. Upload
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { job_id } = await uploadRes.json();
      setJobId(job_id);

      // 2. Start Convert
      setStatus("processing");
      const convertRes = await fetch(`/api/convert?job_id=${job_id}&target_format=${tool.to}`, {
        method: "POST",
      });
      if (!convertRes.ok) throw new Error("Conversion start failed");

      // 3. Poll Status
      pollStatus(job_id);
    } catch (err: any) {
      setError(err.message);
      setStatus("failed");
    }
  };

  const pollStatus = async (id: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/status/${id}`);
        const { status: jobStatus } = await res.json();
        if (jobStatus === "completed") {
          setStatus("completed");
          clearInterval(interval);
        } else if (jobStatus === "failed") {
          setStatus("failed");
          setError("Conversion failed");
          clearInterval(interval);
        }
      } catch (err) {
        clearInterval(interval);
      }
    }, 2000);
  };

  const handleDownload = () => {
    if (jobId) {
      window.location.href = `/api/download/${jobId}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Tools
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{tool.seoTitle}</h1>
        <p className="text-gray-600">{tool.seoDesc}</p>
      </div>

      <AdSlot position="top" />

      <div className="bg-white border rounded-3xl p-8 md:p-12 shadow-sm mb-12">
        {status === "idle" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept={tool.from.join(",")}
              />
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-blue-600" />
              </div>
              <p className="text-lg font-medium text-gray-900">
                {file ? file.name : "Click or drag file to upload"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: {tool.from.join(", ")} (Max 20MB)
              </p>
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
            <button
              onClick={handleConvert}
              disabled={!file}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all"
            >
              Convert Now
            </button>
          </div>
        )}

        {(status === "uploading" || status === "processing") && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">
              {status === "uploading" ? "Uploading your file..." : "Converting..."}
            </h2>
            <p className="text-gray-500">Please wait while we process your request.</p>
          </div>
        )}

        {status === "completed" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Conversion Ready!</h2>
            <p className="text-gray-500 mb-8">Your file has been converted successfully.</p>
            
            <AdSlot position="result" />

            <button
              onClick={handleDownload}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center"
            >
              <Download className="mr-2" />
              Download Converted File
            </button>
            <button
              onClick={() => { setStatus("idle"); setFile(null); }}
              className="mt-4 text-gray-500 hover:text-blue-600 font-medium"
            >
              Convert another file
            </button>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-600 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-8">{error || "Please try again with a different file."}</p>
            <button
              onClick={() => { setStatus("idle"); setFile(null); }}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {tool.faqs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {tool.faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="font-bold mb-2">Q: {faq.q}</h3>
                <p className="text-gray-600">A: {faq.a}</p>
              </div>
            ))}
          </div>
          {/* FAQ Schema for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": tool.faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              })
            }}
          />
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOOLS.filter(t => t.id !== tool.id).slice(0, 4).map(t => (
            <Link key={t.id} href={`/tools/${t.id}`} className="p-4 border rounded-xl hover:border-blue-500 flex items-center justify-between group">
              <span className="font-medium">{t.name}</span>
              <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
