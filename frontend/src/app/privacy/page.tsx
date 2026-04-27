import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy for File Conversion | EasyFormat",
  description:
    "Read how EasyFormat handles uploaded files, temporary storage, automatic deletion after 30 minutes, analytics, ads, and user privacy.",
  alternates: {
    canonical: "https://easyformat.co/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-black text-slate-950">Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
        <h2 className="text-2xl font-black text-slate-950">How files are processed</h2>
        <p>
          EasyFormat processes uploaded files only for the purpose of providing the file conversion tool selected by the user.
          Uploaded files are temporarily stored so the service can convert them and provide a downloadable result.
        </p>
        <p>
          Files are deleted automatically after 30 minutes. EasyFormat does not sell uploaded files and does not use uploaded
          documents or images to create unrelated products.
        </p>
        <h2 className="text-2xl font-black text-slate-950">Analytics and advertising</h2>
        <p>
          Basic analytics and advertising may be used in the future to understand site usage, improve the service, and support
          operating costs. These systems may process standard technical information such as browser type, page views, and rough
          traffic patterns.
        </p>
        <h2 className="text-2xl font-black text-slate-950">Sensitive documents</h2>
        <p>
          Users should not upload highly sensitive documents, confidential business files, government records, financial records,
          medical records, or files that they are not allowed to process through an online service.
        </p>
      </div>
    </article>
  );
}
