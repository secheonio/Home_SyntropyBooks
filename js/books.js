const MIN_ROTATION_DELAY_MS = 10000;
const MAX_ROTATION_DELAY_MS = 20000;

const BOOK_STATUS = Object.freeze({
    PURCHASE: '구매중',
    WAITING: '대기중',
    NEW: '신규책',
    COMPLETE: '등록완료',
    SHIPPING: '발송예정',
    RETURNED: '반품처리',
    SOLD_OUT: '품절'
});

const normalizeBookStatusValue = (book = {}) => {
    const classification = String(book.classification || '').trim();
    if (classification && Object.values(BOOK_STATUS).includes(classification)) {
        return classification;
    }

    if (book.status === 'preorder') {
        return BOOK_STATUS.PURCHASE;
    }
    if (book.status === 'draft') {
        return BOOK_STATUS.WAITING;
    }
    if (book.status === 'shipping') {
        return BOOK_STATUS.SHIPPING;
    }
    if (book.status === 'returned') {
        return BOOK_STATUS.RETURNED;
    }
    if (Number(book.stock || 0) === 0) {
        return BOOK_STATUS.SOLD_OUT;
    }
    if (book.newUntil && new Date(book.newUntil) > new Date()) {
        return BOOK_STATUS.NEW;
    }
    return BOOK_STATUS.COMPLETE;
};

const bookCategoryLabels = {
    'life-science': '생명과학',
    'systems-thinking': '시스템 사고',
    complexity: '복잡계',
    cosmos: '우주와 질서',
    evolution: '진화와 협력',
    energy: '문명과 에너지',
    ecology: '생태철학',
    philosophy: '철학',
    uncategorized: '미분류'
};

const categoryPageBySlug = Object.freeze({
    'life-science': 'life-science.html',
    'systems-thinking': 'systems-thinking.html',
    complexity: 'complexity.html',
    cosmos: 'cosmos.html',
    evolution: 'evolution.html',
    energy: 'energy.html',
    ecology: 'ecology.html',
    philosophy: 'philosophy.html'
});

const goToBookDetailFromCard = (card) => {
    const title = card.querySelector('.book-title')?.textContent.trim();
    if (!title) {
        return;
    }

    window.location.href = `book-detail.html?book=${encodeURIComponent(title)}`;
};

const setupGeneratedCardNavigation = () => {
    const container = document.querySelector('.book-container');
    if (!container || container.dataset.generatedNavBound === 'true') {
        return;
    }

    container.dataset.generatedNavBound = 'true';

    container.addEventListener('click', (event) => {
        const card = event.target.closest('.book-card[data-generated="true"]');
        if (!card || !container.contains(card) || event.target.closest('a')) {
            return;
        }
        goToBookDetailFromCard(card);
    });

    container.addEventListener('keydown', (event) => {
        const card = event.target.closest('.book-card[data-generated="true"]');
        if (!card || !container.contains(card)) {
            return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goToBookDetailFromCard(card);
        }
    });
};

const updateBooksPageHeading = () => {
    const heading = document.querySelector('#books-page-heading');
    if (!heading) {
        return;
    }

    const category = bookCategoryLabels[window.location.hash.slice(1)];
    heading.innerHTML = category ? `도서목록 / ${category}` : '질서 있는 선택을 위한<br>도서 큐레이션';
};

const getBookCategories = (book = {}) => {
    const rawValue = Array.isArray(book?.categories)
        ? book.categories
        : (Array.isArray(book?.categoryList)
            ? book.categoryList
            : (book?.category ?? book?.categories ?? ''));

    const values = Array.isArray(rawValue) ? rawValue : String(rawValue ?? '').split(/[\n,;/]+/);
    const categories = values
        .flatMap((item) => Array.isArray(item) ? item : String(item ?? '').split('/'))
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .filter((category, index, list) => list.indexOf(category) === index);

    if (categories.length) {
        return categories;
    }

    const fallbackCategory = String(book?.category || '').trim();
    return fallbackCategory ? [fallbackCategory] : [];
};

