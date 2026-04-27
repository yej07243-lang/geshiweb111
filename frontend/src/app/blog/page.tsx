import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_ARTICLES } from "../../lib/blog";

export const metadata: Metadata = {
  title: "File Conversion Guides and Tips | EasyFormat",
  description:
    "Read practical file conversion guides for PDF, Word, JPG, PNG, WebP, image compression, online safety, and upload workflows.",
  alternates: {
    canonical: "https://easyformat.co/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase text-teal-800">EasyFormat Blog</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-6xl">File Conversion Guides</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Learn how to convert, compress, prepare, and safely handle common document and image formats online.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {BLOG_ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="focus-ring group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-600 hover:shadow-lg"
          >
            <h2 className="text-2xl font-black text-slate-950">{article.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{article.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-teal-800">
              Read guide
              <ArrowRight className="transition group-hover:translate-x-1" size={17} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
