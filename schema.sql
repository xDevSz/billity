PORT=5000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=chave-secreta-do-service-role

create table users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique not null,
  created_at timestamp default now()
);

create table bills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  title text not null,
  amount numeric not null,
  due_date date,
  created_at timestamp default now()
);
