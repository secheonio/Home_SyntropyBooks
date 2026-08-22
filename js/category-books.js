const categorySlugByPath = {
    'life-science.html': 'life-science',
    'systems-thinking.html': 'systems-thinking',
    'complexity.html': 'complexity',
    'cosmos.html': 'cosmos',
    'evolution.html': 'evolution',
    'energy.html': 'energy',
    'ecology.html': 'ecology',
    'philosophy.html': 'philosophy'
};

const categoryLabelBySlug = {
    'life-science': '생명과학',
    'systems-thinking': '시스템 사고',
    complexity: '복잡계',
    cosmos: '우주와 질서',
    evolution: '진화와 협력',
    energy: '문명과 에너지',
    ecology: '생태철학',
    philosophy: '철학'
};

const categoryDescriptionBySlug = {
    'life-science': '생명의 구조, 진화, 생태적 상호작용을 읽는 데 필요한 질문들을 담아낸 책들을 모았습니다.',
    'systems-thinking': '개별 요소보다 관계와 순환, 구조를 읽는 법을 익히는 데 도움이 되는 책들을 모았습니다.',
    complexity: '혼돈처럼 보이는 현상을 패턴과 자기조직화의 관점으로 이해하게 만드는 책들을 모았습니다.',
    cosmos: '우주, 시간, 지식의 구조를 함께 읽으며 인간의 자리를 다시 묻는 책들을 모았습니다.',
    evolution: '경쟁과 협력, 진화와 공존이 생명의 역사 속에서 어떤 질서를 만들어 왔는지 살펴보는 책들을 모았습니다.',
    energy: '에너지의 흐름이 문명, 도시, 삶의 방식과 어떻게 연결되는지 생각하게 만드는 책들을 모았습니다.',
    ecology: '자연과 공동체, 지속 가능한 삶을 다시 바라보게 하는 책들을 모았습니다.',
    philosophy: '변화와 관계, 삶의 의미와 좋은 삶의 방향을 오래 생각하게 만드는 책들을 모았습니다.'
};

