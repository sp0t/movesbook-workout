"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DEFAULT_LOCALE, dictionaries, type SupportedLocale, type TranslationKey } from "./dictionaries";

type TranslationDictionary = (typeof dictionaries)[SupportedLocale];

type LanguageContextValue = {
  locale: SupportedLocale;
  availableLocales: SupportedLocale[];
  t: (key: TranslationKey, options?: { fallback?: string }) => string;
  setLocale: (locale: SupportedLocale) => void;
  dictionary: TranslationDictionary;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  availableLocales: Object.keys(dictionaries) as SupportedLocale[],
  t: (key: TranslationKey, options) => options?.fallback ?? key,
  setLocale: () => {},
  dictionary: dictionaries[DEFAULT_LOCALE],
});

type LanguageProviderProps = {
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
};

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [locale, setLocale] = useState<SupportedLocale>(initialLocale ?? DEFAULT_LOCALE);

  const dictionary = useMemo(() => dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE], [locale]);

  const translate = useCallback(
    (key: TranslationKey, options?: { fallback?: string }) => dictionary[key] ?? options?.fallback ?? key,
    [dictionary],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      availableLocales: Object.keys(dictionaries) as SupportedLocale[],
      t: translate,
      setLocale,
      dictionary,
    }),
    [dictionary, locale, translate],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslations() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslations must be used within a LanguageProvider");
  }
  return context;
}

