"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import type { SignupMetadata } from "@/lib/auth/signupMetadata";
import { FALLBACK_METADATA } from "@/lib/auth/signupMetadata";

type Role = "athlete" | "coach" | "team" | "club";

type DateInput = {
  day: string;
  month: string;
  year: string;
};

type FormState = {
  role: Role;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  countryId: string;
  cityName: string;
  sportId: string;
  zoneId: string;
  measureId: string;
  weekStartId: string;
  privacy: string;
  notificationPreference: string;
  informationUpdates: boolean;
  gender: "M" | "F";
  zipcode: string;
  birthDate: string;
  athleteUsertypeId?: string;
  coachUsertypeId?: string;
  coachTeamType?: string;
  teamUsertypeId?: string;
  clubTypeId?: string;
};

type SignupPayload = {
  role: Role;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    countryId: string;
    stateId?: string;
    cityName?: string;
    sportId: string;
    zoneId: string;
    measureId: string;
    weekStartId: string;
    privacy: string;
    notificationPreference: string;
    informationUpdates: boolean;
  };
  athlete?: {
    gender: "M" | "F";
    zipcode?: string;
    dob: DateInput;
    usertypeId?: string;
  };
  coach?: {
    gender: "M" | "F";
    zipcode?: string;
    dob: DateInput;
    usertypeId?: string;
    teamType?: string;
  };
  team?: {
    gender: "M" | "F";
    zipcode?: string;
    dob: DateInput;
    usertypeId?: string;
  };
  club?: {
    gender: "M" | "F";
    zipcode?: string;
    dob: DateInput;
    clubTypeId?: string;
  };
};

const ROLE_LABELS: Record<Role, string> = {
  athlete: "Athlete",
  coach: "Coach",
  team: "Team",
  club: "Club",
};

const GENDER_OPTIONS: Array<{ value: "M" | "F"; label: string }> = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

function toDateParts(value: string): DateInput {
  if (!value) {
    return { day: "1", month: "1", year: "2000" };
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { day: "1", month: "1", year: "2000" };
  }

  const day = String(date.getUTCDate());
  const month = String(date.getUTCMonth() + 1);
  const year = String(date.getUTCFullYear());

  return { day: day.padStart(2, "0"), month: month.padStart(2, "0"), year };
}

const initialMetadata = FALLBACK_METADATA;

