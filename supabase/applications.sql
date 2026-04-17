create extension if not exists pgcrypto;

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company text not null,
  job_title text not null,
  status text not null default 'saved' check (
    status in ('saved', 'applied', 'interview', 'offer', 'rejected')
  ),
  location text,
  job_url text,
  applied_at date,
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.applications enable row level security;

create policy "users can read their own applications"
on public.applications
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "users can insert their own applications"
on public.applications
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "users can update their own applications"
on public.applications
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "users can delete their own applications"
on public.applications
for delete
to authenticated
using ((select auth.uid()) = user_id);
