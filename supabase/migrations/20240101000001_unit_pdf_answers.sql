-- ─────────────────────────────────────────────────────────────────
-- Cache of generated unit-PDF model answers (per course) so downloads
-- are instant after the first generation. Written only by the server
-- via the service-role key (bypasses RLS); anon clients have no access.
-- Idempotent; safe to re-run.
-- ─────────────────────────────────────────────────────────────────
begin;

create table if not exists public.unit_pdf_answers (
  course_code text primary key,
  answers jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.unit_pdf_answers enable row level security;

-- No policies: the service role writes/reads it; end users never touch it.
commit;
