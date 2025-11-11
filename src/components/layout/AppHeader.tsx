"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/modules/i18n/LanguageSwitcher";
import { useTranslations } from "@/modules/i18n/LanguageProvider";

const supportLinks = [
  { key: "layout.topbar.support" },
  { key: "layout.topbar.forum" },
  { key: "layout.topbar.blog" },
] as const;

type AppHeaderProps = {
  variant?: "default" | "transparent";
};

export function AppHeader({ variant = "default" }: AppHeaderProps) {
  const { t } = useTranslations();
  const isTransparent = variant === "transparent";

  const wrapperClasses = isTransparent
    ? "relative flex w-full flex-col"
    : "overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl";

  const topBarClasses = isTransparent
    ? "relative z-10 flex items-center justify-between gap-4 border-b border-white/20 px-0 py-4 text-sm font-semibold uppercase tracking-wide text-white"
    : "relative z-10 flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white";

  const navButtonClasses = isTransparent
    ? "rounded-full px-4 py-2 text-white transition hover:bg-white/15 hover:text-white"
    : "rounded-full px-4 py-2 text-white transition hover:bg-white/10 hover:text-white";

  const socialClasses = isTransparent
    ? "hidden items-center gap-3 text-[12px] font-medium uppercase tracking-[0.25em] text-white/70 lg:flex"
    : "hidden items-center gap-3 text-[12px] font-medium uppercase tracking-[0.25em] text-white/70 lg:flex";

  const loginButtonClasses = isTransparent
    ? "rounded-full border border-white/50 px-4 py-2 text-[12px] uppercase tracking-wide text-white transition hover:bg-white/10"
    : "rounded-full border border-white/40 px-4 py-2 text-[12px] uppercase tracking-wide text-white transition hover:border-white/70 hover:text-white/90";

  const signupButtonClasses = isTransparent
    ? "rounded-full bg-emerald-400 px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-emerald-300"
    : "rounded-full bg-emerald-400 px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-emerald-300";

  return (
    <header className={wrapperClasses}>
      <div className={isTransparent ? "flex flex-col gap-6" : "relative flex flex-col"}>
        <div className={topBarClasses}>
          <nav className="flex items-center gap-4">
            {supportLinks.map((link) => (
              <button key={link.key} className={navButtonClasses} type="button">
                {t(link.key)}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className={socialClasses}>
              <span>FB</span>
              <span>IG</span>
              <span>YT</span>
              <span>TW</span>
            </div>
            <LanguageSwitcher />
            <div className="flex items-center gap-2">
              <Link href="/login" className={loginButtonClasses}>
                {t("layout.topbar.login")}
              </Link>
              <Link href="/signup" className={signupButtonClasses}>
                {t("layout.topbar.signup")}
              </Link>
            </div>
          </div>
        </div>

        {!isTransparent && (
          <div className="relative overflow-hidden px-6 py-10 text-white sm:px-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-32 top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute right-[-80px] top-[-40px] h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute bottom-[-120px] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-500/20 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_45%)]" />
            </div>

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-2xl font-bold uppercase shadow-sm">
                    M
                  </div>
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200">
                      {t("layout.banner.context")}
                    </p>
                    <div className="space-y-1">
                      <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                        {t("layout.brand.title")}
                      </h1>
                      <p className="text-base text-slate-200 lg:text-lg">{t("layout.brand.tagline")}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 text-xs uppercase tracking-wide sm:grid-cols-3 lg:max-w-lg">
                  <Badge>{t("layout.sidebar.primary.labelA")}</Badge>
                  <Badge>{t("layout.sidebar.primary.labelB")}</Badge>
                  <Badge>{t("layout.sidebar.primary.labelC")}</Badge>
                </div>
              </div>

              <div className="flex flex-1 justify-end">
                <div className="grid w-full max-w-2xl grid-cols-2 gap-4 text-sm text-white sm:grid-cols-4">
                  <InfoCard
                    label={t("layout.banner.activeSeason")}
                    value={t("layout.banner.activeSeasonValue")}
                    accent="from-white/40 via-white/10 to-transparent"
                  />
                  <InfoCard
                    label={t("layout.banner.periodLabel")}
                    value={t("layout.banner.periodValue")}
                    accent="from-emerald-400/30 via-emerald-300/10 to-transparent"
                  />
                  <InfoCard
                    label={t("layout.banner.weekLabel")}
                    value={t("layout.banner.weekValue")}
                    accent="from-sky-400/40 via-sky-300/20 to-transparent"
                  />
                  <InfoCard
                    label={t("layout.banner.nextEvent")}
                    value={t("layout.banner.nextEventValue")}
                    accent="from-amber-400/40 via-amber-300/20 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-center text-[11px] font-semibold text-white shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

function InfoCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur transition hover:border-white/25 hover:bg-white/15">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="relative flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/80">{label}</p>
        <p className="text-base font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

