"use client";

import { useTranslations } from "@/modules/i18n/LanguageProvider";

export function SecondarySidebar() {
  const { t } = useTranslations();

  return (
    <aside className="flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <section className="space-y-3 rounded-2xl bg-slate-900/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {t("layout.sidebar.secondary.chatPanel")}
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-400">Live</p>
          <p className="mt-2 text-sm font-semibold text-slate-800">No conversations open</p>
          <button className="mt-4 w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Start new chat
          </button>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {t("layout.sidebar.secondary.actionsPlanner")}
        </p>
        <div className="flex flex-col gap-2 text-sm text-slate-600">
          <PlannerItem label={t("actions.day.add")} />
          <PlannerItem label={t("actions.workout.add")} />
          <PlannerItem label={t("actions.moveframe.add")} />
        </div>
      </section>

      <section className="mt-auto space-y-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {t("layout.sidebar.secondary.shortcuts")}
        </p>
        <p>{t("layout.sidebar.secondary.comingSoon")}</p>
      </section>
    </aside>
  );
}

function PlannerItem({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-left transition hover:bg-slate-100">
      <span>{label}</span>
      <span className="text-xs text-slate-400">+</span>
    </button>
  );
}