const isUncategorizedBook = (book = {}) => {
    const categories = getBookCategories(book)
        .map((category) => String(category || '').trim())
        .filter(Boolean);
    const categoryName = String(book?.category || '').trim();
    const knownCategories = new Set(Object.values(bookCategoryLabels).filter((label) => label !== '미분류'));

    if (!categories.length && !categoryName) {
        return true;
    }

    if (categoryName === '미분류') {
        return true;
    }

    if (!categories.length) {
        return true;
    }

    return !categories.some((category) => knownCategories.has(category)) && !knownCategories.has(categoryName);
};

const getFallbackCatalogBooks = () => Object.entries(categoryBooks).flatMap(([categorySlug, books]) => books.map((book) => ({
    title: String(book.title || '').trim(),
    author: String(book.author || '미상').trim(),
    translator: String(book.translator || '').trim(),
    publisher: String(book.publisher || 'Syntropy Books 큐레이션').trim(),
    description: String(book.description || '').trim(),
    cover: String(book.cover || '').trim(),
    category: bookCategoryLabels[categorySlug] || categorySlug,
    categories: [bookCategoryLabels[categorySlug] || categorySlug],
    categorySlug
})));

const getCatalogBooks = () => {
    const fallbackBooks = getFallbackCatalogBooks();
    try {
        const parsedBooks = JSON.parse(localStorage.getItem('syntropyBooksCatalog') || '[]');
        if (!Array.isArray(parsedBooks) || parsedBooks.length === 0) {
            return fallbackBooks;
        }

        if (parsedBooks.length < fallbackBooks.length) {
            return fallbackBooks;
        }

        return parsedBooks;
    } catch (error) {
        return fallbackBooks;
    }
};

const getAvailableCatalogBooks = () => getCatalogBooks();

const getTotalBookCount = () => getAvailableCatalogBooks().length;

const getCategoryBookCount = (categorySlug, categoryLabel) => getAvailableCatalogBooks().filter((book) => {
    const categories = getBookCategories(book);
    const categoryNames = new Set(categories.map((item) => String(item || '').trim()).filter(Boolean));
    const bookCategory = String(book.category || '').trim();
    const isUncategorizedTarget = categoryLabel === '미분류';

    if (isUncategorizedTarget) {
        return isUncategorizedBook(book);
    }

    const matchesCategoryLabel = categoryLabel ? categoryNames.has(categoryLabel) || bookCategory === categoryLabel : false;
    const matchesCategorySlug = String(book.categorySlug || '').trim() === String(categorySlug || '');
    return matchesCategoryLabel || matchesCategorySlug || (categoryNames.has(categoryLabel || bookCategoryLabels[categorySlug] || ''));
}).length;

const normalizeCatalogBook = (book, categorySlug, categoryLabel) => {
    if (!book || typeof book !== 'object') {
        return null;
    }

    const title = String(book.title || '').trim();
    if (!title) {
        return null;
    }

    const categories = getBookCategories(book);
    const primaryCategory = categories[0] || String(book.category || categoryLabel || '').trim();
    const normalizedCategory = isUncategorizedBook(book) && categoryLabel === '미분류' ? '미분류' : primaryCategory;

    return {
        title,
        author: String(book.author || '미상').trim(),
        translator: String(book.translator || '').trim(),
        publisher: String(book.publisher || 'Syntropy Books').trim(),
        description: String(book.description || '새로 추가된 도서입니다.').trim(),
        cover: String(book.cover || '').trim(),
        category: normalizedCategory,
        categories: isUncategorizedBook(book) && categoryLabel === '미분류' ? [] : categories,
        categorySlug
    };
};

const getBooksForCategory = (categorySlug, categoryLabel) => {
    const catalogBooks = getCatalogBooks()
        .map((book) => normalizeCatalogBook(book, categorySlug, categoryLabel))
        .filter(Boolean);

    const matchingCatalogBooks = catalogBooks.filter((book) => {
        if (!categoryLabel) {
            return true;
        }

        if (categoryLabel === '미분류') {
            return isUncategorizedBook(book);
        }

        const categories = getBookCategories(book);
        return categories.includes(categoryLabel) || book.category === categoryLabel;
    });

    if (matchingCatalogBooks.length > 0) {
        return matchingCatalogBooks;
    }

    if (categoryLabel === '미분류') {
        return (categoryBooks.uncategorized || []).map((book) => ({
            title: book.title,
            author: book.author,
            description: book.description,
            category: '미분류',
            categorySlug,
            cover: book.cover || ''
        }));
    }

    return (categoryBooks[categorySlug] || []).map((book) => ({
        title: book.title,
        author: book.author,
        description: book.description,
        category: categoryLabel,
        categorySlug,
        cover: book.cover || ''
    }));
};

