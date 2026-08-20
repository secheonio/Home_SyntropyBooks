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

const fallbackCategoryBooks = {
    'life-science': [
        { title: '생명이란 무엇인가', author: '에르빈 슈뢰딩거', translator: '', publisher: 'Syntropy Books 큐레이션', description: '물리학의 언어로 생명과 질서의 근원을 탐구하며 살아 있는 세계를 새롭게 바라보게 하는 고전입니다.', cover: 'life-science.svg' },
        { title: '다윈의 위험한 생각', author: '대니얼 데닛', translator: '', publisher: 'Syntropy Books 큐레이션', description: '진화라는 관점이 생명과 마음, 질서를 이해하는 방식을 어떻게 바꾸는지 살펴봅니다.', cover: 'life-science.svg' },
        { title: '생명의 그물', author: '프리초프 카프라', translator: '', publisher: 'Syntropy Books 큐레이션', description: '생태계와 사회를 서로 연결된 네트워크로 읽어냅니다.', cover: 'life-science.svg' }
    ],
    'systems-thinking': [
        { title: '생명의 그물', author: '프리초프 카프라', translator: '', publisher: 'Syntropy Books 큐레이션', description: '생태계와 사회를 서로 연결된 네트워크로 읽고 관계 속의 질서를 이해합니다.', cover: 'systems-thinking.svg' },
        { title: '시스템 사고', author: '피터 센게', translator: '', publisher: 'Syntropy Books 큐레이션', description: '복잡한 문제를 구조와 상호작용의 관점에서 바라보는 사고법을 소개합니다.', cover: 'systems-thinking.svg' },
        { title: '전체를 보는 방법', author: '시스템 사고 큐레이션', translator: '', publisher: 'Syntropy Books 큐레이션', description: '복잡한 사회와 조직 문제를 전체적인 흐름으로 읽어내는 관점을 제시합니다.', cover: 'systems-thinking.svg' }
    ],
    complexity: [
        { title: '카오스', author: '제임스 글릭', translator: '박배식', publisher: '승산', description: '작은 변화가 거대한 패턴을 만드는 과정을 따라가며 혼돈 속 질서를 보여줍니다.', cover: 'complexity.svg' },
        { title: '복잡계 개론', author: '복잡계 큐레이션', translator: '', publisher: 'Syntropy Books 큐레이션', description: '상호작용하는 요소들이 자기조직화를 통해 새로운 패턴을 만드는 원리를 살펴봅니다.', cover: 'complexity.svg' },
        { title: '세상을 바꾼 17가지 방정식', author: '이언 스튜어트', translator: '', publisher: 'Syntropy Books 큐레이션', description: '수학적 구조가 자연과 사회를 이해하는 틀이 되는 순간을 소개합니다.', cover: 'complexity.svg' }
    ],
    cosmos: [
        { title: '코스모스', author: '칼 세이건', translator: '홍승수', publisher: '사이언스북스', description: '우주의 시간과 생명의 진화를 연결해 바라보며 지식의 질서를 보여주는 책입니다.', cover: 'cosmos.svg' },
        { title: '시간의 역사', author: '스티븐 호킹', translator: '', publisher: 'Syntropy Books 큐레이션', description: '우주의 시작과 변화에 대한 질문을 통해 시간과 공간의 구조를 탐구합니다.', cover: 'cosmos.svg' },
        { title: '창백한 푸른 점', author: '칼 세이건', translator: '', publisher: 'Syntropy Books 큐레이션', description: '우주 속 작은 행성에서 살아가는 인간의 위치와 책임을 성찰하게 합니다.', cover: 'cosmos.svg' }
    ],
    evolution: [
        { title: '이기적 유전자', author: '리처드 도킨스', translator: '홍영남, 이상임', publisher: '을유문화사', description: '생명체의 행동과 진화를 유전자 관점에서 살피며 생명 시스템의 유지를 질문합니다.', cover: 'evolution.svg' },
        { title: '협력의 진화', author: '로버트 액설로드', translator: '', publisher: 'Syntropy Books 큐레이션', description: '경쟁하는 존재들 사이에서 협력이 어떻게 안정적인 질서로 자리 잡는지 탐구합니다.', cover: 'evolution.svg' },
        { title: '생명체의 협력', author: '린 마굴리스', translator: '', publisher: 'Syntropy Books 큐레이션', description: '공생과 상호의존을 통해 진화가 만들어 온 생명의 연결 구조를 바라봅니다.', cover: 'evolution.svg' }
    ],
    energy: [
        { title: '엔트로피', author: '제러미 리프킨', translator: '', publisher: 'Syntropy Books 큐레이션', description: '에너지의 흐름과 문명의 방향을 돌아보며 지속 가능한 전환을 생각하게 합니다.', cover: 'energy.svg' },
        { title: '에너지와 문명', author: '바츨라프 스밀', translator: '', publisher: 'Syntropy Books 큐레이션', description: '인류 문명의 변화가 에너지의 생산과 사용 방식과 어떻게 연결되는지 분석합니다.', cover: 'energy.svg' },
        { title: '지속 가능한 에너지', author: '데이비드 맥케이', translator: '', publisher: 'Syntropy Books 큐레이션', description: '에너지 선택의 현실적인 조건을 수치와 시스템의 관점에서 차분하게 살펴봅니다.', cover: 'energy.svg' }
    ],
    ecology: [
        { title: '오래된 미래', author: '헬레나 노르베리 호지', translator: '김태언', publisher: '중앙북스', description: '지역 공동체의 삶을 통해 성장 중심 문명을 성찰하고 미래의 단서를 찾습니다.', cover: 'ecology.svg' },
        { title: '침묵의 봄', author: '레이첼 카슨', translator: '', publisher: 'Syntropy Books 큐레이션', description: '자연의 연결망을 무너뜨리는 화학물질의 영향을 알리며 생태적 책임을 일깨웁니다.', cover: 'ecology.svg' },
        { title: '숲은 생각한다', author: '에두아르도 콘', translator: '', publisher: 'Syntropy Books 큐레이션', description: '인간 너머의 생명들과 함께 살아가는 세계를 새롭게 이해하는 생태인류학 책입니다.', cover: 'ecology.svg' }
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

const getCategoryBooks = (categorySlug, categoryLabel) => {
    const savedBooks = getCatalogBooks();
    const matchingSavedBooks = savedBooks.filter((book) => {
        const categories = getBookCategories(book);
        return categories.includes(categoryLabel) || book.category === categoryLabel || String(book.categorySlug || '').trim() === String(categorySlug || '');
    });

    if (matchingSavedBooks.length) {
        return matchingSavedBooks.map((book) => ({
            title: String(book.title || '').trim(),
            author: String(book.author || '미상').trim(),
            translator: String(book.translator || '').trim(),
            publisher: String(book.publisher || 'Syntropy Books 큐레이션').trim(),
            description: String(book.description || '새로 추가된 도서입니다.').trim(),
            cover: String(book.cover || '').trim() || 'book.svg',
            category: String(book.category || categoryLabel).trim(),
            categories: getBookCategories(book)
        }));
    }

    return (fallbackCategoryBooks[categorySlug] || []).map((book) => ({
        ...book,
        category: categoryLabel,
        categories: [categoryLabel]
    }));
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
    const bookList = getCategoryBooks(categorySlug, categoryLabel);
    const container = document.querySelector('.category-books');

    if (!container) {
        return;
    }

    const selectedBook = new URLSearchParams(window.location.search).get('book');
    const orderedBooks = [...bookList];
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
