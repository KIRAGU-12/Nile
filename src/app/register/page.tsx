"use client";

import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Passwords must match"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    const { confirmPassword, ...body } = parsed.data;
    void confirmPassword;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Registration failed");
      // Full page load so the session + navbar reflect immediately after signup.
      window.location.assign("/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Registration failed");
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
      <h1 className="mb-1 text-2xl font-bold">Create your account</h1>
      <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
        Sign up with email or continue with Google.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name (optional)</label>
          <input
            type="text"
            placeholder="Jane Wanjiru"
            value={values.name ?? ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1 block w-full rounded-md border bg-card px-3 py-2"
          />
          {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
        </div>
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
        <div>
          <label className="block text-sm font-medium">Confirm password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="mt-1 block w-full rounded-md border bg-card px-3 py-2 pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
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
        Already have an account?{" "}
        <a href="/login" className="text-primary underline">
          Sign in
        </a>
      </p>
    </div>
  );
}