const getRandomFeaturedBook = (categorySlug, categoryLabel) => {
    const books = getBooksForCategory(categorySlug, categoryLabel);
    if (!books.length) {
        return null;
    }

    return books[Math.floor(Math.random() * books.length)];
};

const updateOverviewBookCard = (card, featuredBook, categoryLabel) => {
    const resolvedCategoryLabel = categoryLabel || card.dataset.categoryLabel || '도서';
    const categoryElement = card.querySelector('.book-category');
    if (categoryElement) {
        categoryElement.textContent = resolvedCategoryLabel;
    }

    card.dataset.categoryLabel = resolvedCategoryLabel;
    card.setAttribute('data-category-label', resolvedCategoryLabel);

    const titleElement = card.querySelector('.book-title');
    const authorElement = card.querySelector('.book-author');
    const translatorElement = card.querySelector('.book-translator');
    const publisherElement = card.querySelector('.book-publisher');
    const descriptionElement = card.querySelector('.book-description');
    const coverElement = card.querySelector('.book-cover');

    if (featuredBook) {
        if (titleElement) {
            titleElement.textContent = featuredBook.title;
        }
        if (authorElement) {
            authorElement.textContent = featuredBook.author || '미상';
        }
        if (translatorElement) {
            translatorElement.textContent = featuredBook.translator ? `옮긴이: ${featuredBook.translator}` : '';
            translatorElement.hidden = !featuredBook.translator;
        }
        if (publisherElement) {
            publisherElement.textContent = `출판사: ${featuredBook.publisher || 'Syntropy Books'}`;
        }
        if (descriptionElement) {
            descriptionElement.textContent = featuredBook.description || '새로 추가된 도서입니다.';
        }
        if (coverElement) {
            const coverPath = featuredBook.cover ? `../images/book-covers/${featuredBook.cover}` : `../images/book-covers/book.svg`;
            coverElement.src = coverPath;
            coverElement.alt = `${featuredBook.title} 책표지 미리보기`;
        }
    }
};

const filterBooksOverview = () => {
    const selectedCategory = window.location.hash.slice(1);
    const isValidCategory = Object.prototype.hasOwnProperty.call(bookCategoryLabels, selectedCategory);
    const cards = [...document.querySelectorAll('.book-container .book-card')];

    cards.forEach((card) => {
        const shouldShow = !isValidCategory || card.id === selectedCategory;
        card.classList.toggle('is-hidden', !shouldShow);
    });
};

const syncCatalogWithBooksPage = () => {
    const container = document.querySelector('.book-container');
    if (!container) {
        return;
    }

    setupGeneratedCardNavigation();
    [...document.querySelectorAll('.book-container .book-card[data-generated="true"]')].forEach((card) => card.remove());

    [...container.querySelectorAll('.book-card')].forEach((card) => {
        const categorySlug = card.id || card.dataset.categoryId;
        const categoryLabel = bookCategoryLabels[categorySlug] || card.dataset.categoryLabel || '도서';
        const featuredBook = getRandomFeaturedBook(categorySlug, categoryLabel);
        updateOverviewBookCard(card, featuredBook, categoryLabel);
    });

    filterBooksOverview();
};

