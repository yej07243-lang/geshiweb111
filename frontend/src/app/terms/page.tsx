import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for EasyFormat online file conversion tools.",
  alternates: {
    canonical: "https://easyformat.co/terms",
  },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-black text-slate-950">Terms of Use</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <p>
          EasyFormat is provided as-is. We work to keep the service available and useful, but we do not guarantee uninterrupted
          access, perfect conversion results, or compatibility with every file.
        </p>
        <p>
          Users are responsible for the files they upload. Do not upload illegal, harmful, copyrighted, malicious, or unauthorized
          files. Do not attempt to abuse, overload, scan, or disrupt the service.
        </p>
        <p>
          Conversion accuracy is not guaranteed. Output quality may vary depending on the source file, format, layout, fonts,
          compression, and embedded media.
        </p>
        <p>
          We may limit file size, request volume, available tools, or usage patterns to protect the service and other users.
        </p>
      </div>
    </article>
  );
}
