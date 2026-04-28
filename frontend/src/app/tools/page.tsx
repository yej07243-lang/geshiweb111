import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Image as ImageIcon, ShieldCheck, TimerReset, UserX, Zap } from "lucide-react";
import { TOOLS } from "../../lib/tools";

export const metadata: Metadata = {
  title: {
    absolute: "Online File Converter Tools | EasyFormat",
  },
  description:
    "Browse EasyFormat online file converter tools for PDF, Word, JPG, PNG, WebP, and image compression workflows.",
  alternates: {
    canonical: "https://easyformat.co/tools",
  },
};

const faq = [
  {
    question: "What tools are available on EasyFormat?",
    answer: "EasyFormat includes PDF to Word, Word to PDF, JPG to PNG, PNG to JPG, WebP to JPG, and image compression tools.",
  },
  {
    question: "Are the tools free?",
    answer: "Yes. The current converter tools are free to use without creating an account.",
  },
  {
    question: "How long are files stored?",
    answer: "Uploaded and converted files are deleted automatically after 30 minutes.",
  },
  {
    question: "Which tool should I choose?",
    answer: "Choose based on the file you have and the output format required by the app, website, or person receiving it.",
  },
];

const highlights = [
  { icon: UserX, title: "No signup", copy: "Open a tool, upload a file, convert, and download." },
  { icon: Zap, title: "Focused tools", copy: "Each page is built around one clear conversion job." },
  { icon: TimerReset, title: "Auto delete", copy: "Temporary files are deleted after 30 minutes." },
  { icon: ShieldCheck, title: "Practical safety", copy: "Use online conversion thoughtfully and keep local originals." },
];

function ToolListCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  const Icon = tool.category === "document" ? FileText : ImageIcon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="focus-ring group rounded-lg border border-slate-200 bg-white p-5 transition hover:border-teal-600 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-teal-800">
          <Icon size={22} />
        </span>
        <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-800">{tool.outputFormat.toUpperCase()}</span>
      </div>
      <h2 className="mt-5 text-xl font-black text-slate-950">{tool.name}</h2>
      <p className="mt-2 min-h-[56px] text-sm leading-7 text-slate-600">{tool.description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-black text-slate-700">
        <span>{tool.inputFormats.join(", ")}</span>
        <ArrowRight className="transition group-hover:translate-x-1" size={17} />
      </div>
    </Link>
  );
}

export default function ToolsIndexPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="soft-band border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <p className="text-sm font-black uppercase text-teal-800">All converters</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">Online File Converter Tools</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Browse every EasyFormat converter in one place. Convert documents and images online with focused tools for PDF, Word, JPG, PNG, WebP, and image compression tasks.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolListCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-3xl font-black text-slate-950">How to choose a converter</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
            <p>
              The easiest way to choose an online file converter is to start with the destination. If a form asks for a JPG image, use an image converter or compressor that produces a compatible image. If a teammate needs an editable document, use PDF to Word. If a file needs to be shared or printed with stable layout, use Word to PDF. EasyFormat keeps each tool page focused on one conversion so users do not have to sort through advanced export settings for a simple task.
            </p>
            <p>
              Document conversion and image conversion solve different problems. PDF is strong for final layout, while Word documents are better when text needs editing. JPG is widely accepted and often smaller for photos. PNG is useful for crisp graphics and screenshots. WebP is efficient for websites, but some older tools and upload forms still prefer JPG. Compression is useful when the format is correct but the file is too heavy for upload, email, page speed, or storage.
            </p>
            <p>
              A good workflow is simple: choose the tool that matches your current file and required output, upload the file, run the conversion, download the result, and review it before using it. Review matters because conversion can change layout, image quality, transparency, fonts, or file size. For important documents and images, keep the original file until you know the converted version works for the destination.
            </p>
            <p>
              EasyFormat is built for common one-file tasks rather than complex editing. The tools are useful for school assignments, office documents, website images, support attachments, marketplace photos, resumes, forms, and everyday sharing. They are also helpful when you are on a device without the original software installed. Instead of opening a large desktop app for one export, you can use a focused browser-based converter and finish the job in a few steps.
            </p>
            <p>
              File safety matters with any online converter. EasyFormat processes files temporarily for the selected conversion and files auto delete after 30 minutes. That temporary handling is useful for everyday work, but it does not mean every file belongs online. Avoid uploading highly sensitive, confidential, legal, medical, financial, or unauthorized material. Keep local originals, check the downloaded result, and use the related links on each tool page when your task naturally continues into another format.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <item.icon className="mb-4 text-teal-700" size={24} />
              <h2 className="text-lg font-black text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-3xl font-black text-slate-950">FAQ</h2>
        <div className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {faq.map((item) => (
            <div key={item.question} className="p-6">
              <h3 className="text-lg font-black text-slate-950">{item.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link href="/convert-pdf-to-word" className="focus-ring rounded-md border border-slate-200 bg-white p-4 text-sm font-black text-slate-900 hover:border-teal-700 hover:text-teal-800">
            Convert PDF to Word
          </Link>
          <Link href="/reduce-image-size-online" className="focus-ring rounded-md border border-slate-200 bg-white p-4 text-sm font-black text-slate-900 hover:border-teal-700 hover:text-teal-800">
            Reduce image size online
          </Link>
          <Link href="/free-file-converter-online" className="focus-ring rounded-md border border-slate-200 bg-white p-4 text-sm font-black text-slate-900 hover:border-teal-700 hover:text-teal-800">
            Free file converter online
          </Link>
        </div>
      </section>
    </div>
  );
}
