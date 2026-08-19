const newBookCategories = [
    'life-science',
    'systems-thinking',
    'complexity',
    'cosmos',
    'evolution',
    'energy',
    'ecology',
    'philosophy'
];

const newBookCategoryLabels = {
    'life-science': '생명과학',
    'systems-thinking': '시스템 사고',
    complexity: '복잡계',
    cosmos: '우주와 질서',
    evolution: '진화와 협력',
    energy: '문명과 에너지',
    ecology: '생태철학',
    philosophy: '철학'
};

const newCategoryBooks = {
    'life-science': [
        ['생명이란 무엇인가', '에르빈 슈뢰딩거', '', 'Syntropy Books 큐레이션', '물리학의 언어로 생명과 질서의 근원을 탐구하는 고전입니다.', 'life-science.svg'],
        ['다윈의 위험한 생각', '대니얼 데닛', '', 'Syntropy Books 큐레이션', '진화의 관점이 생명과 마음을 이해하는 방식을 바꾸는 과정을 살펴봅니다.', 'life-science.svg'],
        ['생명의 그물', '프리초프 카프라', '', 'Syntropy Books 큐레이션', '생태계와 사회를 서로 연결된 네트워크로 읽어냅니다.', 'life-science.svg']
    ],
    'systems-thinking': [
        ['생명의 그물', '프리초프 카프라', '', 'Syntropy Books 큐레이션', '생태계와 사회를 서로 연결된 네트워크로 읽어냅니다.', 'systems-thinking.svg'],
        ['시스템 사고', '피터 센게', '', 'Syntropy Books 큐레이션', '조직과 사회 전체의 구조와 흐름을 바라보는 사고법을 소개합니다.', 'systems-thinking.svg'],
        ['전체를 보는 방법', '시스템 사고 큐레이션', '', 'Syntropy Books 큐레이션', '복잡한 문제를 관계와 구조의 관점에서 다시 읽어봅니다.', 'systems-thinking.svg']
    ],
    complexity: [
        ['카오스', '제임스 글릭', '박배식', '승산', '작은 변화가 거대한 패턴을 만드는 과정을 따라갑니다.', 'complexity.svg'],
        ['복잡계 개론', '복잡계 큐레이션', '', 'Syntropy Books 큐레이션', '상호작용하는 요소들이 새로운 질서를 만드는 원리를 살펴봅니다.', 'complexity.svg'],
        ['세상을 바꾼 17가지 방정식', '이언 스튜어트', '', 'Syntropy Books 큐레이션', '수학적 구조가 자연과 사회를 이해하는 틀이 되는 순간을 소개합니다.', 'complexity.svg']
    ],
    cosmos: [
        ['코스모스', '칼 세이건', '홍승수', '사이언스북스', '우주의 시간과 생명의 진화를 연결해 바라보는 과학 고전입니다.', 'cosmos.svg'],
        ['시간의 역사', '스티븐 호킹', '', 'Syntropy Books 큐레이션', '우주의 시작과 변화에 대한 질문을 통해 시간과 공간을 탐구합니다.', 'cosmos.svg'],
        ['창백한 푸른 점', '칼 세이건', '', 'Syntropy Books 큐레이션', '우주 속 작은 행성에서 살아가는 인간의 위치와 책임을 성찰합니다.', 'cosmos.svg']
    ],
    evolution: [
        ['이기적 유전자', '리처드 도킨스', '홍영남, 이상임', '을유문화사', '진화의 구조 안에서 생명 시스템의 유지를 질문합니다.', 'evolution.svg'],
        ['협력의 진화', '로버트 액설로드', '', 'Syntropy Books 큐레이션', '경쟁하는 존재들 사이에서 협력이 질서로 자리 잡는 과정을 탐구합니다.', 'evolution.svg'],
        ['생명체의 협력', '린 마굴리스', '', 'Syntropy Books 큐레이션', '공생과 상호의존을 통해 진화의 연결 구조를 바라봅니다.', 'evolution.svg']
    ],
    energy: [
        ['엔트로피', '제러미 리프킨', '', 'Syntropy Books 큐레이션', '에너지의 흐름과 문명의 방향을 돌아보며 지속 가능한 전환을 생각합니다.', 'energy.svg'],
        ['에너지와 문명', '바츨라프 스밀', '', 'Syntropy Books 큐레이션', '문명의 변화와 에너지 생산·사용 방식의 연결을 분석합니다.', 'energy.svg'],
        ['지속 가능한 에너지', '데이비드 맥케이', '', 'Syntropy Books 큐레이션', '에너지 선택의 현실적인 조건을 시스템 관점에서 살펴봅니다.', 'energy.svg']
    ],
    ecology: [
        ['오래된 미래', '헬레나 노르베리 호지', '김태언', '중앙북스', '지역 공동체의 삶에서 지속 가능한 미래의 단서를 찾습니다.', 'ecology.svg'],
        ['침묵의 봄', '레이첼 카슨', '', 'Syntropy Books 큐레이션', '자연의 연결망과 생태적 책임을 일깨우는 고전입니다.', 'ecology.svg'],
        ['숲은 생각한다', '에두아르도 콘', '', 'Syntropy Books 큐레이션', '인간 너머의 생명들과 함께 살아가는 세계를 이해합니다.', 'ecology.svg']
    ],
    philosophy: [
        ['장자', '장자', '김학주', '을유문화사', '변화와 관계의 흐름을 바라보며 함께 살아가는 감각을 일깨웁니다.', 'philosophy.svg'],
        ['스피노자 철학', '스피노자', '', 'Syntropy Books 큐레이션', '인간과 자연을 하나의 연결된 질서로 바라봅니다.', 'philosophy.svg'],
        ['자연과 자유', '철학 큐레이션', '', 'Syntropy Books 큐레이션', '자연과 함께 살아가는 삶의 태도와 기준을 탐구합니다.', 'philosophy.svg']
    ]
};

