import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About EasyFormat",
  description: "Learn about EasyFormat, a simple no-signup online file conversion tool.",
  alternates: {
    canonical: "https://easyformat.co/about",
  },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-black text-slate-950">About EasyFormat</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <p>
          EasyFormat is a lightweight online file conversion tool focused on simple, fast, no-signup conversion. It is designed
          for everyday document and image tasks where you need a result quickly without installing extra software.
        </p>
        <p>
          Current supported tools include document converters such as PDF to Word and Word to PDF, plus image tools such as JPG
          to PNG, PNG to JPG, WebP to JPG, and image compression.
        </p>
        <p>
          EasyFormat keeps the workflow direct: choose a tool, upload a supported file, convert it, and download the result.
          Uploaded and converted files are deleted automatically after 30 minutes.
        </p>
      </div>
    </article>
  );
}
