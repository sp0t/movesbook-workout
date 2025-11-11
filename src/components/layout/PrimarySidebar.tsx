"use client";

import { useTranslations } from "@/modules/i18n/LanguageProvider";

const tabs = [
  { id: "myPage", label: "layout.tabs.myPage" },
  { id: "myClub", label: "layout.tabs.myClub" },
] as const;

type PrimarySidebarProps = {
  activeTab: (typeof tabs)[number]["id"];
};

export function PrimarySidebar({ activeTab }: PrimarySidebarProps) {
  const { t } = useTranslations();

  return (
    <aside className="flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-900/5 p-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-slate-900 shadow"
                  : "text-slate-500 hover:bg-white/60 hover:text-slate-800"
              }`}
            >
              {t(tab.label)}
            </button>
          );
        })}
      </div>

      <nav className="flex flex-col gap-4">
        <SidebarButton label={t("layout.sidebar.section.profile")} />
        <SidebarButton label={t("layout.sidebar.section.settings")} />
        <SidebarButton label={t("layout.sidebar.section.notifications")} />
      </nav>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {t("layout.sidebar.quickActions")}
        </p>
        <div className="flex flex-col gap-2">
          <QuickLink label={t("layout.sidebar.quickActions.messages")} />
          <QuickLink label={t("layout.sidebar.quickActions.calendar")} />
          <QuickLink label={t("layout.sidebar.quickActions.resources")} />
        </div>
      </section>

      <div className="mt-auto space-y-2 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-sm text-white shadow-inner">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
          {t("layout.banner.activeSeason")}
        </p>
        <p className="text-lg font-semibold text-white">{t("layout.banner.activeSeasonValue")}</p>
        <p className="text-xs text-slate-200">{t("layout.banner.nextEventValue")}</p>
      </div>
    </aside>
  );
}

function SidebarButton({ label }: { label: string }) {
  return (
    <button className="rounded-xl border border-transparent bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-slate-200 hover:bg-white hover:shadow">
      {label}
    </button>
  );
}

function QuickLink({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100">
      <span>{label}</span>
      <span className="text-xs">↗</span>
    </button>
  );
}

