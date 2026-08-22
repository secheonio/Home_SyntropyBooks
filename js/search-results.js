const escapeHtml = (text = '') => String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const getSearchQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
};

const normalizeSearchStatus = (book = {}) => {
    const rawStatus = String(book.status || '').trim().toLowerCase();
    const stock = Number(book.stock || 0);

    if (rawStatus === 'draft' || rawStatus === 'waiting' || rawStatus.includes('대기')) {
        return '등록대기';
    }

    if (rawStatus === 'soldout' || rawStatus.includes('품절') || stock === 0) {
        return '품절';
    }

    if (rawStatus === 'new' || rawStatus.includes('신간')) {
        return '신간';
    }

    return '등록';
};

const normalizeSearchDate = (value) => {
    if (!value) {
        return '미기재';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '미기재';
    }

    return date.toLocaleDateString('ko-KR');
};

const renderSearchResults = () => {
    const query = getSearchQuery().trim();
    const container = document.querySelector('#search-results-list');
    const summary = document.querySelector('#search-results-summary');
    const heading = document.querySelector('#search-results-heading');

    if (!container || !summary || !heading) {
        return;
    }

    const catalog = typeof window.getSearchCatalogBooks === 'function'
        ? window.getSearchCatalogBooks()
        : [];

    const normalizedQuery = query.toLocaleLowerCase();
    const filtered = !normalizedQuery
        ? catalog
        : catalog.filter((book) => {
            const title = String(book.title || '').toLocaleLowerCase();
            return title.includes(normalizedQuery);
        });

    heading.textContent = !normalizedQuery ? '전체 도서 목록' : `'${query}' 검색 결과`;
    summary.textContent = !normalizedQuery
        ? `전체 도서 ${filtered.length}권`
        : `검색어 “${query}”에 대한 결과 ${filtered.length}건`;

    if (!filtered.length) {
        container.innerHTML = '<p class="book-search-empty" style="grid-column: 1 / -1;">검색 결과가 없습니다.</p>';
        return;
    }

    container.innerHTML = filtered.map((book) => {
        const href = book.href || `book-detail.html?book=${encodeURIComponent(book.title)}`;
        const category = escapeHtml(book.category || '기타');
        const title = escapeHtml(book.title || '제목 없음');
        const author = escapeHtml(book.author || '미상');
        const publisher = escapeHtml(book.publisher || 'Syntropy Books 큐레이션');
        const description = escapeHtml(book.description || '도서 소개를 준비 중입니다.');

        return `
            <article class="book-card" data-category-label="${category}">
                <div class="book-card-top">
                    <span class="book-category">${category}</span>
                    <span class="book-new-badge">검색결과</span>
                </div>
                <h2 class="book-title">${title}</h2>
                <p class="book-author">${author}</p>
                <p class="book-publisher">출판사: ${publisher}</p>
                <p class="book-description">${description}</p>
                <a class="book-detail-link" href="${href}" style="margin-top: auto; color: var(--forest); font-weight: 700; text-decoration: none;">상세 보기</a>
            </article>
        `;
    }).join('');
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.initCommonBookSearch) {
        window.initCommonBookSearch();
    }
    renderSearchResults();
});
