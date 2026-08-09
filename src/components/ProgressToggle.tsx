"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function ProgressToggle({
  courseCode,
  initial = false,
}: {
  courseCode: string;
  initial?: boolean;
}) {
  const [completed, setCompleted] = useState(initial);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseCode, completed: !completed }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not update progress");
      setCompleted(!completed);
      // Refresh automatically so counts (e.g. dashboard stats) update right away.
      window.location.reload();
    } catch {
      // ignore client-side; keep state
    } finally {
      setLoading(false);
    }
  }

  const Icon = completed ? CheckCircle : Circle;
  const color = completed ? "text-emerald-600" : "text-slate-400";

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      aria-label={completed ? "Mark as not reviewed" : "Mark as reviewed"}
      className="p-1 hover:text-primary"
      title={completed ? "Mark as not reviewed" : "Mark as reviewed"}
    >
      <Icon size={18} className={color} />
    </button>
  );
}
