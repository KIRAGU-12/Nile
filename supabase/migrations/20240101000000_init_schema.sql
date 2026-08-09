-- ─────────────────────────────────────────────────────────────────
-- Nile — English & Literature platform schema (Supabase Postgres)
-- Run with: node scripts/setup-supabase.mjs
-- Idempotent + transactional; safe to re-run.
-- ─────────────────────────────────────────────────────────────────
begin;

create extension if not exists "pgcrypto";

-- Profiles: one row per authenticated user (created by the trigger).
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  role text not null default 'student' check (role in ('student','teacher','admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Current study year the student has selected in Settings (1-4).
alter table public.profiles add column if not exists current_year smallint
  check (current_year is null or current_year between 1 and 4);

-- Row-level security: a user can only read/update their own profile.
alter table public.profiles enable row level security;

drop policy if exists "Allow read own profile" on public.profiles;
drop policy if exists "Allow update own profile" on public.profiles;

create policy "Allow read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Allow update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Progress: which courses a student has reviewed.
create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  course_code text not null,
  completed boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create unique index if not exists progress_user_course_idx
  on public.progress (user_id, course_code);

-- Row-level security: a user can only read/write their own progress.
alter table public.progress enable row level security;

drop policy if exists "Allow read own progress" on public.progress;
drop policy if exists "Allow insert own progress" on public.progress;
drop policy if exists "Allow update own progress" on public.progress;
drop policy if exists "Allow delete own progress" on public.progress;

create policy "Allow read own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Allow insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Allow update own progress"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Allow delete own progress"
  on public.progress for delete
  using (auth.uid() = user_id);

-- Trigger: auto-create a profile when a new user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    'student'
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

commit;
