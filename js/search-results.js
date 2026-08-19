const SEARCH_RESULT_BOOKS = [
    { title: '생명이란 무엇인가', category: '생명과학', author: '에르빈 슈뢰딩거', href: 'life-science.html?book=생명이란%20무엇인가' },
    { title: '다윈의 위험한 생각', category: '생명과학', author: '대니얼 데닛', href: 'life-science.html?book=다윈의%20위험한%20생각' },
    { title: '생명의 그물', category: '생명과학', author: '프리초프 카프라', href: 'life-science.html?book=생명의%20그물' },
    { title: '시스템 사고', category: '시스템 사고', author: '피터 센게', href: 'systems-thinking.html?book=시스템%20사고' },
    { title: '전체를 보는 방법', category: '시스템 사고', author: '시스템 사고 큐레이션', href: 'systems-thinking.html?book=전체를%20보는%20방법' },
    { title: '카오스', category: '복잡계', author: '제임스 글릭', href: 'complexity.html?book=카오스' },
    { title: '복잡계 개론', category: '복잡계', author: '복잡계 큐레이션', href: 'complexity.html?book=복잡계%20개론' },
    { title: '코스모스', category: '우주와 질서', author: '칼 세이건', href: 'cosmos.html?book=코스모스' },
    { title: '시간의 역사', category: '우주와 질서', author: '스티븐 호킹', href: 'cosmos.html?book=시간의%20역사' },
    { title: '창백한 푸른 점', category: '우주와 질서', author: '칼 세이건', href: 'cosmos.html?book=창백한%20푸른%20점' },
    { title: '이기적 유전자', category: '진화와 협력', author: '리처드 도킨스', href: 'evolution.html?book=이기적%20유전자' },
    { title: '협력의 진화', category: '진화와 협력', author: '로버트 액설로드', href: 'evolution.html?book=협력의%20진화' },
    { title: '생명체의 협력', category: '진화와 협력', author: '린 마굴리스', href: 'evolution.html?book=생명체의%20협력' },
    { title: '엔트로피', category: '문명과 에너지', author: '제러미 리프킨', href: 'energy.html?book=엔트로피' },
    { title: '에너지와 문명', category: '문명과 에너지', author: '바츨라프 스밀', href: 'energy.html?book=에너지와%20문명' },
    { title: '지속 가능한 에너지', category: '문명과 에너지', author: '데이비드 맥케이', href: 'energy.html?book=지속%20가능한%20에너지' },
    { title: '오래된 미래', category: '생태철학', author: '헬레나 노르베리 호지', href: 'ecology.html?book=오래된%20미래' },
    { title: '침묵의 봄', category: '생태철학', author: '레이첼 카슨', href: 'ecology.html?book=침묵의%20봄' },
    { title: '숲은 생각한다', category: '생태철학', author: '에두아르도 콘', href: 'ecology.html?book=숲은%20생각한다' },
    { title: '장자', category: '철학', author: '장자', href: 'philosophy.html?book=장자' },
    { title: '스피노자 철학', category: '철학', author: '스피노자', href: 'philosophy.html?book=스피노자%20철학' },
    { title: '자연과 자유', category: '철학', author: '철학 큐레이션', href: 'philosophy.html?book=자연과%20자유' }
];

const getSearchQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
};

const escapeHtml = (text) => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

const renderSearchResults = () => {
    const query = getSearchQuery().trim().toLowerCase();
    const container = document.querySelector('#search-results-list');
    const summary = document.querySelector('#search-results-summary');
    const heading = document.querySelector('#search-results-heading');

    if (!container) {
        return;
    }

    const filtered = !query
        ? SEARCH_RESULT_BOOKS
        : SEARCH_RESULT_BOOKS.filter((book) => {
            const haystack = [book.title, book.author, book.category].join(' ').toLowerCase();
            return haystack.includes(query);
        });

    if (!query) {
        heading.textContent = '전체 도서 목록';
    } else {
        heading.textContent = `'${query}' 검색 결과`;
    }

    summary.textContent = query
        ? `검색어 “${query}”에 대한 결과 ${filtered.length}건`
        : `전체 도서 ${filtered.length}권`;

    if (filtered.length === 0) {
        container.innerHTML = '<p class="book-search-empty" style="grid-column: 1 / -1;">검색 결과가 없습니다.</p>';
        return;
    }

    container.innerHTML = filtered.map((book) => `
        <article class="book-card" data-category-label="${escapeHtml(book.category)}">
            <div class="book-card-top">
                <span class="book-category">${escapeHtml(book.category)}</span>
                <span class="book-new-badge">검색결과</span>
            </div>
            <h2 class="book-title">${escapeHtml(book.title)}</h2>
            <p class="book-author">${escapeHtml(book.author)}</p>
            <p class="book-publisher">출판사: Syntropy Books 큐레이션</p>
            <p class="book-description">${escapeHtml(book.category)} 카테고리에서 찾은 도서입니다.</p>
            <a class="book-detail-link" href="${book.href}" style="margin-top: auto; color: var(--forest); font-weight: 700; text-decoration: none;">상세 보기</a>
        </article>
    `).join('');
};

document.addEventListener('DOMContentLoaded', renderSearchResults);
