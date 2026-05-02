"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Upload } from "lucide-react";
import { TOOLS } from "../lib/tools";

function findToolsForExtension(ext: string) {
  return TOOLS.filter((tool) => tool.inputFormats.includes(ext));
}

export default function HomeUploadEntry() {
  const [fileName, setFileName] = useState("");
  const [extension, setExtension] = useState("");

  const matches = useMemo(() => findToolsForExtension(extension), [extension]);

  const handleFile = (file?: File) => {
    if (!file) return;
    const ext = `.${file.name.split(".").pop()?.toLowerCase() || ""}`;
    setFileName(file.name);
    setExtension(ext);
  };

  return (
    <div className="surface rounded-lg p-4">
      <div
        className="rounded-md border-2 border-dashed border-slate-300 bg-white p-6 text-center transition hover:border-teal-700 hover:bg-teal-50/60"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFile(event.dataTransfer.files[0]);
        }}
      >
        <input
          id="home-upload"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.mp3,.flac,.aac"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
        <label htmlFor="home-upload" className="focus-ring inline-flex cursor-pointer flex-col items-center rounded-md">
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-teal-700 text-white">
            <Upload size={26} />
          </span>
          <span className="text-xl font-black text-slate-950">Drag and drop a file</span>
          <span className="mt-2 text-sm font-bold text-slate-500">PDF, Word, JPG, PNG, WebP, MP3, FLAC, AAC · Max 200MB</span>
        </label>
      </div>

      {fileName && (
        <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-600">Selected file: {fileName}</p>
          {matches.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {matches.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="focus-ring inline-flex h-10 items-center gap-2 rounded-md bg-teal-700 px-3 text-sm font-black text-white transition hover:bg-teal-800"
                >
                  Open {tool.name}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm font-bold text-red-600">This file type is not supported yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
