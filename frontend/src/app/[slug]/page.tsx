import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getSeoLandingPage, getSeoLandingSections, SEO_LANDING_PAGES } from "../../lib/seoLandingPages";
import { getRelatedTools, getToolById } from "../../lib/tools";

type SeoLandingRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return SEO_LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: SeoLandingRouteProps): Metadata {
  const page = getSeoLandingPage(params.slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: `https://easyformat.co/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://easyformat.co/${page.slug}`,
      siteName: "EasyFormat",
      type: "website",
    },
  };
}

export default function SeoLandingRoute({ params }: SeoLandingRouteProps) {
  const page = getSeoLandingPage(params.slug);
  if (!page) notFound();

  const tool = getToolById(page.toolSlug);
  const relatedTools = page.relatedTools.map((slug) => getToolById(slug)).filter(Boolean);
  const fallbackRelatedTools = tool ? getRelatedTools(tool) : [];
  const internalTools = relatedTools.length > 0 ? relatedTools : fallbackRelatedTools;
  const sections = getSeoLandingSections(page);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.description,
    url: `https://easyformat.co/${page.slug}`,
    about: page.keyword,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <section className="soft-band border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1fr_360px] lg:py-16">
          <div>
            <p className="text-sm font-black uppercase text-teal-800">{page.keyword}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{page.description}</p>
            {tool && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-teal-700 px-5 text-sm font-black text-white transition hover:bg-teal-800"
                >
                  Open {page.toolName}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/#tools"
                  className="focus-ring inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-black text-slate-900 transition hover:border-teal-700 hover:text-teal-800"
                >
                  Browse all tools
                </Link>
              </div>
            )}
          </div>

          <aside className="surface rounded-lg p-5">
            <p className="text-sm font-black uppercase text-teal-800">Tool entry</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">{page.toolName}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{page.toolIntro}</p>
            {tool && (
              <Link
                href={`/tools/${tool.slug}`}
                className="focus-ring mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-teal-800"
              >
                Use tool
                <ArrowRight size={17} />
              </Link>
            )}
            <div className="mt-5 space-y-2 text-sm font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-teal-700" size={17} />
                No signup required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-teal-700" size={17} />
                Temporary file handling
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-teal-700" size={17} />
                Files auto delete after 30 minutes
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-black text-slate-950">{section.heading}</h2>
              <div className="mt-4 space-y-5 text-base leading-8 text-slate-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">FAQ</h2>
            <div className="mt-5 divide-y divide-slate-200">
              {page.faq.map((faq) => (
                <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="font-black text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-black text-slate-950">Related tools</h2>
            <div className="mt-4 space-y-3">
              {internalTools.slice(0, 3).map((relatedTool) => (
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

          <div className="rounded-lg border border-teal-100 bg-teal-50 p-5">
            <h2 className="text-lg font-black text-slate-950">Internal links</h2>
            <div className="mt-4 space-y-3 text-sm font-bold">
              <Link href="/free-file-converter-online" className="block text-teal-800 hover:underline">
                Free file converter online
              </Link>
              <Link href="/convert-mp3-to-flac" className="block text-teal-800 hover:underline">
                Convert MP3 to FLAC
              </Link>
              <Link href="/convert-flac-to-aac" className="block text-teal-800 hover:underline">
                Convert FLAC to AAC
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