const categoryBooks = {
    'life-science': [
        {
            title: '생명이란 무엇인가',
            author: '에르빈 슈뢰딩거',
            description: '물리학의 언어로 생명과 질서의 근원을 탐구하며, 살아 있는 세계를 새롭게 바라보게 하는 고전입니다.'
        },
        {
            title: '다윈의 위험한 생각',
            author: '대니얼 데닛',
            description: '진화라는 관점이 생명과 마음, 질서를 이해하는 방식을 어떻게 바꾸는지 살펴봅니다.'
        },
        {
            title: '생명의 그물',
            author: '프리초프 카프라',
            description: '생명체와 생태계가 관계의 망 속에서 질서를 만들어 가는 과정을 설명합니다.'
        }
    ],
    'systems-thinking': [
        {
            title: '생명의 그물',
            author: '프리초프 카프라',
            description: '생태계와 사회를 서로 연결된 네트워크로 읽으며, 관계 속에서 생겨나는 질서를 설명합니다.'
        },
        {
            title: '시스템 사고',
            author: '피터 센게',
            description: '부분의 합을 넘어 조직과 사회 전체의 구조와 흐름을 바라보는 사고법을 소개합니다.'
        },
        {
            title: '전체를 보는 방법',
            author: '시스템 사고 큐레이션',
            description: '복잡한 문제를 요소가 아닌 상호작용과 순환의 관점에서 다시 읽어보는 안내서입니다.'
        }
    ],
    'complexity': [
        {
            title: '카오스',
            author: '제임스 글릭',
            description: '작은 변화가 거대한 패턴을 만드는 과정을 따라가며 혼돈 속의 질서를 보여줍니다.'
        },
        {
            title: '복잡계 개론',
            author: '복잡계 큐레이션',
            description: '상호작용하는 요소들이 자기조직화를 통해 새로운 패턴을 만드는 원리를 살펴봅니다.'
        },
        {
            title: '세상을 바꾼 17가지 방정식',
            author: '이언 스튜어트',
            description: '수학적 구조가 자연과 사회의 복잡한 현상을 이해하는 틀이 되는 순간을 소개합니다.'
        }
    ],
    cosmos: [
        {
            title: '코스모스',
            author: '칼 세이건',
            description: '우주의 시간과 생명의 진화를 연결해 바라보며 지식의 질서를 보여주는 책입니다.'
        },
        {
            title: '시간의 역사',
            author: '스티븐 호킹',
            description: '우주의 시작과 변화에 대한 질문을 통해 시간과 공간의 구조를 탐구합니다.'
        },
        {
            title: '창백한 푸른 점',
            author: '칼 세이건',
            description: '우주 속 작은 행성에서 살아가는 인간의 위치와 책임을 성찰하게 합니다.'
        }
    ],
    evolution: [
        {
            title: '이기적 유전자',
            author: '리처드 도킨스',
            description: '생명체의 행동과 진화를 유전자 관점에서 살피며 생명 시스템의 유지를 질문합니다.'
        },
        {
            title: '협력의 진화',
            author: '로버트 액설로드',
            description: '경쟁하는 존재들 사이에서 협력이 어떻게 안정적인 질서로 자리 잡는지 탐구합니다.'
        },
        {
            title: '생명체의 협력',
            author: '린 마굴리스',
            description: '공생과 상호의존을 통해 진화가 만들어 온 생명의 연결 구조를 바라봅니다.'
        }
    ],
    energy: [
        {
            title: '엔트로피',
            author: '제러미 리프킨',
            description: '에너지의 흐름과 문명의 방향을 돌아보며 지속 가능한 전환을 생각하게 합니다.'
        },
        {
            title: '에너지와 문명',
            author: '바츨라프 스밀',
            description: '인류 문명의 변화가 에너지의 생산과 사용 방식과 어떻게 연결되는지 분석합니다.'
        },
        {
            title: '지속 가능한 에너지',
            author: '데이비드 맥케이',
            description: '에너지 선택의 현실적인 조건을 수치와 시스템의 관점에서 차분하게 살펴봅니다.'
        }
    ],
    ecology: [
        {
            title: '오래된 미래',
            author: '헬레나 노르베리 호지',
            description: '지역 공동체의 삶을 통해 성장 중심 문명을 성찰하고 미래의 단서를 찾습니다.'
        },
        {
            title: '침묵의 봄',
            author: '레이첼 카슨',
            description: '자연의 연결망을 무너뜨리는 화학물질의 영향을 알리며 생태적 책임을 일깨웁니다.'
        },
        {
            title: '숲은 생각한다',
            author: '에두아르도 콘',
            description: '인간 너머의 생명들과 함께 살아가는 세계를 새롭게 이해하는 생태인류학 책입니다.'
        }
    ],
    philosophy: [
        {
            title: '장자',
            author: '장자',
            description: '고정된 질서에서 벗어나 변화와 관계의 흐름을 바라보는 감각을 일깨웁니다.'
        },
        {
            title: '스피노자 철학',
            author: '스피노자',
            description: '인간과 자연을 하나의 연결된 질서로 바라보며 함께 존재하는 방식을 생각합니다.'
        },
        {
            title: '자연과 자유',
            author: '철학 큐레이션',
            description: '자연과 함께 살아가는 삶의 태도와 판단의 기준을 탐구하는 책들을 소개합니다.'
        }
    ],
    uncategorized: [
        {
            title: '미분류 샘플 도서',
            author: '분류 대기',
            description: '카테고리 분류가 아직 완료되지 않은 도서입니다.'
        },
        {
            title: '분류 보류 자료집',
            author: '큐레이션 팀',
            description: '검토 중인 도서 정보를 임시 보관한 분류 대기 목록입니다.'
        },
        {
            title: '카테고리 검토 노트',
            author: '편집부',
            description: '주제 재정의가 필요한 도서를 모아 분류 기준을 정리합니다.'
        }
    ]
};

