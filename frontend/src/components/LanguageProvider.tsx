"use client";

import { createContext, useState } from "react";

export const LanguageContext = createContext({
  lang: "en",
  setLang: (_lang: string) => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