const fallbackCategoryBooks = {
    'life-science': [
        { title: '생명이란 무엇인가', author: '에르빈 슈뢰딩거', translator: '', publisher: 'Syntropy Books 큐레이션', description: '물리학의 언어로 생명과 질서의 근원을 탐구하며 살아 있는 세계를 새롭게 바라보게 하는 고전입니다.', cover: 'life-science.svg' },
        { title: '다윈의 위험한 생각', author: '대니얼 데닛', translator: '', publisher: 'Syntropy Books 큐레이션', description: '진화라는 관점이 생명과 마음, 질서를 이해하는 방식을 어떻게 바꾸는지 살펴봅니다.', cover: 'life-science.svg' },
        { title: '고요한 붉은 달', author: '서윤아', translator: '', publisher: 'Syntropy Books 큐레이션', description: '생명이 감추고 드러내는 서정적이고 선택적인 존재 방식을 탐색합니다.', cover: 'life-science.svg' }
    ],
    'systems-thinking': [
        { title: '시스템 사고', author: '피터 센게', translator: '', publisher: 'Syntropy Books 큐레이션', description: '복잡한 문제를 구조와 상호작용의 관점에서 바라보는 사고법을 소개합니다.', cover: 'systems-thinking.svg' },
        { title: '사라지는 경계', author: '나재호', translator: '', publisher: 'Syntropy Books 큐레이션', description: '관계와 경계가 흐르는 사회를 이해하는 실전적 분석을 제시합니다.', cover: 'systems-thinking.svg' },
        { title: '달빛 아래의 네트워크', author: '정우진', translator: '', publisher: 'Syntropy Books 큐레이션', description: '네트워크 안에서 관계가 만들어내는 질서와 불균형을 고민합니다.', cover: 'systems-thinking.svg' }
    ],
    complexity: [
        { title: '카오스', author: '제임스 글릭', translator: '박배식', publisher: '승산', description: '작은 변화가 거대한 패턴을 만드는 과정을 따라가며 혼돈 속 질서를 보여줍니다.', cover: 'complexity.svg' },
        { title: '복잡계 개론', author: '복잡계 큐레이션', translator: '', publisher: 'Syntropy Books 큐레이션', description: '상호작용하는 요소들이 자기조직화를 통해 새로운 패턴을 만드는 원리를 살펴봅니다.', cover: 'complexity.svg' },
        { title: '무질서의 그림자', author: '이도엽', translator: '', publisher: 'Syntropy Books 큐레이션', description: '복잡한 문제에서 혼란을 읽는 인식의 틀을 정리합니다.', cover: 'complexity.svg' }
    ],
    cosmos: [
        { title: '코스모스', author: '칼 세이건', translator: '홍승수', publisher: '사이언스북스', description: '우주의 시간과 생명의 진화를 연결해 바라보며 지식의 질서를 보여주는 책입니다.', cover: 'cosmos.svg' },
        { title: '시간의 역사', author: '스티븐 호킹', translator: '', publisher: 'Syntropy Books 큐레이션', description: '우주의 시작과 변화에 대한 질문을 통해 시간과 공간의 구조를 탐구합니다.', cover: 'cosmos.svg' },
        { title: '태양의 반지', author: '김지혜', translator: '', publisher: 'Syntropy Books 큐레이션', description: '태양계와 인간의 위치를 전반적 관점으로 다시 고찰합니다.', cover: 'cosmos.svg' }
    ],
    evolution: [
        { title: '이기적 유전자', author: '리처드 도킨스', translator: '홍영남, 이상임', publisher: '을유문화사', description: '생명체의 행동과 진화를 유전자 관점에서 살피며 생명 시스템의 유지를 질문합니다.', cover: 'evolution.svg' },
        { title: '협력의 진화', author: '로버트 액설로드', translator: '', publisher: 'Syntropy Books 큐레이션', description: '경쟁하는 존재들 사이에서 협력이 어떻게 안정적인 질서로 자리 잡는지 탐구합니다.', cover: 'evolution.svg' },
        { title: '진화의 가벼움', author: '빈예준', translator: '', publisher: 'Syntropy Books 큐레이션', description: '진화가 천천히 그리고 가볍게 만들어내는 변화의 심리를 살펴봅니다.', cover: 'evolution.svg' }
    ],
    energy: [
        { title: '엔트로피', author: '제러미 리프킨', translator: '', publisher: 'Syntropy Books 큐레이션', description: '에너지의 흐름과 문명의 방향을 돌아보며 지속 가능한 전환을 생각하게 합니다.', cover: 'energy.svg' },
        { title: '에너지와 문명', author: '바츨라프 스밀', translator: '', publisher: 'Syntropy Books 큐레이션', description: '인류 문명의 변화가 에너지의 생산과 사용 방식과 어떻게 연결되는지 분석합니다.', cover: 'energy.svg' },
        { title: '도시에서 배우는 평온', author: '신유나', translator: '', publisher: 'Syntropy Books 큐레이션', description: '에너지와 감정, 도시의 구조가 평온을 만드는 방식을 생각합니다.', cover: 'energy.svg' }
    ],
    ecology: [
        { title: '오래된 미래', author: '헬레나 노르베리 호지', translator: '김태언', publisher: '중앙북스', description: '지역 공동체의 삶을 통해 성장 중심 문명을 성찰하고 미래의 단서를 찾습니다.', cover: 'ecology.svg' },
        { title: '침묵의 봄', author: '레이첼 카슨', translator: '', publisher: 'Syntropy Books 큐레이션', description: '자연의 연결망을 무너뜨리는 화학물질의 영향을 알리며 생태적 책임을 일깨웁니다.', cover: 'ecology.svg' },
        { title: '생태계의 낮은 목소리', author: '문지환', translator: '', publisher: 'Syntropy Books 큐레이션', description: '작은 생태적 신호들이 전체를 어떻게 움직이는지 살펴봅니다.', cover: 'ecology.svg' }
    ],
    philosophy: [
        { title: '장자', author: '장자', translator: '김학주', publisher: '을유문화사', description: '고정된 질서에서 벗어나 변화와 관계의 흐름을 바라보는 감각을 일깨웁니다.', cover: 'philosophy.svg' },
        { title: '스피노자 철학', author: '스피노자', translator: '', publisher: 'Syntropy Books 큐레이션', description: '인간과 자연을 하나의 연결된 질서로 바라보며 함께 존재하는 방식을 생각합니다.', cover: 'philosophy.svg' },
        { title: '자연과 자유', author: '철학 큐레이션', translator: '', publisher: 'Syntropy Books 큐레이션', description: '자연과 함께 살아가는 삶의 태도와 판단의 기준을 탐구하는 책들을 소개합니다.', cover: 'philosophy.svg' }
    ]
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

const getCatalogBooks = () => {
    try {
        const savedBooks = JSON.parse(localStorage.getItem('syntropyBooksCatalog') || '[]');
        return Array.isArray(savedBooks) ? savedBooks : [];
    } catch (error) {
        return [];
    }
};

const canonicalCategoryOrder = {
    'life-science': ['생명이란 무엇인가', '다윈의 위험한 생각', '고요한 붉은 달'],
    'systems-thinking': ['생명의 그물', '시스템 사고', '사라지는 경계', '달빛 아래의 네트워크'],
    complexity: ['카오스', '복잡계 개론', '무질서의 그림자'],
    cosmos: ['코스모스', '시간의 역사', '우주에서 읽는 인간', '태양의 반지'],
    evolution: ['이기적 유전자', '협력의 진화', '진화의 가벼움', '공존의 패턴'],
    energy: ['엔트로피', '에너지와 문명', '에너지의 일기', '도시에서 배우는 평온', '도시와 평온'],
    ecology: ['오래된 미래', '침묵의 봄', '생태계의 낮은 목소리', '첫 번째 질문'],
    philosophy: ['장자', '스피노자 철학', '결정의 형태', '시간의 나무', '막다른 길의 철학', '새벽의 구조', '자연과 자유']
};

const sortByCanonicalCategoryOrder = (books, categorySlug) => {
    const orderList = canonicalCategoryOrder[categorySlug] || [];
    const orderMap = new Map(orderList.map((title, index) => [title, index]));

    return [...books].sort((a, b) => {
        const aTitle = String(a.title || '').trim();
        const bTitle = String(b.title || '').trim();
        const aIndex = orderMap.has(aTitle) ? orderMap.get(aTitle) : Number.MAX_SAFE_INTEGER;
        const bIndex = orderMap.has(bTitle) ? orderMap.get(bTitle) : Number.MAX_SAFE_INTEGER;

        if (aIndex !== bIndex) {
            return aIndex - bIndex;
        }

        return aTitle.localeCompare(bTitle, 'ko');
    });
};

const getCategoryBooks = (categorySlug, categoryLabel) => {
    const savedBooks = getCatalogBooks();
    const matchingSavedBooks = savedBooks.filter((book) => {
        const categories = getBookCategories(book);
        return categories.includes(categoryLabel) || book.category === categoryLabel || String(book.categorySlug || '').trim() === String(categorySlug || '');
    });

    if (matchingSavedBooks.length) {
        return sortByCanonicalCategoryOrder(matchingSavedBooks.map((book) => ({
            title: String(book.title || '').trim(),
            author: String(book.author || '미상').trim(),
            translator: String(book.translator || '').trim(),
            publisher: String(book.publisher || 'Syntropy Books 큐레이션').trim(),
            description: String(book.description || '새로 추가된 도서입니다.').trim(),
            cover: String(book.cover || '').trim() || 'book.svg',
            category: String(book.category || categoryLabel).trim(),
            categories: getBookCategories(book)
        })), categorySlug);
    }

    return sortByCanonicalCategoryOrder((fallbackCategoryBooks[categorySlug] || []).map((book) => ({
        ...book,
        category: categoryLabel,
        categories: [categoryLabel]
    })), categorySlug);
};

const reflowCategoryBooks = () => {
    const categoryBooks = document.querySelector('.category-books');
    if (!categoryBooks) {
        return;
    }

    categoryBooks.style.display = 'grid';
    categoryBooks.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
    categoryBooks.style.gridAutoFlow = 'row';
    categoryBooks.style.alignContent = 'start';
};

const renderCategoryBooks = () => {
    const pageName = window.location.pathname.split('/').pop();
    const categorySlug = categorySlugByPath[pageName];
    const categoryLabel = categoryLabelBySlug[categorySlug] || '도서';
    const categoryDescription = categoryDescriptionBySlug[categorySlug] || '도서들의 흐름을 읽어가는 장입니다.';
    const descriptionNode = document.querySelector('.category-description');
    if (descriptionNode) {
        descriptionNode.textContent = categoryDescription;
    }

    const bookList = getCategoryBooks(categorySlug, categoryLabel);
    const container = document.querySelector('.category-books');

    if (!container) {
        return;
    }

    const selectedBook = new URLSearchParams(window.location.search).get('book');
    const canonicalOrder = {
        'life-science': ['생명이란 무엇인가', '다윈의 위험한 생각', '고요한 붉은 달'],
        'systems-thinking': ['시스템 사고', '사라지는 경계', '달빛 아래의 네트워크'],
        complexity: ['카오스', '복잡계 개론', '무질서의 그림자'],
        cosmos: ['코스모스', '시간의 역사', '태양의 반지'],
        evolution: ['이기적 유전자', '협력의 진화', '진화의 가벼움'],
        energy: ['엔트로피', '에너지와 문명', '도시에서 배우는 평온'],
        ecology: ['오래된 미래', '침묵의 봄', '생태계의 낮은 목소리'],
        philosophy: ['장자', '스피노자 철학', '자연과 자유']
    };

    const orderedBooks = [...bookList].sort((a, b) => {
        const orderList = canonicalOrder[categorySlug] || [];
        const indexA = orderList.indexOf(String(a.title || ''));
        const indexB = orderList.indexOf(String(b.title || ''));
        if (indexA !== -1 || indexB !== -1) {
            return (indexA === -1 ? orderList.length : indexA) - (indexB === -1 ? orderList.length : indexB);
        }
        return String(a.title || '').localeCompare(String(b.title || ''));
    });

    const selectedIndex = orderedBooks.findIndex((book) => book.title === selectedBook);
    if (selectedIndex > 0) {
        const [selectedBookItem] = orderedBooks.splice(selectedIndex, 1);
        orderedBooks.unshift(selectedBookItem);
    }

    container.innerHTML = orderedBooks.map((book) => {
        const title = String(book.title || '').trim();
        const author = String(book.author || '미상').trim();
        const translator = String(book.translator || '').trim();
        const publisher = String(book.publisher || 'Syntropy Books 큐레이션').trim();
        const description = String(book.description || '새로 추가된 도서입니다.').trim();
        const coverName = String(book.cover || '').trim() || 'book.svg';
        const coverPath = coverName.startsWith('data:') ? coverName : `../images/book-covers/${coverName}`;
        const metadata = typeof getCatalogBookData === 'function' ? getCatalogBookData(title) : null;
        const isNew = metadata ? metadata.isNew : true;

        return `
            <article class="category-book book-card" data-title="${title}">
                <div class="book-card-top">
                    <span class="book-category">${categoryLabel}</span>
                    <span class="book-new-badge${isNew ? '' : ' is-hidden'}">신간</span>
                </div>
                <h2>${title}</h2>
                <p class="book-author">${author}</p>
                <p class="book-translator" ${translator ? '' : 'hidden'}>${translator ? `옮긴이: ${translator}` : ''}</p>
                <p class="book-publisher">출판사: ${publisher}</p>
                ${typeof addCatalogFields === 'function' ? `
                    <p class="book-price">책값: ${formatCatalogPrice(metadata.price)}</p>
                    <p class="book-stock">재고: ${metadata.stock}권</p>
                    <p class="book-registered">등록일: ${formatCatalogDate(metadata.registeredAt)}</p>
                    <p class="book-new-until">신간 만료일: ${formatCatalogDate(metadata.newUntil)}</p>
                ` : ''}
                <p class="book-description">${description}</p>
                <img class="book-cover" src="${coverPath}" alt="${title} 책표지 미리보기" loading="lazy">
            </article>
        `;
    }).join('');

    reflowCategoryBooks();

    container.querySelectorAll('.category-book').forEach((card) => {
        const title = card.dataset.title;
        if (!title) {
            return;
        }

        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                return;
            }
            window.location.href = `book-detail.html?book=${encodeURIComponent(title)}`;
        });
    });
};

document.addEventListener('DOMContentLoaded', renderCategoryBooks);
