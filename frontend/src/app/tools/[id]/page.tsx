import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, Home, Image as ImageIcon, ShieldCheck } from "lucide-react";
import AdSlot from "../../../components/AdSlot";
import { getRelatedTools, getToolById, TOOLS } from "../../../lib/tools";
import ToolConverter from "./ToolConverter";

type ToolPageProps = {
  params: {
    id: string;
  };
};

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

  const Icon = tool.category === "document" ? FileText : ImageIcon;
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
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{tool.description}</p>
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
            <h2 className="text-2xl font-black text-slate-950">About this converter</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{tool.about}</p>
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
            <h2 className="text-xl font-black text-slate-950">FAQ</h2>
            <div className="mt-5 space-y-5">
              {tool.faq.map((faq) => (
                <div key={faq.question} className="border-t border-slate-200 pt-5">
                  <h3 className="font-black text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
