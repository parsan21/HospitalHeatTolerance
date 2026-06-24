-- Supabase schema for hospital heat resilience assessment

create table if not exists hospitals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hospital_name text not null,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists hospitals_user_id_key on hospitals (user_id);

create table if not exists assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  score integer not null,
  answers jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists assessments_user_id_key on assessments (user_id);

-- RLS policies for hospitals
alter table hospitals enable row level security;

create policy "Users can manage their own hospital" on hospitals
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- RLS policies for assessments
alter table assessments enable row level security;

create policy "Users can read their own assessments" on assessments
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own assessments" on assessments
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own assessments" on assessments
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own assessments" on assessments
  for delete
  using (auth.uid() = user_id);

-- Trigger to update updated_at on changes
create function if not exists trigger_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_hospitals_updated_at
  before update on hospitals
  for each row execute function trigger_updated_at();

create trigger update_assessments_updated_at
  before update on assessments
  for each row execute function trigger_updated_at();
