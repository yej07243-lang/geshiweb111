import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact EasyFormat Support Team | EasyFormat",
  description:
    "Contact EasyFormat for online file converter support, feedback, tool suggestions, removal requests, and website questions.",
  alternates: {
    canonical: "https://easyformat.co/contact",
  },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-black text-slate-950">Contact</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <h2 className="text-2xl font-black text-slate-950">Support and feedback</h2>
        <p>For support, feedback, or removal requests, contact:</p>
        {/* Replace this address if a different official support mailbox is used. */}
        <p>
          <a className="font-black text-teal-800 underline" href="mailto:support@easyformat.co">
            support@easyformat.co
          </a>
        </p>
        <h2 className="text-2xl font-black text-slate-950">Removal requests</h2>
        <p>
          Include the tool used, approximate upload time, and any relevant details so we can review the request.
        </p>
      </div>
    </article>
  );
}
