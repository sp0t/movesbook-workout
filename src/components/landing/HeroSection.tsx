"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[620px] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-black text-white shadow-2xl">
      <Image
        src="/dashboard.png"
        alt="Movesbook dashboard"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />

      <header className="relative z-10 flex flex-col gap-6 px-6 py-6 sm:px-10 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
          <nav className="flex flex-wrap items-center gap-3">
            <Link className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20" href="#">
              Support
            </Link>
            <Link className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20" href="#">
              Forum
            </Link>
            <Link className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20" href="#">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3 text-white/60">
            <span>FB</span>
            <span>IG</span>
            <span>YT</span>
            <span>TW</span>
            <span className="rounded-full bg-white/10 px-3 py-2 text-[12px]">Language</span>
            <Link
              href="/login"
              className="rounded-full border border-white/60 px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-emerald-400 px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-slate-900 transition hover:bg-emerald-300"
            >
              Sign up free
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 py-10 sm:py-16">
          <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-white/80">
            Movesbook life
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Track, plan, and grow every athlete and club.
          </h1>
          <p className="max-w-3xl text-base text-white/80 sm:text-lg">
            From single athletes to pro clubs, Movesbook brings training plans, analytics, and collaboration under one modern
            workspace.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/40 transition hover:bg-emerald-300"
            >
              Start free trial
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Demo login
            </Link>
          </div>
        </div>
      </header>

      <nav className="relative z-10 flex h-14 flex-wrap items-center border-t border-white/20 bg-black/40 px-4 text-xs font-semibold uppercase tracking-wide text-white/75 backdrop-blur sm:px-8 lg:px-12">
        <Tab label="Athletes" active />
        <Tab label="Coaches" />
        <Tab label="Teams" />
        <Tab label="Groups" />
        <Tab label="Sport Clubs" />
        <Tab label="Club Management" />
        <Tab label="News" />
        <Tab label="Sell-Buy" />
        <Tab label="Job offers" />
        <Tab label="Promote yourself" />
        <Tab label="Our Shop" />
      </nav>
    </section>
  );
}

function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`h-full px-4 transition ${
        active ? "text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

