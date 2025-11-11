"use client";

import { useTranslations } from "@/modules/i18n/LanguageProvider";

export function MainContentPlaceholder() {
  const { t } = useTranslations();

  return (
    <section className="flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        <PlaceholderRow
          title={t("layout.content.placeholder.section.day")}
          description={t("layout.content.placeholder.section.day.description")}
        />
        <PlaceholderRow
          title={t("layout.content.placeholder.section.workout")}
          description={t("layout.content.placeholder.section.workout.description")}
        />
        <PlaceholderRow
          title={t("layout.content.placeholder.section.moveframe")}
          description={t("layout.content.placeholder.section.moveframe.description")}
        />
        <PlaceholderRow
          title={t("layout.content.placeholder.section.movelap")}
          description={t("layout.content.placeholder.section.movelap.description")}
        />
      </div>
    </section>
  );
}

function PlaceholderRow({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <StatusBadge />
    </div>
  );
}

function StatusBadge() {
  const { t } = useTranslations();
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-500">
      {t("layout.content.placeholder.tag.wip")}
    </span>
  );
}

