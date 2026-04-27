"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Home,
  Image as ImageIcon,
  Loader2,
  RefreshCcw,
  ShieldCheck,
  Upload,
} from "lucide-react";
import AdSlot from "../../../components/AdSlot";
import { LanguageContext } from "../../../components/LanguageProvider";
import { dict } from "../../../lib/i18n";
import { Tool, TOOLS } from "../../../lib/tools";

type ConvertStatus = "idle" | "uploading" | "processing" | "completed" | "error";
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export default function ToolPage() {
  const params = useParams();
  const { lang } = useContext(LanguageContext);
  const t = dict[lang as keyof typeof dict] || dict.en;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [tool, setTool] = useState<Tool | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ConvertStatus>("idle");
  const [jobId, setJobId] = useState<string | null>(null);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const found = TOOLS.find((item) => item.id === params.id);
    setTool(found || null);
    setFile(null);
    setStatus("idle");
    setJobId(null);
    setErrorText("");
  }, [params.id]);

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setJobId(null);
    setErrorText("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const selectFile = (nextFile: File) => {
    if (!tool) return;

    const fileExt = `.${nextFile.name.split(".").pop()?.toLowerCase() || ""}`;
    if (!tool.from.includes(fileExt)) {
      setFile(null);
      setErrorText(t.unsupportedFile);
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setErrorText(t.fileTooLarge);
      return;
    }

    setErrorText("");
    setFile(nextFile);
  };

  const checkStatus = (id: string) => {
    const interval = window.setInterval(async () => {
      try {
        const res = await fetch(`/api/status/${id}`);
        const data = await res.json();
        if (data.status === "completed") {
          window.clearInterval(interval);
          setStatus("completed");
        }
        if (data.status === "failed") {
          window.clearInterval(interval);
          setStatus("error");
          setErrorText(t.error);
        }
      } catch {
        window.clearInterval(interval);
        setStatus("error");
        setErrorText(t.error);
      }
    }, 1800);
  };

  const handleUpload = async () => {
    if (!file || !tool) {
      setErrorText(t.fileRequired);
      return;
    }

    setStatus("uploading");
    setErrorText("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const upload = await fetch("/api/upload", { method: "POST", body: formData });
      if (!upload.ok) throw new Error("Upload failed");

      const data = await upload.json();
      setJobId(data.job_id);

      const convert = await fetch(`/api/convert?job_id=${data.job_id}&target_format=${tool.to}`, { method: "POST" });
      if (!convert.ok) throw new Error("Convert failed");

      setStatus("processing");
      checkStatus(data.job_id);
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : t.error);
    }
  };

  if (!tool) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24">
        <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-bold text-teal-800">
          <ArrowLeft size={17} />
          {t.allTools}
        </Link>
        <h1 className="mt-8 text-4xl font-black text-slate-950">{t.invalidTool}</h1>
      </div>
    );
  }

  const Icon = tool.category === "document" ? FileText : ImageIcon;
  const toolName = tool.name[lang as keyof typeof tool.name];
  const toolDescription = tool.description[lang as keyof typeof tool.description];
  const isWorking = status === "uploading" || status === "processing";

  return (
    <div>
      <section className="soft-band border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <nav className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="focus-ring inline-flex items-center gap-1 rounded-md hover:text-teal-800">
              <Home size={15} />
              {t.allTools}
            </Link>
            <span>/</span>
            <span className="text-slate-900">{toolName}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-teal-700 text-white shadow-sm">
                <Icon size={25} />
              </div>
              <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">{toolName}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{toolDescription}</p>
            </div>

            <div className="surface rounded-lg p-5">
              <p className="text-sm font-black uppercase text-teal-800">{t.supported}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.from.map((ext) => (
                  <span key={ext} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-800">
                    {ext}
                  </span>
                ))}
              </div>
              <div className="mt-5 rounded-md bg-amber-100 px-3 py-2 text-sm font-black text-amber-900">
                {t.maxSize}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_340px]">
        <div className="surface rounded-lg p-4 md:p-8">
          {status === "idle" && (
            <>
              <div
                className="rounded-lg border-2 border-dashed border-slate-300 bg-white p-8 text-center transition hover:border-teal-700 hover:bg-teal-50/50 md:p-12"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (event.dataTransfer.files[0]) selectFile(event.dataTransfer.files[0]);
                }}
              >
                <input
                  ref={inputRef}
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept={tool.from.join(",")}
                  onChange={(event) => {
                    if (event.target.files?.[0]) selectFile(event.target.files[0]);
                  }}
                />
                <label htmlFor="fileInput" className="focus-ring inline-flex cursor-pointer flex-col items-center rounded-md">
                  <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-md bg-teal-700 text-white shadow-lg shadow-teal-900/10">
                    <Upload size={34} />
                  </span>
                  <span className="text-2xl font-black text-slate-950">{t.uploadClick}</span>
                  <span className="mt-3 text-sm font-bold text-slate-500">{tool.from.join(", ")} · {t.maxSize}</span>
                </label>
              </div>

              {file && (
                <div className="mt-5 flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-teal-800 shadow-sm">
                      <FileText size={23} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase text-slate-500">{t.selectedFile}</p>
                      <p className="truncate text-base font-black text-slate-950">{file.name}</p>
                      <p className="text-sm font-bold text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={reset}
                      className="focus-ring inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-slate-500"
                    >
                      {t.reset}
                    </button>
                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={isWorking}
                      className="focus-ring inline-flex h-11 items-center justify-center rounded-md bg-teal-700 px-5 text-sm font-black text-white transition hover:bg-teal-800"
                    >
                      {t.convertNow}
                    </button>
                  </div>
                </div>
              )}

              {errorText && <p className="mt-4 text-sm font-bold text-red-600">{errorText}</p>}
            </>
          )}

          {isWorking && (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg bg-slate-50 p-8 text-center">
              <Loader2 className="mb-6 animate-spin text-teal-700" size={56} />
              <h2 className="text-3xl font-black text-slate-950">{status === "uploading" ? t.uploading : t.converting}</h2>
              <p className="mt-3 text-base font-medium text-slate-600">{t.working}</p>
            </div>
          )}

          {status === "completed" && (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg bg-emerald-50 p-8 text-center">
              <CheckCircle2 className="mb-6 text-emerald-700" size={62} />
              <h2 className="text-3xl font-black text-slate-950">{t.ready}</h2>
              <a
                href={`/api/download/${jobId}`}
                className="focus-ring mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-base font-black text-white transition hover:bg-emerald-800"
              >
                <Download size={20} />
                {t.download}
              </a>
              <button
                type="button"
                onClick={reset}
                className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-black text-emerald-800 hover:bg-emerald-100"
              >
                <RefreshCcw size={16} />
                {t.another}
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg bg-red-50 p-8 text-center">
              <AlertCircle className="mb-6 text-red-700" size={62} />
              <h2 className="text-3xl font-black text-slate-950">{t.error}</h2>
              <p className="mt-3 text-base font-bold text-red-700">{errorText || t.error}</p>
              <button
                type="button"
                onClick={reset}
                className="focus-ring mt-8 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-teal-800"
              >
                {t.tryAgain}
              </button>
            </div>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div className="surface rounded-lg p-4">
            <AdSlot label={t.advertisement} size="sidebar" />
          </div>

          <div className="rounded-lg border border-teal-100 bg-teal-50 p-5">
            <ShieldCheck className="mb-4 text-teal-800" size={24} />
            <h2 className="text-lg font-black text-slate-950">{t.privacyTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{t.privacyDesc}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-black text-slate-950">{t.howItWorks}</h2>
            <ol className="mt-4 space-y-3 text-sm font-medium leading-6 text-slate-600">
              {[t.stepChoose, t.stepUpload, t.stepDownload].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-black text-slate-950">{t.faq}</h2>
            <div className="mt-5 space-y-5">
              {tool.faqs.length > 0 ? (
                tool.faqs.map((faq) => (
                  <div key={faq.q.en} className="border-t border-slate-200 pt-5">
                    <h3 className="font-black text-slate-900">{faq.q[lang as keyof typeof faq.q]}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{faq.a[lang as keyof typeof faq.a]}</p>
                  </div>
                ))
              ) : (
                <p className="border-t border-slate-200 pt-5 text-sm leading-7 text-slate-600">{toolDescription}</p>
              )}
            </div>
          </div>
        </aside>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-10">
        <AdSlot label={t.advertisement} size="leaderboard" />
      </div>
    </div>
  );
}
