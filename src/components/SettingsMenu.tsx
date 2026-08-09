"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Settings,
  Sun,
  Moon,
  LogOut,
  User,
  Mail,
  GraduationCap,
  Palette,
  Check,
  Loader2,
} from "lucide-react";

interface SettingsMenuProps {
  name?: string;
  email?: string;
}

const YEAR_OPTIONS = [1, 2, 3, 4];

export default function SettingsMenu({ name, email }: SettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const loaded = useRef(false);
  const [profileName, setProfileName] = useState(name ?? "");
  const [profileEmail, setProfileEmail] = useState(email ?? "");
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingYear, setSavingYear] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [saved, setSaved] = useState<"year" | "name" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const btn = document.getElementById("nile-settings-btn");
      const panel = document.getElementById("nile-settings-panel");
      if (btn && btn.contains(target)) return;
      if (panel && panel.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [open]);

  const loadProfile = useCallback(async () => {
    setLoadingProfile(true);
    try {
      const res = await fetch("/api/profile");
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setProfileName(typeof json.name === "string" ? json.name : profileName);
        setProfileEmail(typeof json.email === "string" ? json.email : profileEmail);
        setCurrentYear(typeof json.currentYear === "number" ? json.currentYear : null);
      }
    } catch {
      // ignore network hiccups
    } finally {
      setLoadingProfile(false);
    }
  }, [profileName, profileEmail]);

  function toggleOpen() {
    setOpen((o) => {
      const next = !o;
      if (next && !loaded.current) {
        loaded.current = true;
        void loadProfile();
      }
      return next;
    });
  }

  function flash(kind: "year" | "name") {
    setSaved(kind);
    window.setTimeout(() => setSaved((s) => (s === kind ? null : s)), 2200);
  }

  async function saveYear(year: number) {
    if (savingYear) return;
    setSavingYear(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentYear: year }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not save your year");
      setCurrentYear(year);
      flash("year");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your year");
    } finally {
      setSavingYear(false);
    }
  }

  async function saveName() {
    const trimmed = profileName.trim();
    if (savingName || trimmed.length < 2) return;
    setSavingName(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not save your name");
      setProfileName(typeof json.name === "string" ? json.name : trimmed);
      flash("name");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your name");
    } finally {
      setSavingName(false);
    }
  }

  function applyTheme(theme: "dark" | "light") {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    document.cookie = `theme=${theme};path=/;max-age=31536000;samesite=lax`;
  }

  return (
    <div className="relative inline-block">
      <button
        id="nile-settings-btn"
        type="button"
        onClick={toggleOpen}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Settings"
        className="rounded-md border border-slate-200 bg-card/80 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Settings size={18} />
      </button>

      {open && (
        <div
          id="nile-settings-panel"
          role="menu"
          className="absolute right-0 z-40 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Settings size={16} className="text-primary" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Settings
              </span>
            </div>
            {loadingProfile && (
              <Loader2 size={14} className="animate-spin text-slate-400" />
            )}
          </div>

          {error && (
            <div className="mx-4 mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-600 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="max-h-[70vh] overflow-y-auto p-4">
            {/* Appearance / theme */}
            <section>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <Palette size={13} /> Appearance
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => applyTheme("light")}
                  className="flex items-center justify-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <Sun size={14} /> Light
                </button>
                <button
                  type="button"
                  onClick={() => applyTheme("dark")}
                  className="flex items-center justify-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Moon size={14} /> Dark
                </button>
              </div>
            </section>

            <div className="my-3 border-t border-slate-100 dark:border-slate-800" />

            {/* Current year */}
            <section>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <GraduationCap size={13} /> Current year
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                The year you&apos;re currently in — it shows on your dashboard.
              </p>
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {YEAR_OPTIONS.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => saveYear(y)}
                    disabled={savingYear}
                    className={
                      "rounded-md border px-2 py-2 text-sm font-semibold transition " +
                      (currentYear === y
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800")
                    }
                  >
                    {y}
                  </button>
                ))}
              </div>
              {saved === "year" && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <Check size={13} /> Year saved
                </p>
              )}
            </section>

            <div className="my-3 border-t border-slate-100 dark:border-slate-800" />

            {/* Profile */}
            <section>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <User size={13} /> Profile
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700">
                <Mail size={14} className="shrink-0 text-slate-400" />
                <span className="truncate text-sm text-slate-600 dark:text-slate-300">
                  {profileEmail || "—"}
                </span>
              </div>
              <div className="mt-2 flex gap-1.5">
                <input
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Your name"
                  className="min-w-0 flex-1 rounded-md border border-slate-200 bg-background px-3 py-2 text-sm text-foreground outline-none ring-primary focus-within:ring-2 dark:border-slate-700"
                />
                <button
                  type="button"
                  onClick={saveName}
                  disabled={savingName || profileName.trim().length < 2}
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
                >
                  {savingName ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  Save
                </button>
              </div>
              {saved === "name" && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <Check size={13} /> Name saved
                </p>
              )}
            </section>

            <div className="my-3 border-t border-slate-100 dark:border-slate-800" />

            {/* Logout */}
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-1.5 rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut size={15} /> Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
