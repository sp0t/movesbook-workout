"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LanguageSwitcher } from "@/modules/i18n/LanguageSwitcher";
import { useTranslations } from "@/modules/i18n/LanguageProvider";

export default function LoginPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setErrorMessage(null);

    if (!username || !password) {
      setErrorMessage(t("auth.login.error.missing"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        setErrorMessage(data?.message ?? t("auth.login.error.generic"));
        return;
      }

      const destination = searchParams.get("redirectTo") ?? "/app/my-page";
      router.replace(destination);
    } catch (error) {
      console.error("Login request failed:", error);
      setErrorMessage(t("auth.login.error.generic"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-950 bg-[radial-gradient(circle_at_top,_#1e293b,_#0f172a_55%)] px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-white shadow-2xl backdrop-blur">
        <div className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Movesbook</p>
          <h1 className="text-2xl font-semibold">{t("auth.login.title")}</h1>
          <p className="text-sm text-slate-300">{t("auth.login.subtitle")}</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              {t("auth.login.username")}
            </label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            />
          </div>
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              {t("auth.login.password")}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <Link href="#" className="underline-offset-4 hover:text-white hover:underline">
              {t("auth.login.forgot")}
            </Link>
            <LanguageSwitcher />
          </div>
          {errorMessage && (
            <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-200">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? t("auth.login.submitting") : t("auth.login.submit")}
          </button>
        </form>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <Link href="#" className="underline-offset-4 hover:text-white hover:underline">
            {t("auth.login.support")}
          </Link>
          <Link href="/" className="underline-offset-4 hover:text-white hover:underline">
            {t("auth.login.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}