const initialFormState: FormState = {
  role: "athlete",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  countryId: initialMetadata.countries[0]?.value ?? "",
  cityName: "",
  sportId: initialMetadata.sports[0]?.value ?? "",
  zoneId:
    initialMetadata.timezones.find((option) => option.label.includes("UTC"))?.value ??
    initialMetadata.timezones[0]?.value ??
    "",
  measureId: initialMetadata.measures[0]?.value ?? "",
  weekStartId:
    initialMetadata.weekStarts.find((option) => option.value === "1")?.value ??
    initialMetadata.weekStarts[0]?.value ??
    "",
  privacy: initialMetadata.privacyLevels[0]?.value ?? "Public",
  notificationPreference: initialMetadata.notificationLevels[0]?.value ?? "2",
  informationUpdates: true,
  gender: "M",
  zipcode: "",
  birthDate: "",
  athleteUsertypeId: initialMetadata.athleteUsertypes[0]?.value ?? "",
  coachUsertypeId: initialMetadata.coachUsertypes[0]?.value ?? "",
  coachTeamType: initialMetadata.coachTeamTypes[0]?.value ?? "",
  teamUsertypeId: initialMetadata.teamUsertypes[0]?.value ?? "",
  clubTypeId: initialMetadata.clubTypes[0]?.value ?? "",
};

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [metadata, setMetadata] = useState<SignupMetadata>(initialMetadata);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMetadata() {
      try {
        setLoading(true);
        const response = await fetch("/api/auth/signup/metadata", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Metadata request failed");
        }
        const data = (await response.json()) as SignupMetadata;
        if (cancelled) return;
        setMetadata(data);
        setForm((current) => ({
          ...current,
          countryId: data.countries[0]?.value ?? current.countryId,
          sportId: data.sports[0]?.value ?? current.sportId,
          zoneId:
            data.timezones.find((option) => option.label.includes("UTC"))?.value ?? data.timezones[0]?.value ?? current.zoneId,
          measureId: data.measures[0]?.value ?? current.measureId,
          weekStartId:
            data.weekStarts.find((option) => option.value === "1")?.value ?? data.weekStarts[0]?.value ?? current.weekStartId,
          privacy: data.privacyLevels[0]?.value ?? current.privacy,
          notificationPreference: data.notificationLevels[0]?.value ?? current.notificationPreference,
          athleteUsertypeId: data.athleteUsertypes[0]?.value ?? current.athleteUsertypeId,
          coachUsertypeId: data.coachUsertypes[0]?.value ?? current.coachUsertypeId,
          coachTeamType: data.coachTeamTypes[0]?.value ?? current.coachTeamType,
          teamUsertypeId: data.teamUsertypes[0]?.value ?? current.teamUsertypeId,
          clubTypeId: data.clubTypes[0]?.value ?? current.clubTypeId,
        }));
      } catch (metadataError) {
        console.error(metadataError);
        if (!cancelled) {
          setError("We could not load the signup configuration. Using default options.");
          setMetadata(FALLBACK_METADATA);
          setForm((current) => ({
            ...current,
            countryId: FALLBACK_METADATA.countries[0]?.value ?? current.countryId,
            sportId: FALLBACK_METADATA.sports[0]?.value ?? current.sportId,
            zoneId:
              FALLBACK_METADATA.timezones.find((option) => option.label.includes("UTC"))?.value ??
              FALLBACK_METADATA.timezones[0]?.value ??
              current.zoneId,
            measureId: FALLBACK_METADATA.measures[0]?.value ?? current.measureId,
            weekStartId:
              FALLBACK_METADATA.weekStarts.find((option) => option.value === "1")?.value ??
              FALLBACK_METADATA.weekStarts[0]?.value ??
              current.weekStartId,
            privacy: FALLBACK_METADATA.privacyLevels[0]?.value ?? current.privacy,
            notificationPreference:
              FALLBACK_METADATA.notificationLevels[0]?.value ?? current.notificationPreference,
            athleteUsertypeId: FALLBACK_METADATA.athleteUsertypes[0]?.value ?? current.athleteUsertypeId,
            coachUsertypeId: FALLBACK_METADATA.coachUsertypes[0]?.value ?? current.coachUsertypeId,
            coachTeamType: FALLBACK_METADATA.coachTeamTypes[0]?.value ?? current.coachTeamType,
            teamUsertypeId: FALLBACK_METADATA.teamUsertypes[0]?.value ?? current.teamUsertypeId,
            clubTypeId: FALLBACK_METADATA.clubTypes[0]?.value ?? current.clubTypeId,
          }));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMetadata();
    return () => {
      cancelled = true;
    };
  }, []);

  const roleSpecificOptions = useMemo(() => {
    if (!metadata) return {};

    switch (form.role) {
      case "athlete":
        return {
          usertypes: metadata.athleteUsertypes,
        };
      case "coach":
        return {
          usertypes: metadata.coachUsertypes,
          teamTypes: metadata.coachTeamTypes,
        };
      case "team":
        return {
          usertypes: metadata.teamUsertypes,
        };
      case "club":
        return {
          clubTypes: metadata.clubTypes,
        };
      default:
        return {};
    }
  }, [metadata, form.role]);

  const handleInput =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value;
      setForm((current) => ({
        ...current,
        [field]: value,
      }));
    };

  const handleRoleChange = (role: Role) => {
    setForm((current) => ({
      ...current,
      role,
      gender: "M",
      zipcode: "",
      birthDate: "",
    }));
    setSuccessMessage(null);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setError(null);

    try {
      const dateDetails = toDateParts(form.birthDate || "2000-01-01");
      const payload: SignupPayload = {
        role: form.role,
        user: {
          username: form.username,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          countryId: form.countryId,
          stateId: "", // handled later if Movesbook requires it
          cityName: form.cityName,
          sportId: form.sportId,
          zoneId: form.zoneId,
          measureId: form.measureId,
          weekStartId: form.weekStartId,
          privacy: form.privacy,
          notificationPreference: form.notificationPreference,
          informationUpdates: form.informationUpdates,
        },
      };

      if (form.role === "athlete") {
        payload.athlete = {
          gender: form.gender,
          zipcode: form.zipcode,
          dob: dateDetails,
          usertypeId: form.athleteUsertypeId,
        };
      }

      if (form.role === "coach") {
        payload.coach = {
          gender: form.gender,
          zipcode: form.zipcode,
          dob: dateDetails,
          usertypeId: form.coachUsertypeId,
          teamType: form.coachTeamType,
        };
      }

      if (form.role === "team") {
        payload.team = {
          gender: form.gender,
          zipcode: form.zipcode,
          dob: dateDetails,
          usertypeId: form.teamUsertypeId,
        };
      }

      if (form.role === "club") {
        payload.club = {
          gender: form.gender,
          zipcode: form.zipcode,
          dob: dateDetails,
          clubTypeId: form.clubTypeId,
        };
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? "Signup failed.");
      }

      setSuccessMessage("Account created successfully. You can now log in with your Movesbook credentials.");
      router.refresh();
    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not complete your signup. Please check the details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
        <AppHeader />
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-10 text-white shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold">Create your Movesbook account</h1>
            <p className="text-base text-slate-300">
              Choose your role, complete the profile, and we’ll register you directly on Movesbook. You can reuse the
              same credentials on the web platform and mobile app.
            </p>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Choose your role</h2>
            <div className="flex flex-col gap-3">
              {(Object.keys(ROLE_LABELS) as Role[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    form.role === role
                      ? "border-slate-900 bg-slate-900 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <p className="text-sm font-semibold">{ROLE_LABELS[role]}</p>
                  <p className="text-xs text-slate-500">
                    {role === "athlete" && "Personal workouts, diary, and moveframes."}
                    {role === "coach" && "Manage athletes, plan seasons, and share routines."}
                    {role === "team" && "Coordinate squads, schedules, and shared resources."}
                    {role === "club" && "Oversee teams, staff, facilities, and branding."}
                  </p>
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-slate-900/90 p-6 text-sm text-slate-100">
              <p className="font-semibold">Already have an account?</p>
              <p className="mt-1">
                Head back to the login page to access your workspace with your Movesbook credentials.
              </p>
            </div>
          </aside>

          <main className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm lg:p-10">
            {loading && (
              <p className="mb-6 text-sm text-slate-500">Loading signup configuration…</p>
            )}
            {error && (
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            )}

            {metadata && (
              <form className="space-y-10" onSubmit={handleSubmit}>
                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-900">Profile details</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <LabeledInput
                      label="Username"
                      required
                      value={form.username}
                      onChange={handleInput("username")}
                      placeholder="username"
                    />
                    <LabeledInput
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleInput("email")}
                      placeholder="name@example.com"
                    />
                    <LabeledInput
                      label="First name"
                      required
                      value={form.firstName}
                      onChange={handleInput("firstName")}
                      placeholder="First name"
                    />
                    <LabeledInput
                      label="Last name"
                      required
                      value={form.lastName}
                      onChange={handleInput("lastName")}
                      placeholder="Last name"
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <LabeledInput
                      label="Password"
                      type="password"
                      required
                      value={form.password}
                      onChange={handleInput("password")}
                      placeholder="At least 6 characters"
                    />
                    <LabeledInput
                      label="Repeat password"
                      type="password"
                      required
                      value={form.confirmPassword}
                      onChange={handleInput("confirmPassword")}
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-900">Location & preferences</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <LabeledSelect
                      label="Country"
                      options={metadata.countries}
                      value={form.countryId}
                      onChange={handleInput("countryId")}
                      required
                    />
                    <LabeledInput
                      label="City"
                      value={form.cityName}
                      onChange={handleInput("cityName")}
                      placeholder="City"
                    />
                    <LabeledSelect
                      label="Primary sport"
                      options={metadata.sports}
                      value={form.sportId}
                      onChange={handleInput("sportId")}
                      required
                    />
                    <LabeledSelect
                      label="Timezone"
                      options={metadata.timezones}
                      value={form.zoneId}
                      onChange={handleInput("zoneId")}
                      required
                      searchable
                    />
                    <LabeledSelect
                      label="Measurement units"
                      options={metadata.measures}
                      value={form.measureId}
                      onChange={handleInput("measureId")}
                      required
                    />
                    <LabeledSelect
                      label="Week starts on"
                      options={metadata.weekStarts}
                      value={form.weekStartId}
                      onChange={handleInput("weekStartId")}
                      required
                    />
                    <LabeledSelect
                      label="Privacy"
                      options={metadata.privacyLevels}
                      value={form.privacy}
                      onChange={handleInput("privacy")}
                      required
                    />
                    <LabeledSelect
                      label="Notifications"
                      options={metadata.notificationLevels}
                      value={form.notificationPreference}
                      onChange={handleInput("notificationPreference")}
                      required
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-slate-500">
                    <input
                      type="checkbox"
                      checked={form.informationUpdates}
                      onChange={handleInput("informationUpdates")}
                      className="h-4 w-4 rounded border-slate-500 text-slate-500 focus:ring-slate-500"
                    />
                    Receive platform updates and feature announcements.
                  </label>
                </section>

                <section className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-900">Role details</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <LabeledSelect
                      label="Gender"
                      options={GENDER_OPTIONS.map(({ value, label }) => ({ value, label }))}
                      value={form.gender}
                      onChange={handleInput("gender")}
                      required
                    />
                    <LabeledInput
                      label="Postal code"
                      value={form.zipcode}
                      onChange={handleInput("zipcode")}
                      placeholder="ZIP / Postal code"
                    />
                    <LabeledInput
                      label="Date of birth"
                      type="date"
                      value={form.birthDate}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={handleInput("birthDate")}
                      required
                    />

                    {form.role === "athlete" && roleSpecificOptions && "usertypes" in roleSpecificOptions && (
                      <LabeledSelect
                        label="Athlete type"
                        options={roleSpecificOptions.usertypes ?? []}
                        value={form.athleteUsertypeId}
                        onChange={handleInput("athleteUsertypeId")}
                        required
                      />
                    )}

                    {form.role === "coach" && roleSpecificOptions && (
                      <>
                        {"usertypes" in roleSpecificOptions && (
                          <LabeledSelect
                            label="Coach type"
                            options={roleSpecificOptions.usertypes ?? []}
                            value={form.coachUsertypeId}
                            onChange={handleInput("coachUsertypeId")}
                            required
                          />
                        )}
                        {"teamTypes" in roleSpecificOptions && (
                          <LabeledSelect
                            label="Team type"
                            options={roleSpecificOptions.teamTypes ?? []}
                            value={form.coachTeamType}
                            onChange={handleInput("coachTeamType")}
                            required
                          />
                        )}
                      </>
                    )}

                    {form.role === "team" && roleSpecificOptions && "usertypes" in roleSpecificOptions && (
                      <LabeledSelect
                        label="Team type"
                        options={roleSpecificOptions.usertypes ?? []}
                        value={form.teamUsertypeId}
                        onChange={handleInput("teamUsertypeId")}
                        required
                      />
                    )}

                    {form.role === "club" && roleSpecificOptions && "clubTypes" in roleSpecificOptions && (
                      <LabeledSelect
                        label="Club category"
                        options={roleSpecificOptions.clubTypes ?? []}
                        value={form.clubTypeId}
                        onChange={handleInput("clubTypeId")}
                        required
                      />
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    By signing up you confirm that you accept Movesbook’s Privacy Policy and data guidelines. You will
                    receive a confirmation email directly from Movesbook.
                  </p>
                </section>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Link href="/" className="text-sm font-semibold text-slate-500 transition hover:text-slate-500">
                    ← Back to landing page
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-400/40 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Creating account…" : "Create account"}
                  </button>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
      <div className="bg-slate-100">
        <AppFooter />
      </div>
    </div>
  );
}

type LabeledInputProps = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  max?: string;
};

function LabeledInput({ label, value, onChange, type = "text", placeholder, required, max }: LabeledInputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-600">
      <span className="font-semibold text-slate-800">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        max={max}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
      />
    </label>
  );
}

type LabeledSelectProps = {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  searchable?: boolean;
};

function LabeledSelect({ label, value, onChange, options, required, searchable }: LabeledSelectProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-600">
      <span className="font-semibold text-slate-800">
        {label}
        {required ? " *" : ""}
      </span>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full appearance-none rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
          searchable ? "hover:cursor-pointer" : ""
        }`}
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

