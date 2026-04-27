"use client";

import Link from "next/link";
import { useContext } from "react";
import { ArrowRight, FileCheck2, FileText, Image as ImageIcon, ShieldCheck, Sparkles, TimerReset } from "lucide-react";
import { LanguageContext } from "../components/LanguageProvider";
import { dict } from "../lib/i18n";
import { TOOLS } from "../lib/tools";

export default function Home() {
  const { lang } = useContext(LanguageContext);
  const t = dict[lang as keyof typeof dict] || dict.en;
  const featured = TOOLS.slice(0, 3);

  return (
    <div>
      <section className="soft-band border-b border-slate-200">
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-teal-200 bg-white/80 px-3 py-2 text-sm font-black text-teal-800 shadow-sm">
              <Sparkles size={16} />
              {t.fastFree}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-slate-950 md:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 md:text-xl">{t.heroSubtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#tools"
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-teal-700 px-6 text-base font-black text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-800"
              >
                {t.chooseTool}
                <ArrowRight size={19} />
              </Link>
              <Link
                href="/tools/pdf-to-word"
                className="focus-ring inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-base font-black text-slate-900 transition hover:border-teal-700 hover:text-teal-800"
              >
                PDF to Word
              </Link>
            </div>
          </div>

          <div className="surface rounded-lg p-4">
            <div className="rounded-md border border-slate-200 bg-slate-950 p-4 text-white">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-teal-200">{t.chooseTool}</p>
                  <p className="text-2xl font-black">Conversion Desk</p>
                </div>
                <FileCheck2 className="text-amber-300" size={32} />
              </div>
              <div className="space-y-3">
                {featured.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="focus-ring flex items-center justify-between rounded-md bg-white/10 p-4 transition hover:bg-white/15"
                  >
                    <span>
                      <span className="block font-black">{tool.name[lang as keyof typeof tool.name]}</span>
                      <span className="text-sm text-slate-300">
                        {tool.from.join(", ")} {"->"} {tool.to.toUpperCase()}
                      </span>
                    </span>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-teal-800">{t.allTools}</p>
            <h2 className="text-3xl font-black text-slate-950 md:text-4xl">{t.chooseTool}</h2>
          </div>
          <p className="max-w-xl text-slate-600">{t.frictionDesc}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => {
            const Icon = tool.category === "document" ? FileText : ImageIcon;
            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="focus-ring group surface rounded-lg p-6 transition hover:-translate-y-1 hover:border-teal-500 hover:shadow-xl"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-teal-50 text-teal-800">
                    <Icon size={24} />
                  </span>
                  <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-800">
                    {tool.to.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-950">{tool.name[lang as keyof typeof tool.name]}</h3>
                <p className="mt-3 min-h-[56px] text-sm leading-7 text-slate-600">{tool.description[lang as keyof typeof tool.description]}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-bold text-slate-500">
                  <span>{tool.from.join(", ")}</span>
                  <ArrowRight className="text-teal-700 transition group-hover:translate-x-1" size={18} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: t.privacyTitle, copy: t.privacyDesc },
            { icon: TimerReset, title: t.speedTitle, copy: t.speedDesc },
            { icon: FileCheck2, title: t.frictionTitle, copy: t.frictionDesc },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-slate-200 p-6">
              <item.icon className="mb-5 text-teal-700" size={28} />
              <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