// 신간 상태는 카드의 배열 순서가 아니라 이 목록으로 판단합니다.
const newBookTitles = new Set([
    '생명이란 무엇인가',
    '생명의 그물',
    '카오스',
    '코스모스',
    '이기적 유전자',
    '엔트로피',
    '오래된 미래',
    '장자'
]);

const updateCatalogFields = (card, title) => {
    if (typeof getCatalogBookData !== 'function') {
        return;
    }

    const metadata = getCatalogBookData(title);
    let price = card.querySelector('.book-price');
    let stock = card.querySelector('.book-stock');
    let registered = card.querySelector('.book-registered');
    let expiry = card.querySelector('.book-new-until');
    const publisher = card.querySelector('.book-publisher');

    if (!price || !stock || !registered || !expiry) {
        price = price || document.createElement('p');
        stock = stock || document.createElement('p');
        registered = registered || document.createElement('p');
        expiry = expiry || document.createElement('p');
        price.className = 'book-price';
        stock.className = 'book-stock';
        registered.className = 'book-registered';
        expiry.className = 'book-new-until';
        publisher?.after(price, stock, registered, expiry);
    }

    price.textContent = `책값: ${formatCatalogPrice(metadata.price)}`;
    stock.textContent = `재고: ${metadata.stock}권`;
    registered.textContent = `등록일: ${formatCatalogDate(metadata.registeredAt)}`;
    expiry.textContent = `신간 만료일: ${formatCatalogDate(metadata.newUntil)}`;
};

const bookMetadata = {
    '생명이란 무엇인가': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '생명의 그물': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '카오스': { translator: '박배식', publisher: '승산' },
    '코스모스': { translator: '홍승수', publisher: '사이언스북스' },
    '이기적 유전자': { translator: '홍영남, 이상임', publisher: '을유문화사' },
    '엔트로피': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '오래된 미래': { translator: '김태언', publisher: '중앙북스' },
    '장자': { translator: '김학주', publisher: '을유문화사' },
    '미분류 샘플 도서': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '분류 보류 자료집': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '카테고리 검토 노트': { translator: '', publisher: 'Syntropy Books 큐레이션' }
};

const updateBookCard = (card, book) => {
    const metadata = bookMetadata[book.title] || {
        translator: '',
        publisher: 'Syntropy Books 큐레이션'
    };

    card.querySelector('.book-title').textContent = book.title;
    card.querySelector('.book-author').textContent = book.author;
    card.querySelector('.book-translator').textContent = metadata.translator ? `옮긴이: ${metadata.translator}` : '';
    card.querySelector('.book-publisher').textContent = `출판사: ${metadata.publisher}`;
    card.querySelector('.book-description').textContent = book.description;
    updateCatalogFields(card, book.title);
    const newBadge = card.querySelector('.book-new-badge');
    if (newBadge) {
        const isNewBook = typeof getCatalogBookData === 'function'
            ? getCatalogBookData(book.title).isNew
            : newBookTitles.has(book.title);
        newBadge.classList.toggle('is-hidden', !isNewBook);
    }
    card.classList.remove('is-changing');
    requestAnimationFrame(() => card.classList.add('is-changing'));
    document.querySelector('#book-search-input')?.dispatchEvent(new Event('input'));
};

