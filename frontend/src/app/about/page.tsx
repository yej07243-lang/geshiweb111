import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About EasyFormat File Converter | EasyFormat",
  description:
    "Learn about EasyFormat, a lightweight online file converter for PDF, Word, JPG, PNG, WebP, MP3, FLAC, AAC, and no-signup conversion workflows.",
  alternates: {
    canonical: "https://easyformat.co/about",
  },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-black text-slate-950">About EasyFormat</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <h2 className="text-2xl font-black text-slate-950">Simple online conversion</h2>
        <p>
          EasyFormat is a lightweight online file conversion tool focused on simple, fast, no-signup conversion. It is designed
          for everyday document, image, and audio tasks where you need a result quickly without installing extra software.
        </p>
        <h2 className="text-2xl font-black text-slate-950">Supported tools</h2>
        <p>
          Current supported tools include document converters such as PDF to Word and Word to PDF, image tools such as JPG
          to PNG, PNG to JPG, WebP to JPG, and image compression, plus audio tools such as MP3 to FLAC and FLAC to AAC.
        </p>
        <h2 className="text-2xl font-black text-slate-950">Temporary file handling</h2>
        <p>
          EasyFormat keeps the workflow direct: choose a tool, upload a supported file, convert it, and download the result.
          Uploaded and converted files are deleted automatically after 30 minutes.
        </p>
      </div>
    </article>
  );
}
