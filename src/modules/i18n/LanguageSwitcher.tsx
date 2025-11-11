"use client";

import { useTranslations } from "./LanguageProvider";

export function LanguageSwitcher() {
  const { locale, availableLocales, setLocale, t } = useTranslations();

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
      <span>{t("layout.languageSwitcher.label")}</span>
      <select
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
      >
        {availableLocales.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}

