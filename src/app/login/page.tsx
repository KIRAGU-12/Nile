"use client";

import { useState } from "react";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  async function signInWithGoogle() {
    const supabase = createClient();
    const { data, error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (googleError) {
      setError(googleError.message);
      return;
    }
    if (data?.url) window.location.assign(data.url);
  }
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] ? String(issue.path[0]) : "_";
        fe[key] = issue.message;
      }
      setFieldErrors(fe);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        redirect: "manual",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Login failed");
      // Full page load so the session + navbar reflect immediately after login.
      window.location.assign(callbackUrl);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (name: string, value: string) =>
    setValues((v) => ({ ...v, [name]: value }));

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 flex items-center justify-center gap-2">
        <span className="text-2xl font-bold">Nile</span>
      </div>
      <h1 className="mb-1 text-2xl font-bold">Welcome back</h1>
      <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
        Sign in to continue with email or Google.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1 block w-full rounded-md border bg-card px-3 py-2"
          />
          {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="mt-1 block w-full rounded-md border bg-card px-3 py-2 pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShow(!show)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 bg-card px-2 text-xs text-slate-500">
          or
        </span>
      </div>

      <button
        type="button"
        onClick={signInWithGoogle}
        className="flex w-full items-center justify-center gap-2 rounded-md border py-2 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <LogIn size={18} />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        No account?{" "}
        <a href="/register" className="text-primary underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
