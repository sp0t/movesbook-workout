import { highlightSlides, roleCards, metricHighlights } from "@/data/landingHighlights";
import Link from "next/link";

export function HighlightsGrid() {
  return (
    <section id="features" className="space-y-16">
      <FeatureGrid />
      <RoleShowcase />
      <MetricsStrip />
    </section>
  );
}

function FeatureGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {highlightSlides.map((slide) => (
        <article
          key={slide.id}
          className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow hover:-translate-y-1 hover:shadow-lg transition"
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${slide.accent}`} />
          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-lg text-slate-900 shadow">
                {slide.title.charAt(0)}
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{slide.title}</h3>
            </div>
            <p className="text-sm text-slate-600">{slide.description}</p>
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:text-emerald-500"
            >
              {slide.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function RoleShowcase() {
  return (
    <div id="roles" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">Every role, one connected workspace</h2>
          <p className="text-sm text-slate-600">
            Movesbook adapts to the language and routines of athletes, coaches, team managers, and club directors.
            Each role activates tailored tools while sharing the same workout structure.
          </p>
        </div>
        <Link
          href="/signup"
          className="self-start rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
        >
          Create your account
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roleCards.map((role) => (
          <div
            key={role.id}
            className={`relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br ${role.color} p-6 shadow-sm`}
          >
            <div className="relative space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-900/70">{role.id}</span>
              <h3 className="text-lg font-semibold text-slate-900">{role.label}</h3>
              <p className="text-sm text-slate-700">{role.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsStrip() {
  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-slate-100 shadow lg:grid-cols-4 lg:px-10">
      {metricHighlights.map((metric) => (
        <div key={metric.label} className="space-y-1">
          <p className="text-3xl font-semibold text-white">{metric.value}</p>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">{metric.label}</p>
          <p className="text-xs text-slate-400">{metric.detail}</p>
        </div>
      ))}
    </div>
  );
}

