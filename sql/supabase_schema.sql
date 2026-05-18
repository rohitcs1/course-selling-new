-- Supabase schema for Course+Orders+Admin
-- Run this in Supabase SQL editor (Project > SQL)

-- Enable pgcrypto extension for UUID gen (if not enabled)
create extension if not exists "pgcrypto";

-- Courses table: stores course metadata managed by admin
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  drive_link text,
  poster_url text,
  price numeric(10,2) not null default 0,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Orders table: stores purchases
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  course_id uuid references courses(id) on delete set null,
  amount numeric(10,2) not null,
  currency text default 'INR',
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on orders(created_at);

-- Admins table: store admin users (hash passwords before inserting)
create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text,
  created_at timestamptz not null default now()
);

-- RPC: daily sales aggregation
create or replace function get_daily_sales(from_date timestamptz, to_date timestamptz)
returns table(day date, total_amount numeric, orders_count int)
language sql stable as $$
  select
    date_trunc('day', created_at)::date as day,
    coalesce(sum(amount),0) as total_amount,
    count(*) as orders_count
  from orders
  where created_at >= $1 and created_at <= $2
  group by day
  order by day;
$$;

-- Helpful example inserts (remove in production)
-- insert into courses (title, description, drive_link, poster_url, price) values
-- ('Example Course', 'A sample course', 'https://drive.google.com/...', 'https://example.com/poster.jpg', 1499.00);
