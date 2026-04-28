import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2, FileText, Image as ImageIcon, ShieldCheck, TimerReset, Upload, UserX, Zap } from "lucide-react";
import AdSlot from "../components/AdSlot";
import HomeUploadEntry from "../components/HomeUploadEntry";
import { TOOLS } from "../lib/tools";

export const metadata: Metadata = {
  title: {
    absolute: "Free Online File Converter | EasyFormat",
  },
  description:
    "Convert PDF, Word, JPG, PNG, WebP and more online for free. Fast, simple, secure, no signup required.",
  alternates: {
    canonical: "https://easyformat.co/",
  },
};

const benefits = [
  { icon: CheckCircle2, label: "Free to use" },
  { icon: UserX, label: "No signup" },
  { icon: Zap, label: "Fast conversion" },
  { icon: TimerReset, label: "Files auto-delete after 30 minutes" },
];

const popularTools = TOOLS.slice(0, 4);

const faqs = [
  {
    question: "Is EasyFormat free to use?",
    answer: "Yes. EasyFormat provides free online file conversion tools for supported documents and images.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. You can choose a tool, upload a file, convert it, and download the result without signing up.",
  },
  {
    question: "How long are uploaded files stored?",
    answer: "Uploaded and converted files are stored temporarily and deleted automatically after 30 minutes.",
  },
  {
    question: "What file types are supported?",
    answer: "EasyFormat currently supports PDF, DOC, DOCX, JPG, JPEG, PNG, and WebP workflows.",
  },
  {
    question: "Is it safe to upload files?",
    answer: "Files are processed for conversion and deleted automatically, but you should not upload highly sensitive documents.",
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EasyFormat",
  url: "https://easyformat.co",
  description:
    "Convert PDF, Word, JPG, PNG, WebP and more online for free. Fast, simple, secure, no signup required.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://easyformat.co/tools/{search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  const Icon = tool.category === "document" ? FileText : ImageIcon;

  return (
    <div className="surface flex h-full flex-col rounded-lg p-6 transition hover:-translate-y-1 hover:border-teal-500 hover:shadow-xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-teal-50 text-teal-800">
          <Icon size={24} />
        </span>
        <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-800">
          {tool.outputFormat.toUpperCase()}
        </span>
      </div>
      <h3 className="text-xl font-black text-slate-950">{tool.name}</h3>
      <p className="mt-3 min-h-[56px] text-sm leading-7 text-slate-600">{tool.description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-bold text-slate-500">
        <span>{tool.inputFormats.join(", ")}</span>
        <span>{tool.outputFormat.toUpperCase()}</span>
      </div>
      <Link
        href={`/tools/${tool.slug}`}
        className="focus-ring mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-black text-white transition hover:bg-teal-800"
      >
        Use this tool
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      <section className="soft-band border-b border-slate-200">
        <div className="mx-auto grid min-h-[580px] max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-teal-200 bg-white/80 px-3 py-2 text-sm font-black text-teal-800 shadow-sm">
              <FileCheck2 size={16} />
              Free online conversion tools
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-slate-950 md:text-7xl">
              Free Online File Converter
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 md:text-xl">
              Convert documents and images online in seconds. No signup required.
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.label} className="flex items-center gap-3 rounded-md border border-slate-200 bg-white/80 px-4 py-3 font-bold text-slate-800">
                  <benefit.icon className="text-teal-700" size={19} />
                  {benefit.label}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#tools"
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-teal-700 px-6 text-base font-black text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-800"
              >
                Choose a tool
                <ArrowRight size={19} />
              </Link>
              <Link
                href="/tools/pdf-to-word"
                className="focus-ring inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-base font-black text-slate-900 transition hover:border-teal-700 hover:text-teal-800"
              >
                PDF to Word
              </Link>
            </div>
          </div>

          <div className="surface rounded-lg p-4">
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <div className="mb-4 flex items-center justify-between px-1">
                <div>
                  <p className="text-sm font-black uppercase text-teal-800">Upload entry</p>
                  <h2 className="text-2xl font-black text-slate-950">Start with your file</h2>
                </div>
                <FileCheck2 className="text-amber-500" size={30} />
              </div>
              <HomeUploadEntry />
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-4 py-16">
        <div className="surface mb-10 grid gap-6 rounded-lg p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-4">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-md bg-teal-700 text-white sm:flex">
              <Upload size={26} />
            </span>
            <div>
              <p className="text-sm font-black uppercase text-teal-800">Quick upload</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">Start with a popular converter</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Choose the file type you want to convert. The upload area is on each converter page so the workflow stays clear and reliable.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap md:justify-end">
            {popularTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="focus-ring inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-black text-slate-800 transition hover:border-teal-700 hover:text-teal-800"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-teal-800">Popular tools</p>
            <h2 className="text-3xl font-black text-slate-950 md:text-4xl">Most used converters</h2>
          </div>
          <p className="max-w-xl text-slate-600">Start with the four most common conversion workflows.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="mb-8 mt-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-teal-800">All tools</p>
            <h2 className="text-3xl font-black text-slate-950 md:text-4xl">All file converters</h2>
          </div>
          <p className="max-w-xl text-slate-600">Convert PDF, Word, JPG, PNG, WebP and image files with a simple no-signup workflow.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-8">
        <AdSlot label="Advertisement" size="leaderboard" />
      </div>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-3xl font-black text-slate-950">What is EasyFormat?</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
            <p>
              A file converter is a tool that changes a file from one format into another format so it can be opened, edited, shared, printed, uploaded, or archived in the way you need. EasyFormat is a free online file converter built for common document and image tasks. It helps you convert a PDF to Word, create a PDF from a Word document, change JPG images into PNG files, save PNG images as JPG files, convert WebP images to JPG, and compress images for easier sharing. The goal is to make file conversion practical and fast without making users install software or create an account.
            </p>
            <p>
              Online tools are useful because files often move between different apps, devices, teams, and publishing systems. A PDF converter can help when a document needs to become easier to edit or easier to distribute. An image converter can help when a website, marketplace, email service, or design workflow requires a specific image format. Instead of opening a large desktop app for a small task, you can choose a focused converter, upload one file, run the conversion, and download the result in a few steps.
            </p>
            <p>
              EasyFormat supports formats used in everyday work: PDF, DOC, DOCX, JPG, JPEG, PNG, and WebP. These formats cover document sharing, editable office documents, web images, photo files, and compressed modern image files. PDF is often used for final documents because it preserves layout. Word formats are useful when text still needs to be edited. JPG is widely compatible and often smaller for photos. PNG is helpful when clarity matters. WebP is efficient for the web but may not be accepted everywhere, which is why WebP to JPG conversion remains useful.
            </p>
            <p>
              Security and temporary file handling are important for any online converter. EasyFormat processes uploaded files only for the selected conversion task. Files are temporarily stored while the conversion is running and are deleted automatically after 30 minutes. This short retention window helps keep the service practical while avoiding long-term storage of user files. You should still avoid uploading highly sensitive, confidential, legal, medical, or financial documents to any online service, but the workflow is designed around temporary processing rather than permanent storage.
            </p>
            <p>
              A no signup workflow is especially helpful for one-off conversions. Many people only need to convert a single file before sending an email, uploading an image, preparing a document, or fixing a format issue. EasyFormat keeps that path short: choose a converter, upload your file, click the conversion button, and download the new file. There is no dashboard to configure, no trial form, and no software installer. The interface focuses on the conversion job itself.
            </p>
            <p>
              The tools are also organized around clear use cases. Use the PDF to Word converter when you need editable text from a PDF. Use the Word to PDF converter when you want a document that is easier to share or print consistently. Use the JPG to PNG and PNG to JPG converters when you need image compatibility for websites or apps. Use the WebP to JPG converter when a platform does not accept WebP. Use image compression when a file is too large for upload, email, or page speed.
            </p>
            <p>
              EasyFormat is not meant to replace professional editing software. It is a quick online utility for common format changes. Conversion quality can depend on the source file, especially for complex PDFs, scanned documents, unusual fonts, transparent images, or heavily compressed files. The best results usually come from clean source files and simple layouts. When a file is important, download the result and review it before publishing or sending it.
            </p>
            <p>
              For website owners, students, office workers, creators, and anyone who handles mixed file formats, a reliable file converter can remove small blockers from daily work. EasyFormat keeps the experience direct, supports common formats, and provides an easy path from upload to download while reminding users that files auto delete after 30 minutes.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/blog" className="focus-ring inline-flex h-11 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-teal-800">
              Read file conversion guides
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-black text-slate-950">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-6">
              <h3 className="text-lg font-black text-slate-950">{faq.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Temporary storage", copy: "Files are deleted automatically after 30 minutes." },
            { icon: TimerReset, title: "Fast workflow", copy: "Choose a tool, upload, convert, and download in a few steps." },
            { icon: FileCheck2, title: "Common formats", copy: "Support for documents and images used in everyday work." },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-slate-200 p-6">
              <item.icon className="mb-5 text-teal-700" size={28} />
              <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
