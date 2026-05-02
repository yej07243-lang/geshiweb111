import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, Home, Image as ImageIcon, Music, ShieldCheck } from "lucide-react";
import AdSlot from "../../../components/AdSlot";
import { getRelatedTools, getToolById, TOOLS } from "../../../lib/tools";
import ToolConverter from "./ToolConverter";

type ToolPageProps = {
  params: {
    id: string;
  };
};

function toolKeyword(tool: (typeof TOOLS)[number]) {
  return tool.title;
}

function introText(tool: (typeof TOOLS)[number]) {
  return `${toolKeyword(tool)} is a free online tool for people who need to ${tool.action} without installing extra software. It is useful for office work, school assignments, website publishing, email attachments, content editing, and everyday file cleanup when the format you have is not the format you need. Upload a supported file, run the conversion in your browser workflow, and download the result when processing is complete. EasyFormat keeps the process simple for one-off tasks and repeat workflows: no signup, no dashboard, and no complicated settings. Files are temporarily processed for conversion and files auto delete after 30 minutes, so the tool is designed for fast, practical use rather than long-term file storage.`;
}

function whyUseText(tool: (typeof TOOLS)[number]) {
  return `This ${tool.name.toLowerCase()} tool is helpful when compatibility matters. Different platforms accept different formats, and a file that works in one app may not work in another. A clean online converter reduces that friction by giving you a focused path from upload to output. You do not need to open a heavy editor, search for export menus, or install a desktop utility for a small conversion job. The tool is also helpful when you are using a shared computer or mobile device and only need the final file. For best results, start with a clear source file, review the download, and keep a local copy of important originals.`;
}

function detailedToolGuide(tool: (typeof TOOLS)[number]) {
  const categoryCopy =
    tool.category === "document"
      ? "Document formats carry layout, text structure, fonts, images, tables, and editing expectations. A document converter should be used with a review step because the result may need small adjustments before it is sent to a client, submitted to a portal, or archived."
      : tool.category === "audio"
        ? "Audio formats balance compatibility, file size, playback support, bitrate, and quality expectations. An audio converter should be used with a listening check because lossy output can change detail, loudness, or perceived clarity depending on the source and target format."
      : "Image formats balance file size, compatibility, transparency, sharpness, and compression. An image converter should be used with a visual review step because the output may change quality, background behavior, or file weight depending on the original image.";

  return [
    `${tool.title} is built for a common file preparation problem: the file you have is not the file your next step requires. That next step might be an upload form, an email attachment, a website image slot, a document review process, a school assignment, or a customer delivery. Instead of opening a large editor for one export, EasyFormat gives you a focused browser workflow for ${tool.action}. The page shows supported input formats, the output format, a direct upload area, conversion steps, FAQ answers, and related tools so users can finish the task without guessing where to go next.`,
    `${categoryCopy} For the best result, start with a clean source file that opens correctly on your device. Avoid password-protected, damaged, or unusually complex files when possible. After downloading the converted output, open it and check the important details: text, page breaks, image clarity, transparency, table alignment, file size, and whether the receiving platform accepts the final extension. This quick review is especially important when the file will be used in a public website, business workflow, school submission, or official document exchange.`,
    `EasyFormat also keeps each tool connected to nearby workflows. A user who converts a PDF to Word may later need Word to PDF after editing. A user who converts PNG to JPG may then need image compression for upload limits. A user who works with WebP may need JPG for compatibility and PNG for editing. A user converting audio may need a format that works better for playback, archiving, editing, or sharing. Internal links on this page are not decorative; they help users move through a realistic file preparation process. Choose the tool that matches the output you need, keep the original until the result is accepted, and use related converters only when the destination actually requires another change.`,
    `File handling should stay practical and cautious. EasyFormat processes files temporarily for the selected conversion and files auto delete after 30 minutes. That short retention period is useful for everyday tasks, but no online converter should be treated as the right place for every file. Avoid uploading highly sensitive legal, medical, financial, confidential, or unauthorized content. For ordinary files, the workflow is simple: upload, convert, download, review, and continue with your larger task.`,
  ];
}

