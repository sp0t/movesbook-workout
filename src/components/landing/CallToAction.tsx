import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-12">
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600">Get started</p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Launch your Movesbook workspace in minutes.
          </h2>
          <p className="text-sm text-slate-600">
            Create your account, invite staff, and start planning workouts with the same tools used by elite academies.
            Your login is ready as soon as you complete signup.
          </p>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800">Already have an account?</span>
            <Link href="/login" className="text-emerald-600 transition hover:text-emerald-500">
              Log in
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800">New to Movesbook?</span>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-400"
            >
              Sign up now<span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

