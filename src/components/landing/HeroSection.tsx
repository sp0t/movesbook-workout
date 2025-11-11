"use client";

import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "../layout/AppHeader";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-950 px-6 py-16 text-white shadow-2xl sm:min-h-[620px] sm:px-10 lg:px-16">
      <div className="absolute inset-0">
        <Image
          src="/dashboard.png"
          alt="Movesbook dashboard"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35)_0%,rgba(20,27,43,0.55)_60%,rgba(15,21,32,0.75)_100%)]" />
      </div>

      <div className="relative flex w-full flex-col gap-10">
        <AppHeader variant="transparent" />
        <div className="flex w-full flex-col gap-8">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white">
            Movesbook platform
          </div>
          <h1 className="text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            Train, coordinate, and grow your sport ecosystem.
          </h1>
          <p className="max-w-3xl text-xl text-slate-100">
            Movesbook unites athletes, coaches, teams, and clubs around a single planning canvas. Design workouts, share
            moveframes, and automate reporting in one fluid workspace.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-emerald-400 px-7 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-400/40 transition hover:bg-emerald-300"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-white/50 px-7 py-3.5 text-base font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
            >
              Create account
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-base text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              10 years in elite sport
            </span>
            <span>Trusted by academies, pro clubs, and high-performance labs.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