const getRandomDelay = () => {
    const delayRange = MAX_ROTATION_DELAY_MS - MIN_ROTATION_DELAY_MS;
    return MIN_ROTATION_DELAY_MS + Math.random() * delayRange;
};

const scheduleCardRotation = (card, books, positions) => {
    window.setTimeout(() => {
        const currentPosition = positions.get(card.id);
        let nextPosition = Math.floor(Math.random() * books.length);

        while (nextPosition === currentPosition) {
            nextPosition = Math.floor(Math.random() * books.length);
        }

        positions.set(card.id, nextPosition);
        updateBookCard(card, books[nextPosition]);
        scheduleCardRotation(card, books, positions);
    }, getRandomDelay());
};

const startBookRotation = () => {
    const cards = [...document.querySelectorAll('.book-card[id]')];

    if (cards.length === 0) {
        return;
    }

    if (document.body.dataset.bookRotationStarted === 'true') {
        return;
    }
    document.body.dataset.bookRotationStarted = 'true';

    const positions = new Map(cards.map((card) => [card.id, 0]));

    cards.forEach((card) => {
        const books = categoryBooks[card.id];
        if (!books || books.length < 2) {
            return;
        }

        scheduleCardRotation(card, books, positions);
        updateCatalogFields(card, card.querySelector('.book-title')?.textContent.trim());

        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                return;
            }

            const title = card.querySelector('.book-title')?.textContent.trim();
            if (title) {
                const categoryPage = categoryPageBySlug[card.id];
                if (categoryPage) {
                    window.location.href = `${categoryPage}?book=${encodeURIComponent(title)}`;
                } else {
                    window.location.href = `book-detail.html?book=${encodeURIComponent(title)}`;
                }
            }
        });
    });
};

const startBookSearch = () => {
    const input = document.querySelector('#book-search-input');
    const status = document.querySelector('#book-search-status');
    const container = document.querySelector('.book-container');
    const cards = [...document.querySelectorAll('.book-card')];

    if (!input || !status || !container || cards.length === 0) {
        return;
    }

    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'book-search-empty';
    emptyMessage.textContent = '검색 결과가 없습니다.';
    emptyMessage.hidden = true;
    container.append(emptyMessage);

    const totalBookCount = getTotalBookCount();

    const syncNewBadge = (card) => {
        const newBadge = card.querySelector('.book-new-badge');
        const currentTitle = card.querySelector('.book-title')?.textContent.trim();
        const isNewBook = typeof getCatalogBookData === 'function'
            ? getCatalogBookData(currentTitle).isNew
            : newBookTitles.has(currentTitle);
        newBadge?.classList.toggle('is-hidden', !isNewBook);
    };

    cards.forEach(syncNewBadge);

    input.addEventListener('input', () => {
        const query = input.value.trim();
        const visibleCount = query === '' ? totalBookCount : cards.filter((card) => {
            const searchableText = card.textContent.toLocaleLowerCase();
            return searchableText.includes(query.toLocaleLowerCase());
        }).length;

        status.textContent = query === '' ? `전체 도서 ${totalBookCount}권` : `검색 결과 ${visibleCount}권`;
    });

    input.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        const query = input.value.trim();
        if (!query) {
            return;
        }

        const targetUrl = `search-results.html?q=${encodeURIComponent(query)}`;
        window.location.href = targetUrl;
    });
};

const initBooksPage = () => {
    syncCatalogWithBooksPage();
    setupGeneratedCardNavigation();
    startBookRotation();
    startBookSearch();
    updateBooksPageHeading();
    window.addEventListener('hashchange', updateBooksPageHeading);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBooksPage);
} else {
    initBooksPage();
}

window.addEventListener('syntropyCatalogUpdated', syncCatalogWithBooksPage);
