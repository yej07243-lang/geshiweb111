import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2, FileText, Image as ImageIcon, ShieldCheck, TimerReset, UserX, Zap } from "lucide-react";
import AdSlot from "../components/AdSlot";
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
            <div className="rounded-md border border-slate-200 bg-slate-950 p-4 text-white">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-teal-200">Popular converters</p>
                  <p className="text-2xl font-black">Start converting</p>
                </div>
                <FileCheck2 className="text-amber-300" size={32} />
              </div>
              <div className="space-y-3">
                {TOOLS.slice(0, 4).map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="focus-ring flex items-center justify-between rounded-md bg-white/10 p-4 transition hover:bg-white/15"
                  >
                    <span>
                      <span className="block font-black">{tool.name}</span>
                      <span className="text-sm text-slate-300">
                        {tool.inputFormats.join(", ")} {"->"} {tool.outputFormat.toUpperCase()}
                      </span>
                    </span>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-teal-800">All tools</p>
            <h2 className="text-3xl font-black text-slate-950 md:text-4xl">Choose a converter</h2>
          </div>
          <p className="max-w-xl text-slate-600">Convert PDF, Word, JPG, PNG, WebP and image files with a simple no-signup workflow.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => {
            const Icon = tool.category === "document" ? FileText : ImageIcon;
            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="focus-ring group surface rounded-lg p-6 transition hover:-translate-y-1 hover:border-teal-500 hover:shadow-xl"
              >
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
                  <ArrowRight className="text-teal-700 transition group-hover:translate-x-1" size={18} />
                </div>
              </Link>
            );
          })}
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
              EasyFormat is a lightweight online file converter for common document and image tasks. It is designed for people who need to quickly convert a PDF, Word document, JPG, PNG, WebP image, or compressed image without installing extra software. The goal is to make file conversion feel simple: choose the right tool, upload one file, start the conversion, and download the result.
            </p>
            <p>
              Online file converters are useful when you are working across different apps, devices, or publishing workflows. A document may need to become a PDF before sharing, a PDF may need to become an editable Word file, or an image may need a more compatible format before it can be uploaded to a website. EasyFormat focuses on these practical everyday conversions instead of complicated editing features.
            </p>
            <p>
              The current supported file types include PDF, DOC, DOCX, JPG, JPEG, PNG, and WebP. The available tools include PDF to Word, Word to PDF, JPG to PNG, PNG to JPG, WebP to JPG, and image compression. More tools can be added over time while keeping the same simple no-signup workflow.
            </p>
            <p>
              Privacy and temporary file handling are important for a conversion website. EasyFormat processes uploaded files only for the selected conversion task. Files are temporarily stored while the conversion is running and are deleted automatically after 30 minutes. You should still avoid uploading highly sensitive documents to any online converter, but the service is built to avoid long-term storage of uploaded files.
            </p>
            <p>
              EasyFormat does not require an account. There is no signup step, no dashboard to configure, and no software to install. This makes it useful for fast one-off conversions when you simply need the final file and want to get back to work.
            </p>
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
