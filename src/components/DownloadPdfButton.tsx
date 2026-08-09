"use client";

import { useState } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";

/**
 * Downloads the unit's PDF via /api/unit/pdf and shows a spinner while it is
 * being generated (answers are cached, so repeats are instant).
 */
export default function DownloadPdfButton({ code }: { code: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function download() {
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      const res = await fetch(`/api/unit/pdf?code=${encodeURIComponent(code)}`);
      if (!res.ok) throw new Error("PDF request failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${code.toLowerCase().replace(/\s+/g, "-")}-nile-notes.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        onClick={download}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-hover disabled:opacity-70"
      >
        {busy ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Download size={16} />
        )}
        {busy ? "Generating PDF…" : "Download unit PDF"}
      </button>
      {busy && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Preparing your notes + questions + answers…
        </span>
      )}
      {error && (
        <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
          <AlertCircle size={12} /> Could not create the PDF. Please try again.
        </span>
      )}
    </div>
  );
}
