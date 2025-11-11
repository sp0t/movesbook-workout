"use client";

import { useTranslations } from "@/modules/i18n/LanguageProvider";

export function AppFooter() {
  const { t } = useTranslations();

  return (
    <footer className="mt-8 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p>{t("layout.footer.copyright")}</p>
      <div className="flex flex-wrap items-center gap-4">
        <span>{t("layout.footer.version")}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase text-slate-600">
          {t("layout.footer.status")}
        </span>
      </div>
    </footer>
  );
}