const updateNewBookCard = (card, book) => {
    const [title, author, translator, publisher, description, cover] = book;
    card.querySelector('.book-title').textContent = title;
    card.querySelector('.book-author').textContent = author;
    const translatorElement = card.querySelector('.book-translator');
    if (translatorElement) {
        translatorElement.textContent = translator ? `옮긴이: ${translator}` : '';
        translatorElement.hidden = !translator;
    }
    card.querySelector('.book-publisher').textContent = `출판사: ${publisher}`;
    if (typeof addCatalogFields === 'function') {
        addCatalogFields(card, title);
    }
    card.querySelector('.book-description').textContent = description;
    const coverElement = card.querySelector('.book-cover');
    if (coverElement) {
        coverElement.src = `../images/book-covers/${cover}`;
        coverElement.alt = `${title} 책표지 미리보기`;
    }
    card.classList.remove('is-changing');
    requestAnimationFrame(() => card.classList.add('is-changing'));
};

const startNewBookRotation = () => {
    const positions = new Map();
    document.querySelectorAll('.new-book-card[data-category-id]').forEach((card) => {
        const books = newCategoryBooks[card.dataset.categoryId];
        if (!books || books.length < 2) return;
        positions.set(card.dataset.categoryId, 0);
        updateNewBookCard(card, books[0]);
        const rotate = () => {
            window.setTimeout(() => {
                const current = positions.get(card.dataset.categoryId);
                let next = Math.floor(Math.random() * books.length);
                while (next === current) next = Math.floor(Math.random() * books.length);
                positions.set(card.dataset.categoryId, next);
                updateNewBookCard(card, books[next]);
                rotate();
            }, 10000 + Math.random() * 10000);
        };
        rotate();
    });
};

const updateNewBooksHeading = (selectedCategory) => {
    const heading = document.querySelector('#new-books-heading');
    if (!heading) {
        return;
    }

    const categoryLabel = newBookCategoryLabels[selectedCategory];
    heading.textContent = categoryLabel ? `신간 도서 코너 / ${categoryLabel}` : '신간 도서 코너';
};

const filterNewBooks = () => {
    const selectedCategory = window.location.hash.slice(1);
    const isValidCategory = newBookCategories.includes(selectedCategory);
    const cards = [...document.querySelectorAll('.new-book-card[data-category-id]')];
    const categoryLinks = [...document.querySelectorAll('.book-category-list[aria-label="신간 도서 카테고리"] .category-item')];

    updateNewBooksHeading(isValidCategory ? selectedCategory : '');

    cards.forEach((card) => {
        const shouldShow = !isValidCategory || card.dataset.categoryId === selectedCategory;
        card.classList.toggle('is-hidden', !shouldShow);
    });

    categoryLinks.forEach((link) => {
        const linkCategory = new URL(link.href).hash.slice(1);
        const isActive = isValidCategory && linkCategory === selectedCategory;
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.new-book-card').forEach((card) => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.closest('a')) {
                window.location.hash = card.dataset.categoryId;
                return;
            }

            const title = card.querySelector('.book-title')?.textContent.trim();
            if (title) {
                window.location.href = `${card.dataset.categoryId}.html?book=${encodeURIComponent(title)}`;
            }
        });
    });

    filterNewBooks();
    startNewBookRotation();
    window.addEventListener('hashchange', filterNewBooks);
});
