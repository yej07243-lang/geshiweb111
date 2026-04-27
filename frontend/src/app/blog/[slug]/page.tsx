import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BLOG_ARTICLES, getArticleSections, getBlogArticle } from "../../../lib/blog";
import { getRelatedTools, getToolById } from "../../../lib/tools";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const article = getBlogArticle(params.slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: {
      absolute: `${article.title} | EasyFormat`,
    },
    description: article.description,
    alternates: {
      canonical: `https://easyformat.co/blog/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | EasyFormat`,
      description: article.description,
      url: `https://easyformat.co/blog/${article.slug}`,
      type: "article",
      siteName: "EasyFormat",
    },
  };
}

export default function BlogArticlePage({ params }: BlogPageProps) {
  const article = getBlogArticle(params.slug);
  if (!article) notFound();

  const tool = getToolById(article.toolSlug);
  const relatedTools = tool ? getRelatedTools(tool) : [];
  const sections = getArticleSections(article);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Link href="/blog" className="focus-ring text-sm font-black text-teal-800 hover:underline">
        Back to guides
      </Link>
      <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 md:text-6xl">{article.title}</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">{article.description}</p>

      {tool && (
        <div className="mt-8 rounded-lg border border-teal-100 bg-teal-50 p-5">
          <p className="text-sm font-black uppercase text-teal-800">Recommended tool</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">{article.toolName}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{tool.description}</p>
            </div>
            <Link
              href={`/tools/${tool.slug}`}
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-black text-white transition hover:bg-teal-800"
            >
              Open tool
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      )}

      <div className="mt-10 space-y-10">
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
      </div>

      <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-black text-slate-950">Frequently asked questions</h2>
        <div className="mt-5 divide-y divide-slate-200">
          {article.faq.map((faq) => (
            <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
              <h3 className="font-black text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-slate-950">Related tools</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {relatedTools.map((relatedTool) => (
            <Link
              key={relatedTool.id}
              href={`/tools/${relatedTool.slug}`}
              className="focus-ring rounded-md border border-slate-200 bg-white p-4 text-sm font-black text-slate-900 transition hover:border-teal-700 hover:text-teal-800"
            >
              {relatedTool.name}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
