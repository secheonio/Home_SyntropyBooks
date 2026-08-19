-- Syntropy Books inventory schema for Supabase

create table if not exists public.admin_users (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
    user_id uuid primary key references public.admin_users(user_id) on delete cascade,
    login_id text not null unique,
    recovery_question text not null default '너는 누구냐?',
    recovery_answer_hash text not null,
    must_change_password boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.book_settings (
    id boolean primary key default true check (id),
    new_book_period_days integer not null default 14 check (new_book_period_days > 0),
    updated_at timestamptz not null default now()
);

insert into public.book_settings (id, new_book_period_days)
values (true, 14)
on conflict (id) do nothing;

create table if not exists public.books (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    author text not null,
    translator text,
    publisher text not null,
    category text not null,
    description text,
    price integer not null check (price >= 0),
    stock integer not null default 0 check (stock >= 0),
    cover_image text,
    status text not null default '판매중' check (status in ('판매중', '품절', '판매종료', '숨김')),
        new_until timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.books
add column if not exists new_until timestamptz;

create or replace function public.set_new_book_until()
returns trigger
language plpgsql
as $$
declare
    period_days integer;
begin
    select new_book_period_days into period_days
    from public.book_settings
    where id = true;

    new.new_until = coalesce(new.created_at, now()) + make_interval(days => period_days);
    return new;
end;
$$;

drop trigger if exists books_set_new_until on public.books;
create trigger books_set_new_until
before insert on public.books
for each row execute function public.set_new_book_until();

update public.books
set new_until = created_at + make_interval(days => (
    select new_book_period_days
    from public.book_settings
    where id = true
))
where new_until is null;

alter table public.books
alter column new_until drop default;

alter table public.books
alter column new_until set not null;

create index if not exists books_new_until_idx
on public.books (new_until);

create or replace view public.new_books as
select *
from public.books
where status = '판매중'
    and stock > 0
    and now() < new_until;

create table if not exists public.sales (
    id uuid primary key default gen_random_uuid(),
    book_id uuid not null references public.books(id),
    quantity integer not null check (quantity > 0),
    unit_price integer not null check (unit_price >= 0),
    sold_at timestamptz not null default now(),
    sold_by uuid references auth.users(id)
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
    select exists (
        select 1
        from public.admin_users
        where user_id = auth.uid()
    );
$$;

create or replace function public.update_book_timestamp()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists books_updated_at on public.books;
create trigger books_updated_at
before update on public.books
for each row execute function public.update_book_timestamp();

create or replace function public.process_sale()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    current_stock integer;
begin
    select stock into current_stock
    from public.books
    where id = new.book_id
    for update;

    if current_stock is null then
        raise exception '도서를 찾을 수 없습니다.';
    end if;

    if current_stock < new.quantity then
        raise exception '재고가 부족합니다.';
    end if;

    update public.books
    set stock = stock - new.quantity,
        status = case when stock - new.quantity = 0 then '품절' else status end
    where id = new.book_id;

    return new;
end;
$$;

drop trigger if exists sales_process_stock on public.sales;
create trigger sales_process_stock
after insert on public.sales
for each row execute function public.process_sale();

alter table public.admin_users enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.book_settings enable row level security;
alter table public.books enable row level security;
alter table public.sales enable row level security;

create policy "public can read available books"
on public.books for select
to anon, authenticated
using (status = '판매중' and stock > 0);

create policy "admins can manage books"
on public.books for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins can read sales"
on public.sales for select
to authenticated
using (public.is_admin());

create policy "admins can register sales"
on public.sales for insert
to authenticated
with check (public.is_admin());

create policy "admins can read admin users"
on public.admin_users for select
to authenticated
using (public.is_admin());

create policy "admins can read own profile"
on public.admin_profiles for select
to authenticated
using (user_id = auth.uid() and public.is_admin());

create policy "public can read book settings"
on public.book_settings for select
to anon, authenticated
using (true);

create policy "admins can update book settings"
on public.book_settings for update
to authenticated
using (public.is_admin())
with check (public.is_admin());