const featureItems = [
  "Free online conversion with no account required.",
  "Clear upload, processing, error, and download states.",
  "Temporary file handling with automatic deletion after 30 minutes.",
  "Focused format support so users choose the right converter quickly.",
  "Related tool links for common next steps and alternative formats.",
];

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ id: tool.slug }));
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolById(params.id);
  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: {
      absolute: tool.seoTitle,
    },
    description: tool.seoDescription,
    alternates: {
      canonical: `https://easyformat.co/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `https://easyformat.co/tools/${tool.slug}`,
      siteName: "EasyFormat",
      type: "website",
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolById(params.id);
  if (!tool) notFound();

  const Icon = tool.category === "document" ? FileText : tool.category === "audio" ? Music : ImageIcon;
  const relatedTools = getRelatedTools(tool);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `https://easyformat.co/tools/${tool.slug}`,
    description: tool.seoDescription,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      <section className="soft-band border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <nav className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="focus-ring inline-flex items-center gap-1 rounded-md hover:text-teal-800">
              <Home size={15} />
              All tools
            </Link>
            <span>/</span>
            <span className="text-slate-900">{tool.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-teal-700 text-white shadow-sm">
                <Icon size={25} />
              </div>
              <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">{tool.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{introText(tool)}</p>
            </div>

            <div className="surface rounded-lg p-5">
              <p className="text-sm font-black uppercase text-teal-800">Supported input</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.inputFormats.map((ext) => (
                  <span key={ext} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-800">
                    {ext}
                  </span>
                ))}
              </div>
              <div className="mt-5 rounded-md bg-amber-100 px-3 py-2 text-sm font-black text-amber-900">
                Output: {tool.outputFormat.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <ToolConverter tool={tool} />
          <AdSlot label="Advertisement" size="leaderboard" />

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">How to use this tool</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-3">
              {tool.howToSteps.map((step, index) => (
                <li key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="mt-4 text-sm font-bold leading-6 text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">Why use this tool</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{whyUseText(tool)}</p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">Features</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {featureItems.map((feature) => (
                <div key={feature} className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                  {feature}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">About this converter</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
              <p>{tool.about}</p>
              <p>
                The converter is built for straightforward browser-based tasks where speed and clarity are more important than advanced editing. It works best when the source file is not damaged, password protected, or unusually complex. Some conversions can change visual quality, layout, transparency, fonts, or compression depending on the source format and output format. Always review the downloaded result before using it in a final document, production website, customer delivery, or official submission.
              </p>
              <p>
                EasyFormat also links to related converters so you can continue working without searching again. For example, a user converting images may also need compression, a user working with documents may need both PDF creation and editable Word output, and a user converting audio may need a different playback or archive format. These internal links help you move between common file conversion tasks while keeping every page focused on a specific keyword and use case.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">Detailed guide</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
              {detailedToolGuide(tool).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <AdSlot label="Advertisement" size="leaderboard" />

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">FAQ</h2>
            <div className="mt-5 divide-y divide-slate-200">
              {tool.faq.map((faq) => (
                <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="font-black text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">Related tools</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="focus-ring group flex items-center justify-between rounded-md border border-slate-200 p-4 font-black text-slate-900 transition hover:border-teal-600 hover:text-teal-800"
                >
                  {relatedTool.name}
                  <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div className="surface rounded-lg p-4">
            <AdSlot label="Advertisement" size="sidebar" />
          </div>

          <AdSlot label="Advertisement" size="inline" />

          <div className="rounded-lg border border-teal-100 bg-teal-50 p-5">
            <ShieldCheck className="mb-4 text-teal-800" size={24} />
            <h2 className="text-lg font-black text-slate-950">Temporary file handling</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Uploaded and converted files are deleted automatically after 30 minutes.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-black text-slate-950">Need another format?</h2>
            <div className="mt-4 space-y-3">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="focus-ring flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm font-black text-slate-800 transition hover:border-teal-700 hover:text-teal-800"
                >
                  {relatedTool.name}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
