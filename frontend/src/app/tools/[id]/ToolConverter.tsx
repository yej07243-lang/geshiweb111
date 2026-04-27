"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Download, FileText, Loader2, RefreshCcw, Upload } from "lucide-react";
import type { Tool } from "../../../lib/tools";

type ConvertStatus = "idle" | "uploading" | "processing" | "completed" | "error";
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export default function ToolConverter({ tool }: { tool: Tool }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ConvertStatus>("idle");
  const [jobId, setJobId] = useState<string | null>(null);
  const [errorText, setErrorText] = useState("");

  const isWorking = status === "uploading" || status === "processing";

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setJobId(null);
    setErrorText("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const selectFile = (nextFile: File) => {
    const fileExt = `.${nextFile.name.split(".").pop()?.toLowerCase() || ""}`;
    if (!tool.inputFormats.includes(fileExt)) {
      setFile(null);
      setErrorText("This file type is not supported by the selected tool.");
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setErrorText("File is larger than 20MB.");
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
          setErrorText("Conversion failed. Please try another file.");
        }
      } catch {
        window.clearInterval(interval);
        setStatus("error");
        setErrorText("Conversion failed. Please try again.");
      }
    }, 1800);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorText("Choose a file first.");
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

      const convert = await fetch(`/api/convert?job_id=${data.job_id}&target_format=${tool.outputFormat}`, { method: "POST" });
      if (!convert.ok) throw new Error("Convert failed");

      setStatus("processing");
      checkStatus(data.job_id);
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Conversion failed");
    }
  };

  return (
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
              accept={tool.accept}
              onChange={(event) => {
                if (event.target.files?.[0]) selectFile(event.target.files[0]);
              }}
            />
            <label htmlFor="fileInput" className="focus-ring inline-flex cursor-pointer flex-col items-center rounded-md">
              <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-md bg-teal-700 text-white shadow-lg shadow-teal-900/10">
                <Upload size={34} />
              </span>
              <span className="text-2xl font-black text-slate-950">Drop a file here or click to choose</span>
              <span className="mt-3 text-sm font-bold text-slate-500">
                {tool.inputFormats.join(", ")} · Max 20MB
              </span>
            </label>
          </div>

          {file && (
            <div className="mt-5 flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-teal-800 shadow-sm">
                  <FileText size={23} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase text-slate-500">Selected file</p>
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
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isWorking}
                  className="focus-ring inline-flex h-11 items-center justify-center rounded-md bg-teal-700 px-5 text-sm font-black text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Convert Now
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
          <h2 className="text-3xl font-black text-slate-950">{status === "uploading" ? "Uploading..." : "Converting..."}</h2>
          <p className="mt-3 text-base font-medium text-slate-600">This usually takes a few seconds.</p>
        </div>
      )}

      {status === "completed" && (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg bg-emerald-50 p-8 text-center">
          <CheckCircle2 className="mb-6 text-emerald-700" size={62} />
          <h2 className="text-3xl font-black text-slate-950">Your file is ready!</h2>
          <a
            href={`/api/download/${jobId}`}
            className="focus-ring mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-base font-black text-white transition hover:bg-emerald-800"
          >
            <Download size={20} />
            Download File
          </a>
          <button
            type="button"
            onClick={reset}
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-black text-emerald-800 hover:bg-emerald-100"
          >
            <RefreshCcw size={16} />
            Convert another file
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg bg-red-50 p-8 text-center">
          <AlertCircle className="mb-6 text-red-700" size={62} />
          <h2 className="text-3xl font-black text-slate-950">Conversion failed</h2>
          <p className="mt-3 text-base font-bold text-red-700">{errorText || "Conversion failed"}</p>
          <button
            type="button"
            onClick={reset}
            className="focus-ring mt-8 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-teal-800"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
