-- 현재 도서 8개 카테고리의 신간 상태 테스트 데이터
-- 각 카테고리의 대표 도서 1권은 7일 뒤 신간 기간이 끝납니다.
-- 나머지 도서는 16일 전에 등록된 것으로 설정되어 신간에서 제외됩니다.

with category_books as (
    select
        id,
        category,
        row_number() over (partition by category order by created_at, id) as category_order
    from public.books
    where status <> '숨김'
),
updated_books as (
    update public.books as books
    set
        new_until = case
            when category_books.category_order = 1 then now() + interval '7 days'
            else now() - interval '2 days'
        end,
        updated_at = now()
    from category_books
    where books.id = category_books.id
    returning books.id, books.category, books.new_until
)
select
    category,
    count(*) filter (where new_until > now()) as new_book_count,
    count(*) filter (where new_until <= now()) as expired_book_count
from updated_books
group by category
order by category;
