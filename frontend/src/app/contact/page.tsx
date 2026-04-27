import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact EasyFormat for support, feedback, or removal requests.",
  alternates: {
    canonical: "https://easyformat.co/contact",
  },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-black text-slate-950">Contact</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <p>For support, feedback, or removal requests, contact:</p>
        {/* Replace this address if a different official support mailbox is used. */}
        <p>
          <a className="font-black text-teal-800 underline" href="mailto:support@easyformat.co">
            support@easyformat.co
          </a>
        </p>
      </div>
    </article>
  );
}
