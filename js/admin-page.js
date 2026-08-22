const getMainPageUrl = () => new URL('../index.html', window.location.href).toString();

const STORAGE_KEY = 'syntropyBooksCatalog';
const DRAFT_STORAGE_KEY = 'syntropyDraftBooksCatalog';
const INVENTORY_KIND_TARGET = 35;
const INVENTORY_COPY_TARGET = 158;
const BARCODE_BOOK_LOOKUP = {
    '9788990000001': {
        title: '생명이란 무엇인가',
        author: '에르빈 슈뢰딩거',
        category: '생명과학',
        publisher: 'Syntropy Books 큐레이션',
        description: '물리학의 언어로 생명과 질서의 근원을 탐구하는 고전입니다.'
    },
    '9788990000002': {
        title: '생명의 그물',
        author: '프리초프 카프라',
        category: '시스템 사고',
        publisher: 'Syntropy Books 큐레이션',
        description: '생태계와 사회를 서로 연결된 네트워크로 읽어냅니다.'
    },
    '9788990000003': {
        title: '코스모스',
        author: '칼 세이건',
        category: '우주와 질서',
        publisher: '사이언스북스',
        description: '우주의 시간과 생명의 진화를 연결해 바라보는 과학 고전입니다.'
    },
    '9788990000004': {
        title: '장자',
        author: '장자',
        category: '철학',
        publisher: '을유문화사',
        description: '고정된 질서에서 벗어나 변화와 관계의 흐름을 바라보는 감각을 일깨웁니다.'
    }
};
const defaultBooks = [
    { title: '생명이란 무엇인가', author: '에르빈 슈뢰딩거', category: '생명과학', publisher: 'Syntropy Books 큐레이션', description: '물리학의 언어로 생명과 질서의 근원을 탐구하는 고전입니다.', stock: 12, status: 'published' },
    { title: '다윈의 위험한 생각', author: '대니얼 데닛', category: '생명과학', publisher: 'Syntropy Books 큐레이션', description: '진화라는 관점이 생명과 마음, 질서를 이해하는 방식을 어떻게 바꾸는지 살펴봅니다.', stock: 8, status: 'published' },
    { title: '생명의 그물', author: '프리초프 카프라', category: '시스템 사고', publisher: 'Syntropy Books 큐레이션', description: '생태계와 사회를 서로 연결된 네트워크로 읽어냅니다.', stock: 10, status: 'published' },
    { title: '시스템 사고', author: '피터 센게', category: '시스템 사고', publisher: 'Syntropy Books 큐레이션', description: '부분의 합을 넘어 조직과 사회 전체의 구조와 흐름을 바라보는 사고법을 소개합니다.', stock: 7, status: 'published' },
    { title: '카오스', author: '제임스 글릭', category: '복잡계', publisher: '승산', description: '작은 변화가 거대한 패턴을 만드는 과정을 따라가며 혼돈 속의 질서를 보여줍니다.', stock: 9, status: 'published' },
    { title: '복잡계 개론', author: '복잡계 큐레이션', category: '복잡계', publisher: 'Syntropy Books 큐레이션', description: '상호작용하는 요소들이 자기조직화를 통해 새로운 패턴을 만드는 원리를 살펴봅니다.', stock: 11, status: 'published' },
    { title: '코스모스', author: '칼 세이건', category: '우주와 질서', publisher: '사이언스북스', description: '우주의 시간과 생명의 진화를 연결해 바라보며 지식의 질서를 보여주는 책입니다.', stock: 13, status: 'published' },
    { title: '시간의 역사', author: '스티븐 호킹', category: '우주와 질서', publisher: 'Syntropy Books 큐레이션', description: '우주의 시작과 변화에 대한 질문을 통해 시간과 공간의 구조를 탐구합니다.', stock: 6, status: 'published' },
    { title: '이기적 유전자', author: '리처드 도킨스', category: '진화와 협력', publisher: '을유문화사', description: '생명체의 행동과 진화를 유전자 관점에서 살피며 생명 시스템의 유지를 질문합니다.', stock: 10, status: 'published' },
    { title: '협력의 진화', author: '로버트 액설로드', category: '진화와 협력', publisher: 'Syntropy Books 큐레이션', description: '경쟁하는 존재들 사이에서 협력이 어떻게 질서로 자리 잡는지 탐구합니다.', stock: 5, status: 'published' },
    { title: '엔트로피', author: '제러미 리프킨', category: '문명과 에너지', publisher: 'Syntropy Books 큐레이션', description: '에너지의 흐름과 문명의 방향을 돌아보며 지속 가능한 전환을 생각하게 합니다.', stock: 8, status: 'published' },
    { title: '에너지와 문명', author: '바츨라프 스밀', category: '문명과 에너지', publisher: 'Syntropy Books 큐레이션', description: '인류 문명의 변화가 에너지의 생산과 사용 방식과 어떻게 연결되는지 분석합니다.', stock: 7, status: 'published' },
    { title: '오래된 미래', author: '헬레나 노르베리 호지', category: '생태철학', publisher: '중앙북스', description: '지역 공동체의 삶을 통해 성장 중심 문명을 성찰하고 미래의 단서를 찾습니다.', stock: 9, status: 'published' },
    { title: '침묵의 봄', author: '레이첼 카슨', category: '생태철학', publisher: 'Syntropy Books 큐레이션', description: '자연의 연결망을 무너뜨리는 화학물질의 영향을 알리며 생태적 책임을 일깨웁니다.', stock: 12, status: 'published' },
    { title: '장자', author: '장자', category: '철학', publisher: '을유문화사', description: '고정된 질서에서 벗어나 변화와 관계의 흐름을 바라보는 감각을 일깨웁니다.', stock: 14, status: 'published' },
    { title: '스피노자 철학', author: '스피노자', category: '철학', publisher: 'Syntropy Books 큐레이션', description: '인간과 자연을 하나의 연결된 질서로 바라보며 함께 존재하는 방식을 생각합니다.', stock: 6, status: 'published' }
];

const incompleteDraftSeedBooks = [
    { title: '고요한 붉은 달', author: '서윤아', publisher: 'Syntropy Books 큐레이션', category: '생명과학', description: '', stock: 4, price: '', cover: '', translator: '', registeredAt: '' },
    { title: '결정의 형태', author: '최하린', publisher: '새벽서재', category: '', description: '사람의 선택이 어떻게 반복되는 구조를 만들고 있는지 따져봅니다.', stock: 3, price: 18000, cover: '', translator: '', registeredAt: '2026-08-01' },
    { title: '사라지는 경계', author: '나재호', publisher: 'Syntropy Books 큐레이션', category: '시스템 사고', description: '', stock: 4, price: '', cover: '', translator: '김지현', registeredAt: '2026-08-05' },
    { title: '무질서의 그림자', author: '이도엽', publisher: '지식의 바다', category: '복잡계', description: '혼란 속에서도 질서를 읽는 해석을 던집니다.', stock: 4, price: 22000, cover: '', translator: '', registeredAt: '' },
    { title: '빛의 장기', author: '박서린', publisher: 'Syntropy Books 큐레이션', category: '', description: '', stock: 2, price: 16000, cover: 'draft-cover-1.jpg', translator: '박현우', registeredAt: '2026-07-29' },
    { title: '달빛 아래의 네트워크', author: '정우진', publisher: '에코플러스', category: '시스템 사고', description: '관계가 만드는 서사와 자원 배분을 살펴봅니다.', stock: 3, price: '', cover: '', translator: '', registeredAt: '2026-08-10' },
    { title: '우주에서 읽는 인간', author: '강민서', publisher: 'Syntropy Books 큐레이션', category: '우주와 질서', description: '', stock: 3, price: 17500, cover: '', translator: '서은주', registeredAt: '' },
    { title: '시간의 나무', author: '유세은', publisher: '우주문학사', category: '', description: '기억과 예측이 서로 얽히는 방식의 철학을 제시합니다.', stock: 3, price: '', cover: '', translator: '', registeredAt: '2026-08-03' },
    { title: '진화의 가벼움', author: '빈예준', publisher: 'Syntropy Books 큐레이션', category: '진화와 협력', description: '', stock: 3, price: 19000, cover: '', translator: '', registeredAt: '2026-08-07' },
    { title: '공존의 패턴', author: '오태경', publisher: '기록의 숲', category: '진화와 협력', description: '협력이 도덕을 바꾸는 과정을 생각해봅니다.', stock: 2, price: '', cover: 'draft-cover-2.jpg', translator: '', registeredAt: '' },
    { title: '에너지의 일기', author: '홍지우', publisher: 'Syntropy Books 큐레이션', category: '문명과 에너지', description: '', stock: 5, price: '', cover: '', translator: '윤다혜', registeredAt: '2026-08-07' },
    { title: '도시에서 배우는 평온', author: '신유나', publisher: '네온서가', category: '', description: '도시의 소음 속에서 심리적 균형을 찾는 방법을 설명합니다.', stock: 2, price: 20500, cover: '', translator: '', registeredAt: '' },
    { title: '생태계의 낮은 목소리', author: '문지환', publisher: 'Syntropy Books 큐레이션', category: '생태철학', description: '', stock: 2, price: '', cover: 'draft-cover-3.jpg', translator: '', registeredAt: '2026-08-02' },
    { title: '막다른 길의 철학', author: '이한결', publisher: '휴머니티 북스', category: '철학', description: '모순과 멈춤이 만들어내는 생각의 지점을 살펴봅니다.', stock: 3, price: 23000, cover: '', translator: '', registeredAt: '' },
    { title: '새벽의 구조', author: '전예림', publisher: 'Syntropy Books 큐레이TION', category: '철학', description: '', stock: 2, price: '', cover: '', translator: '김보라', registeredAt: '2026-08-11' }
];

const buildInventoryBaseline = () => {
    const titles = [
        '생명이란 무엇인가', '다윈의 위험한 생각', '생명의 그물', '시스템 사고', '카오스', '복잡계 개론',
        '코스모스', '시간의 역사', '이기적 유전자', '협력의 진화', '엔트로피', '에너지와 문명',
        '오래된 미래', '침묵의 봄', '장자', '스피노자 철학', '고요한 붉은 달', '결정의 형태',
        '사라지는 경계', '무질서의 그림자', '빛의 장기', '달빛 아래의 네트워크', '우주에서 읽는 인간',
        '시간의 나무', '진화의 가벼움', '공존의 패턴', '에너지의 일기', '도시에서 배우는 평온',
        '생태계의 낮은 목소리', '막다른 길의 철학', '새벽의 구조', '태양의 반지', '도시와 평온',
        '첫 번째 질문', '자연과 자유'
    ];

    const stockValues = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 2];

    return titles.map((title, index) => ({
        id: `baseline-${index + 1}`,
        title,
        author: ['에르빈 슈뢰딩거', '대니얼 데닛', '프리초프 카프라', '피터 센게', '제임스 글릭', '복잡계 큐레이션', '칼 세이건', '스티븐 호킹', '리처드 도킨스', '로버트 액설로드', '제러미 리프킨', '바츨라프 스밀', '헬레나 노르베리 호지', '레이첼 카슨', '장자', '스피노자', '서윤아', '최하린', '나재호', '이도엽', '박서린', '정우진', '강민서', '유세은', '빈예준', '오태경', '홍지우', '신유나', '문지환', '이한결', '전예림', '김지혜', '신예린', '이성우', '철학 큐레이션'][index],
        category: ['생명과학', '생명과학', '시스템 사고', '시스템 사고', '복잡계', '복잡계', '우주와 질서', '우주와 질서', '진화와 협력', '진화와 협력', '문명과 에너지', '문명과 에너지', '생태철학', '생태철학', '철학', '철학', '생명과학', '철학', '시스템 사고', '복잡계', '미분류', '시스템 사고', '우주와 질서', '철학', '진화와 협력', '진화와 협력', '문명과 에너지', '문명과 에너지', '생태철학', '철학', '철학', '우주와 질서', '문명과 에너지', '생태철학', '철학'][index],
        publisher: 'Syntropy Books 큐레이션',
        description: '기본 비치 도서 기준 데이터입니다.',
        href: `book-detail.html?book=${encodeURIComponent(title)}`,
        cover: '',
        registeredAt: '2026-08-22',
        status: 'published',
        stock: Number(stockValues[index] || 4),
        price: 15000
    }));
};

const seedIncompleteDraftBooks = () => {
    const currentDrafts = getDraftBooksFromStorage();
    if (currentDrafts.length >= incompleteDraftSeedBooks.length) {
        return;
    }

    const existingTitleSet = new Set(currentDrafts.map((book) => String(book.title || '').trim().toLowerCase()));
    const missingDrafts = incompleteDraftSeedBooks.filter((book) => !existingTitleSet.has(String(book.title || '').trim().toLowerCase()));

    const draftBooks = [...currentDrafts, ...missingDrafts.map((book, index) => buildDraftBook({
        ...book,
        id: `draft-seed-${Date.now()}-${index + 1}`,
        status: 'draft',
        registeredAt: book.registeredAt || new Date().toISOString(),
        stock: Number(book.stock || 0),
        price: book.price === '' ? 0 : Number(book.price || 0),
        category: String(book.category || '').trim(),
        description: String(book.description || '').trim(),
        cover: String(book.cover || '').trim(),
        translator: String(book.translator || '').trim(),
        newUntil: ''
    }))];

    saveDraftBooksToStorage(draftBooks);
};

const ensureBaselineCatalogBooks = () => {
    try {
        const rawStored = localStorage.getItem(STORAGE_KEY);
        const stored = rawStored ? JSON.parse(rawStored) : null;
        const sampleTitles = new Set(['신규추가도서', '미분류 샘플 도서', '분류 보류 자료집', '카테고리 검토 노트']);
        const isSampleCatalog = Array.isArray(stored)
            ? stored.some((book) => sampleTitles.has(String(book.title || '').trim()))
            : false;
        const currentKindCount = Array.isArray(stored) ? stored.length : 0;
        const currentTotalCopies = Array.isArray(stored)
            ? stored.reduce((sum, book) => sum + Math.max(0, Number(book.stock || 0)), 0)
            : 0;

        const isCanonicalCatalog = Array.isArray(stored)
            && currentKindCount === INVENTORY_KIND_TARGET
            && currentTotalCopies === INVENTORY_COPY_TARGET
            && !isSampleCatalog;

        if (isCanonicalCatalog) {
            return;
        }

        const baselineCatalog = buildInventoryBaseline();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeBooks(baselineCatalog, 'published')));
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify([]));
    } catch (error) {
        console.warn('기본 도서 데이터 보강 중 오류가 발생했습니다.', error);
    }
};

const BOOK_FIELD_DEFINITIONS = Object.freeze([
    { key: 'id', label: 'ID', aliases: ['id', 'ID', '도서id', '도서 ID'] },
    { key: 'category', label: '카테고리', aliases: ['category', '카테고리'] },
    { key: 'title', label: '제목', aliases: ['title', '제목', 'booktitle'] },
    { key: 'author', label: '저자', aliases: ['author', '저자', 'writer'] },
    { key: 'translator', label: '옮긴이', aliases: ['translator', '옮긴이', '역자'] },
    { key: 'publisher', label: '출판사', aliases: ['publisher', '출판사'] },
    { key: 'cover', label: '표지', aliases: ['cover', '표지', '표지 이미지', 'coverimage'] },
    { key: 'price', label: '가격', aliases: ['price', '가격', '책값'] },
    { key: 'stock', label: '재고', aliases: ['stock', '재고', '수량'] },
    { key: 'description', label: '책소개', aliases: ['description', '책소개', '소개'] },
    { key: 'preview', label: '안내글', aliases: ['preview', '안내글', '미리보기', 'previewtext'] },
    { key: 'barcode', label: '바코드', aliases: ['barcode', 'barCode', 'BARcode', '바코드'] },
    { key: 'isbn', label: 'ISBN', aliases: ['isbn', 'ISBN', '국제표준도서번호'] },
    { key: 'qrcode', label: 'QR', aliases: ['qrcode', 'QRcode', 'QR', 'QR 코드', 'qr코드'] },
    { key: 'incomingDate', label: '입고일', aliases: ['incomingDate', 'incomingdate', '입고일', '입고 날짜'] },
    { key: 'registeredAt', label: '등록일', aliases: ['registeredAt', 'registeredat', '등록일', '등록 날짜'] },
    { key: 'newUntil', label: '만료일', aliases: ['newUntil', 'newuntil', '만료일', '신간 만료일', '신간 종료일'] },
    { key: 'status', label: '상태', aliases: ['status', '상태', 'bookstatus'] },
    { key: 'note', label: '비고', aliases: ['note', '노트', '비고', 'remark'] }
]);

const BOOK_FIELD_LABELS = Object.freeze(Object.fromEntries(BOOK_FIELD_DEFINITIONS.map((field) => [field.key, field.label])));

const normalizeBookFieldKey = (rawKey = '') => {
    const cleaned = String(rawKey || '').trim().toLowerCase();
    const match = BOOK_FIELD_DEFINITIONS.find((field) => field.aliases.some((alias) => String(alias).trim().toLowerCase() === cleaned));
    if (match) {
        return match.key;
    }

    const fallback = cleaned.replace(/[^a-z0-9]/g, '');
    return BOOK_FIELD_DEFINITIONS.find((field) => field.key.replace(/[^a-z0-9]/g, '') === fallback)?.key || rawKey;
};

const generateBookId = () => `book-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const normalizeCategoryList = (value) => {
    const rawValues = Array.isArray(value) ? value : String(value ?? '').split(/[\n,;]+/);
    const categories = rawValues
        .flatMap((item) => {
            if (Array.isArray(item)) {
                return normalizeCategoryList(item);
            }
            return String(item ?? '').split('/').map((part) => part.trim());
        })
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .filter((category, index, list) => list.indexOf(category) === index);

    return categories.map((category) => category.replace(/\s+/g, ' '));
};

const getBookCategories = (book = {}) => {
    const rawCategories = Array.isArray(book?.categories)
        ? book.categories
        : (Array.isArray(book?.categoryList)
            ? book.categoryList
            : book?.category ?? book?.categories ?? '');
    const categories = normalizeCategoryList(rawCategories);
    if (categories.length) {
        return categories;
    }

    const fallbackCategory = String(book?.category || '').trim();
    return fallbackCategory ? [fallbackCategory] : [];
};

const getPrimaryCategory = (book = {}) => getBookCategories(book)[0] || String(book?.category || '').trim() || '미분류';

const normalizeBooks = (books, fallbackStatus = 'published') => books.map((book, index) => {
    const categories = getBookCategories(book);
    const primaryCategory = getPrimaryCategory(book);

    return {
        ...book,
        id: book.id || `book-${Date.now()}-${index}-${Math.random().toString(16).slice(2, 8)}`,
        title: String(book.title || '').trim(),
        author: String(book.author || '').trim(),
        category: primaryCategory,
        categories,
        publisher: String(book.publisher || '').trim(),
        description: String(book.description || '').trim(),
        barcode: String(book.barcode || '').trim(),
        isbn: String(book.isbn || '').trim(),
        translator: String(book.translator || '').trim(),
        cover: String(book.cover || '').trim(),
        status: book.status === 'draft' ? 'draft' : fallbackStatus,
        price: Number(book.price || 0),
        stock: Number(book.stock || 0),
        incomingDate: String(book.incomingDate || book.arrivalDate || '').trim(),
        registeredAt: String(book.registeredAt || new Date().toISOString()).trim(),
        newUntil: String(book.newUntil || '').trim(),
        classification: String(book.classification || (Number(book.stock || 0) === 0 ? BOOK_STATUS.SOLD_OUT : BOOK_STATUS.COMPLETE)).trim(),
        preview: String(book.preview || '').trim()
    };
});

const getBooksFromStorage = () => {
    ensureBaselineCatalogBooks();
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        if (Array.isArray(stored) && stored.length > 0) {
            const normalized = normalizeBooks(stored, 'published');
            if (JSON.stringify(normalized) !== JSON.stringify(stored)) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
            }
            return normalized;
        }
    } catch (error) {
        console.warn('도서 저장소를 불러오지 못했습니다.', error);
    }

    const initialBooks = normalizeBooks(defaultBooks, 'published');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
    return initialBooks;
};

const getDraftBooksFromStorage = () => {
    ensureBaselineCatalogBooks();
    try {
        const stored = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || 'null');
        if (Array.isArray(stored)) {
            const normalized = normalizeBooks(stored, 'draft');
            if (JSON.stringify(normalized) !== JSON.stringify(stored)) {
                localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(normalized));
            }
            return normalized.filter((book) => book.status === 'draft');
        }
    } catch (error) {
        console.warn('임시 도서 저장소를 불러오지 못했습니다.', error);
    }

    return [];
};

const saveBooksToStorage = (books) => {
    const normalized = normalizeBooks(books, 'published');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
};

const saveDraftBooksToStorage = (books) => {
    const normalized = normalizeBooks(books, 'draft').filter((book) => book.status === 'draft');
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
};

const buildDraftBook = (book = {}) => {
    const categories = getBookCategories(book);
    const primaryCategory = getPrimaryCategory(book);

    return {
        ...book,
        id: book.id || generateBookId(),
        status: 'draft',
        title: String(book.title || '').trim(),
        author: String(book.author || '').trim(),
        category: primaryCategory,
        categories,
        publisher: String(book.publisher || '').trim(),
        description: String(book.description || '').trim(),
        barcode: String(book.barcode || '').trim(),
        isbn: String(book.isbn || '').trim(),
        translator: String(book.translator || '').trim(),
        cover: String(book.cover || '').trim(),
        price: Number(book.price || 0),
        stock: Number(book.stock || 0),
        incomingDate: String(book.incomingDate || book.arrivalDate || '').trim(),
        registeredAt: String(book.registeredAt || new Date().toISOString()).trim(),
        newUntil: String(book.newUntil || '').trim(),
        classification: String(book.classification || (Number(book.stock || 0) === 0 ? BOOK_STATUS.SOLD_OUT : BOOK_STATUS.COMPLETE)).trim(),
        preview: String(book.preview || '').trim()
    };
};

const parseBarcodeIntoBook = (value) => {
    const cleaned = String(value || '').replace(/\D/g, '');
    if (!cleaned) {
        return null;
    }

    const matched = BARCODE_BOOK_LOOKUP[cleaned];
    if (!matched) {
        return null;
    }

    return {
        ...matched,
        barcode: cleaned,
        isbn: cleaned,
        status: 'draft'
    };
};

const parseCsvRows = (text) => {
    const lines = text.split(/\r?\n/).filter((line) => line.trim());
    if (!lines.length) {
        return [];
    }

    const parseLine = (line) => {
        const values = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i += 1) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i += 1;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        values.push(current.trim());
        return values;
    };

    const header = parseLine(lines[0]).map((value) => normalizeBookFieldKey(value));
    return lines.slice(1).map((line) => {
        const row = parseLine(line);
        const object = {};
        header.forEach((key, index) => {
            object[key] = row[index] || '';
        });
        return object;
    }).filter((row) => row.title || row.author || row.category || row.publisher || row.description);
};

const parseUploadedExcelRows = async (file) => {
    if (!file) {
        return [];
    }

    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.csv')) {
        const text = await file.text();
        return parseCsvRows(text);
    }

    if (typeof window !== 'undefined' && window.XLSX && (fileName.endsWith('.xlsx') || fileName.endsWith('.xls'))) {
        const workbook = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = new Uint8Array(event.target.result);
                    resolve(window.XLSX.read(data, { type: 'array' }));
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('엑셀 파일을 읽을 수 없습니다.'));
            reader.readAsArrayBuffer(file);
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = window.XLSX.utils.sheet_to_json(sheet, { defval: '' });
        return rows.map((row) => {
            const normalized = {};
            Object.entries(row).forEach(([key, value]) => {
                const mappedKey = normalizeBookFieldKey(key);
                normalized[mappedKey] = value;
            });

            return {
                title: normalized.title || normalized.제목 || '',
                author: normalized.author || normalized.저자 || '',
                category: normalized.category || normalized.카테고리 || '',
                publisher: normalized.publisher || normalized.출판사 || '',
                description: normalized.description || normalized.설명 || '',
                stock: Number(normalized.stock || normalized.재고 || 0),
                price: Number(normalized.price || normalized.가격 || 0),
                translator: normalized.translator || normalized.옮긴이 || '',
                barcode: normalized.barcode || normalized.바코드 || '',
                isbn: normalized.isbn || normalized.ISBN || '',
                qrcode: normalized.qrcode || normalized['QR 코드'] || normalized['QRcode'] || '',
                incomingDate: normalized.incomingDate || normalized.입고일 || '',
                registeredAt: normalized.registeredAt || normalized.등록일 || '',
                newUntil: normalized.newUntil || normalized['신간 만료일'] || '',
                classification: normalized.classification || normalized.분류 || '',
                preview: normalized.preview || normalized.미리보기 || '',
                cover: normalized.cover || normalized.표지 || '',
                note: normalized.note || normalized.비고 || ''
            };
        });
    }

    return [];
};

const getBookById = (books, bookId) => books.find((book) => book.id === bookId);

const updateDraftBookStock = (bookId, nextValue) => {
    const books = getDraftBooksFromStorage();
    const targetBook = getBookById(books, bookId);
    if (!targetBook) {
        return;
    }

    const updatedBooks = books.map((book) => {
        if (book.id !== bookId) {
            return book;
        }

        return {
            ...book,
            stock: Math.max(0, Number(nextValue) || 0)
        };
    });

    saveDraftBooksToStorage(updatedBooks);
    renderAdminBooks();
    window.dispatchEvent(new CustomEvent('syntropyCatalogUpdated'));
};

const CATEGORY_ORDER = [
    '생명과학',
    '시스템 사고',
    '복잡계',
    '우주와 질서',
    '진화와 협력',
    '문명과 에너지',
    '생태철학',
    '철학'
];
const UNCATEGORIZED_CATEGORY = '미분류';
const CATEGORY_COLOR_MAP = Object.freeze({
    '생명과학': { background: '#f4c7c3', border: '#d9827a', text: '#7b302b' },
    '시스템 사고': { background: '#f6d5b3', border: '#d99a61', text: '#75451f' },
    '복잡계': { background: '#f4e6a9', border: '#c7aa3a', text: '#665510' },
    '우주와 질서': { background: '#c7e3c0', border: '#75a96d', text: '#2e6130' },
    '진화와 협력': { background: '#c3e1e8', border: '#6fa9b8', text: '#245c6a' },
    '문명과 에너지': { background: '#cbd3ed', border: '#7d8ec5', text: '#344576' },
    '생태철학': { background: '#dccbea', border: '#a587bd', text: '#5b3d70' },
    '철학': { background: '#ffffff', border: '#b8c5b8', text: '#25483b' },
    '미분류': { background: '#e9ece9', border: '#b8c5b8', text: '#4a5852' }
});

const BOOK_STATUS = Object.freeze({
    PURCHASE: '구매중',
    WAITING: '등록대기',
    NEW: '신간',
    COMPLETE: '등록도서',
    SHIPPING: '발송중',
    RETURNED: '반품중',
    SOLD_OUT: '품절'
});

const BOOK_STATUS_KEYS = Object.freeze({
    preorder: BOOK_STATUS.PURCHASE,
    draft: BOOK_STATUS.WAITING,
    new: BOOK_STATUS.NEW,
    registered: BOOK_STATUS.COMPLETE,
    shipping: BOOK_STATUS.SHIPPING,
    returned: BOOK_STATUS.RETURNED,
    soldout: BOOK_STATUS.SOLD_OUT
});

const getSummaryCategoryKey = (bookCategory) => {
    const normalized = String(bookCategory || '').trim();
    return CATEGORY_ORDER.includes(normalized) ? normalized : UNCATEGORIZED_CATEGORY;
};

const getCategoryCountBuckets = (book) => {
    const categories = getBookCategories(book);
    return categories.length ? categories : [UNCATEGORIZED_CATEGORY];
};

const ADMIN_STATUS_LABELS = Object.freeze({
    preorder: BOOK_STATUS.PURCHASE,
    draft: BOOK_STATUS.WAITING,
    new: BOOK_STATUS.NEW,
    registered: BOOK_STATUS.COMPLETE,
    shipping: BOOK_STATUS.SHIPPING,
    returned: BOOK_STATUS.RETURNED,
    soldout: BOOK_STATUS.SOLD_OUT
});

const normalizeAdminBookStatus = (book) => {
    const rawStatus = String(book?.status || '').trim();
    if (Object.prototype.hasOwnProperty.call(BOOK_STATUS_KEYS, rawStatus)) {
        return rawStatus;
    }

    if (book?.status === 'published') {
        return Number(book.stock || 0) === 0 ? 'soldout' : (isNewBook(book) ? 'new' : 'registered');
    }

    if (book?.status === 'draft') {
        return 'draft';
    }

    if (book?.classification) {
        const mapping = {
            [BOOK_STATUS.PURCHASE]: 'preorder',
            [BOOK_STATUS.WAITING]: 'draft',
            [BOOK_STATUS.NEW]: 'new',
            [BOOK_STATUS.COMPLETE]: 'registered',
            [BOOK_STATUS.SHIPPING]: 'shipping',
            [BOOK_STATUS.RETURNED]: 'returned',
            [BOOK_STATUS.SOLD_OUT]: 'soldout',
            '대기중': 'draft',
            '신규책': 'new',
            '등록완료': 'registered',
            '발송예정': 'shipping',
            '반품처리': 'returned',
            '등록도서': 'registered',
            '신간': 'new',
            '발송중': 'shipping',
            '반품중': 'returned'
        };
        return mapping[String(book.classification).trim()] || 'registered';
    }

    if (book?.newUntil) {
        return new Date(book.newUntil) > new Date() ? 'new' : (Number(book.stock || 0) === 0 ? 'soldout' : 'registered');
    }

    return Number(book.stock || 0) === 0 ? 'soldout' : 'registered';
};

const getAdminStatusLabel = (book) => {
    const statusKey = normalizeAdminBookStatus(book);
    const mappedLabel = ADMIN_STATUS_LABELS[statusKey] || BOOK_STATUS.COMPLETE;
    if (statusKey === 'draft') {
        return BOOK_STATUS.WAITING;
    }
    if (statusKey === 'new') {
        return BOOK_STATUS.NEW;
    }
    if (statusKey === 'registered') {
        return BOOK_STATUS.COMPLETE;
    }
    return mappedLabel;
};

const isNewBook = (book) => {
    if (book.newUntil) {
        return new Date(book.newUntil) > new Date();
    }
    return ['생명이란 무엇인가', '생명의 그물', '카오스', '코스모스', '이기적 유전자', '엔트로피', '오래된 미래', '장자'].includes(book.title);
};

const getCategorySummary = (publishedBooks, draftBooks) => {
    const summary = Object.fromEntries([...CATEGORY_ORDER, UNCATEGORIZED_CATEGORY].map((category) => [category, {
        published: 0,
        publishedStock: 0,
        draft: 0,
        draftStock: 0,
        new: 0,
        newStock: 0
    }]));

    publishedBooks.forEach((book) => {
        const categories = getCategoryCountBuckets(book);
        categories.forEach((categoryName) => {
            const category = getSummaryCategoryKey(categoryName);
            if (!summary[category]) {
                summary[category] = {
                    published: 0,
                    publishedStock: 0,
                    draft: 0,
                    draftStock: 0,
                    new: 0,
                    newStock: 0
                };
            }
            const stock = Math.max(0, Number(book.stock || 0));
            summary[category].published += 1;
            summary[category].publishedStock += stock;
            if (isNewBook(book)) {
                summary[category].new += 1;
                summary[category].newStock += stock;
            }
        });
    });

    draftBooks.forEach((book) => {
        const categories = getCategoryCountBuckets(book);
        categories.forEach((categoryName) => {
            const category = getSummaryCategoryKey(categoryName);
            if (!summary[category]) {
                summary[category] = {
                    published: 0,
                    publishedStock: 0,
                    draft: 0,
                    draftStock: 0,
                    new: 0,
                    newStock: 0
                };
            }
            const stock = Math.max(0, Number(book.stock || 0));
            summary[category].draft += 1;
            summary[category].draftStock += stock;
        });
    });

    return summary;
};

const renderCategorySummary = (publishedBooks, draftBooks) => {
    const container = document.querySelector('#admin-category-summary');
    if (!container) {
        return;
    }

    const summary = getCategorySummary(publishedBooks, draftBooks);
    const categoryRows = [...CATEGORY_ORDER, UNCATEGORIZED_CATEGORY].map((category) => {
        const item = summary[category] || {
            published: 0,
            publishedStock: 0,
            draft: 0,
            draftStock: 0,
            new: 0,
            newStock: 0
        };
        const hasAnyCount = item.published || item.draft || item.new;
        if (category === UNCATEGORIZED_CATEGORY && !hasAnyCount) {
            return '';
        }
        const publishedLabel = `${item.published}종 ${item.publishedStock}권`;
        const newLabel = `${item.new}종 ${item.newStock}권`;
        const draftLabel = `${item.draft}종 ${item.draftStock}권`;
        return `
            <div class="admin-category-row" data-category="${category}">
                <span class="admin-category-cell admin-category-name">${category}</span>
                <span class="admin-category-cell">${publishedLabel}</span>
                <span class="admin-category-cell">${newLabel}</span>
                <span class="admin-category-cell">${draftLabel}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="admin-category-summary-header">카테고리별 등록, 임시등록 및 신간도서 수 현황</div>
        <div class="admin-category-table">
            <div class="admin-category-row admin-category-row--header">
                <span class="admin-category-cell admin-category-name">카테고리</span>
                <span class="admin-category-cell">등록 도서</span>
                <span class="admin-category-cell">신간도서</span>
                <span class="admin-category-cell">임시 등록 도서</span>
            </div>
            ${categoryRows}
        </div>
    `;
};

const getCategoryMetricSummary = (categoryName, publishedBooks, draftBooks) => {
    const summary = getCategorySummary(publishedBooks, draftBooks);
    const item = summary[categoryName] || {
        published: 0,
        publishedStock: 0,
        draft: 0,
        draftStock: 0,
        new: 0,
        newStock: 0
    };

    return {
        category: categoryName,
        total: {
            kind: item.published + item.draft,
            stock: item.publishedStock + item.draftStock
        },
        registered: {
            kind: item.published,
            stock: item.publishedStock
        },
        new: {
            kind: item.new,
            stock: item.newStock
        },
        draft: {
            kind: item.draft,
            stock: item.draftStock
        }
    };
};

const renderSelectedCategorySummary = (categoryName, publishedBooks, draftBooks) => {
    const categoriesElement = document.querySelector('[data-stat="categories"]');
    if (!categoriesElement) {
        return;
    }

    const existingPanel = categoriesElement.querySelector('.category-detail-panel');
    if (existingPanel) {
        existingPanel.remove();
    }

    const summary = getCategoryMetricSummary(categoryName, publishedBooks, draftBooks);

    const statDetails = [
        { selector: '[data-stat="total-books"]', value: `${summary.category} | ${summary.total.kind}종 ${summary.total.stock}권` },
        { selector: '[data-stat="registered-books"]', value: `${summary.category} | ${summary.registered.kind}종 ${summary.registered.stock}권` },
        { selector: '[data-stat="new-books"]', value: `${summary.category} | ${summary.new.kind}종 ${summary.new.stock}권` },
        { selector: '[data-stat="draft-books"]', value: `${summary.category} | ${summary.draft.kind}종 ${summary.draft.stock}권` }
    ];

    statDetails.forEach(({ selector, value }) => {
        const statNode = document.querySelector(selector);
        const card = statNode?.closest('.admin-card') || statNode?.parentElement?.closest('.admin-card');
        if (!card) {
            return;
        }

        let detail = card.querySelector('.stat-detail');
        if (!detail) {
            detail = document.createElement('div');
            detail.className = 'stat-detail';
            card.appendChild(detail);
        }

        const palette = CATEGORY_COLOR_MAP[categoryName] || CATEGORY_COLOR_MAP[UNCATEGORIZED_CATEGORY];
        const [categoryLabel, countLabel = ''] = value.split('|');
        detail.innerHTML = `
            <span class="stat-detail-category">${categoryLabel.trim()}</span>
            <span class="stat-detail-count">| ${countLabel.trim()}</span>
        `;
        detail.style.background = palette.background;
        detail.style.border = `1px solid ${palette.border}`;
        detail.style.color = palette.text;
        detail.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.35)';
    });

    categoriesElement.querySelectorAll('.category-mini-button').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.category === categoryName);
    });
};

const renderCategoryMiniButtons = (publishedBooks, draftBooks) => {
    const categoriesElement = document.querySelector('[data-stat="categories"]');
    if (!categoriesElement) {
        return;
    }

    const categoryNames = [...CATEGORY_ORDER, UNCATEGORIZED_CATEGORY];
    const categoryButtons = categoryNames.map((category) => `
        <button type="button" class="category-mini-button" data-category="${category}" aria-label="${category} 카테고리">
            <span class="category-mini-button-name">${category}</span>
        </button>
    `).join('');

    categoriesElement.innerHTML = categoryButtons;
    categoriesElement.querySelectorAll('.category-mini-button').forEach((button) => {
        button.addEventListener('click', () => {
            renderSelectedCategorySummary(button.dataset.category, publishedBooks, draftBooks);
        });
    });

    const initialCategory = categoryNames[0];
    renderSelectedCategorySummary(initialCategory, publishedBooks, draftBooks);
};

const updateAdminStats = (books) => {
    const publishedBooks = Array.isArray(books) ? books.filter((book) => book.status !== 'draft') : [];
    const draftBooks = getDraftBooksFromStorage();
    const publishedBooksCount = publishedBooks.length;
    const draftBooksCount = draftBooks.length;
    const totalBooksCount = publishedBooksCount + draftBooksCount;
    const draftStockCount = draftBooks.reduce((sum, book) => sum + Math.max(0, Number(book.stock || 0)), 0);
    const totalStockCount = [...publishedBooks, ...draftBooks].reduce((sum, book) => sum + Math.max(0, Number(book.stock || 0)), 0);
    const categories = new Set(publishedBooks.flatMap((book) => getBookCategories(book)).filter(Boolean));
    const newBooks = publishedBooks.filter((book) => {
        if (book.newUntil) {
            return new Date(book.newUntil) > new Date();
        }
        return ['생명이란 무엇인가', '생명의 그물', '카오스', '코스모스', '이기적 유전자', '엔트로피', '오래된 미래', '장자'].includes(book.title);
    });
    const newBooksCount = newBooks.length;
    const newStockCount = newBooks.reduce((sum, book) => sum + Math.max(0, Number(book.stock || 0)), 0);

    const totalBooksElement = document.querySelector('[data-stat="total-books"]');
    const registeredBooksElement = document.querySelector('[data-stat="registered-books"]');
    const newBooksElement = document.querySelector('[data-stat="new-books"]');
    const draftBooksElement = document.querySelector('[data-stat="draft-books"]');
    const registeredBooksCount = publishedBooksCount;
    const registeredStockCount = publishedBooks.reduce((sum, book) => sum + Math.max(0, Number(book.stock || 0)), 0);

    if (totalBooksElement) {
        const totalLines = totalBooksElement.querySelectorAll('.stat-value-line');
        if (totalLines.length >= 2) {
            totalLines[0].textContent = `${totalBooksCount}종`;
            totalLines[1].textContent = `${totalStockCount}권`;
        } else {
            totalBooksElement.innerHTML = `<span class="stat-value-line">${totalBooksCount}종</span><span class="stat-value-line">${totalStockCount}권</span>`;
        }
    }
    if (registeredBooksElement) {
        const registeredLines = registeredBooksElement.querySelectorAll('.stat-value-line');
        if (registeredLines.length >= 2) {
            registeredLines[0].textContent = `${registeredBooksCount}종`;
            registeredLines[1].textContent = `${registeredStockCount}권`;
        } else {
            registeredBooksElement.innerHTML = `<span class="stat-value-line">${registeredBooksCount}종</span><span class="stat-value-line">${registeredStockCount}권</span>`;
        }
    }
    if (newBooksElement) {
        const newLines = newBooksElement.querySelectorAll('.stat-value-line');
        if (newLines.length >= 2) {
            newLines[0].textContent = `${newBooksCount}종`;
            newLines[1].textContent = `${newStockCount}권`;
        } else {
            newBooksElement.innerHTML = `<span class="stat-value-line">${newBooksCount}종</span><span class="stat-value-line">${newStockCount}권</span>`;
        }
    }
    if (draftBooksElement) {
        const draftLines = draftBooksElement.querySelectorAll('.stat-value-line');
        if (draftLines.length >= 2) {
            draftLines[0].textContent = `${draftBooksCount}종`;
            draftLines[1].textContent = `${draftStockCount}권`;
        } else {
            draftBooksElement.innerHTML = `<span class="stat-value-line">${draftBooksCount}종</span><span class="stat-value-line">${draftStockCount}권</span>`;
        }
    }

    renderCategoryMiniButtons(publishedBooks, draftBooks);
    renderCategorySummary(publishedBooks, draftBooks);
};

const attachAdminBookActions = (list) => {
    list.querySelectorAll('[data-role="edit"]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const books = getDraftBooksFromStorage();
            const targetBook = getBookById(books, button.dataset.bookId);
            if (!targetBook) {
                return;
            }

            window.location.href = `../books/book-detail.html?book=${encodeURIComponent(targetBook.title)}&draft=true`;
        });
    });

    list.querySelectorAll('[data-role="status"]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const books = getDraftBooksFromStorage();
            const targetBook = getBookById(books, button.dataset.bookId);
            if (!targetBook) {
                return;
            }

            window.location.href = `../books/book-detail.html?book=${encodeURIComponent(targetBook.title)}&draft=true`;
        });
    });

    list.querySelectorAll('[data-role="delete"]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const books = getDraftBooksFromStorage();
            const targetBook = getBookById(books, button.dataset.bookId);
            if (!targetBook) {
                return;
            }

            const confirmed = window.confirm(`"${targetBook.title}" 도서를 정말 삭제하시겠습니까?\n삭제된 도서는 복구할 수 없습니다.`);
            if (!confirmed) {
                return;
            }

            const nextBooks = books.filter((book) => book.id !== targetBook.id);
            saveDraftBooksToStorage(nextBooks);
            renderAdminBooks();
        });
    });

    list.querySelectorAll('[data-role="stock-down"]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const target = button.closest('[data-book-id]');
            const bookId = target?.dataset.bookId;
            const currentInput = list.querySelector(`[data-role="stock-input"][data-book-id="${bookId}"]`);
            const currentValue = Number(currentInput?.value || 0);
            updateDraftBookStock(bookId, currentValue - 1);
        });
    });

    list.querySelectorAll('[data-role="stock-up"]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const target = button.closest('[data-book-id]');
            const bookId = target?.dataset.bookId;
            const currentInput = list.querySelector(`[data-role="stock-input"][data-book-id="${bookId}"]`);
            const currentValue = Number(currentInput?.value || 0);
            updateDraftBookStock(bookId, currentValue + 1);
        });
    });

    list.querySelectorAll('[data-role="stock-input"]').forEach((input) => {
        input.addEventListener('click', (event) => event.stopPropagation());
        input.addEventListener('change', (event) => {
            event.stopPropagation();
            const bookId = input.dataset.bookId;
            updateDraftBookStock(bookId, input.value);
        });
    });
};

const getAdminVisibleBooks = () => {
    const publishedBooks = getBooksFromStorage().map((book) => ({
        ...book,
        status: normalizeAdminBookStatus(book)
    }));
    const draftBooks = getDraftBooksFromStorage().map((book) => ({
        ...book,
        status: 'draft'
    }));

    return [...publishedBooks, ...draftBooks]
        .filter((book) => book && book.title)
        .sort((a, b) => {
            const order = { preorder: 0, draft: 1, new: 2, registered: 3, shipping: 4, returned: 5 };
            return (order[normalizeAdminBookStatus(a)] ?? 99) - (order[normalizeAdminBookStatus(b)] ?? 99);
        });
};

const renderAdminBooks = () => {
    const books = getAdminVisibleBooks();
    const list = document.querySelector('#admin-book-list');
    if (!list) {
        return;
    }

    const renderFieldValue = (value, fallbackText = '미등록') => {
        const normalized = typeof value === 'string' ? value.trim() : value;
        const hasValue = normalized !== '' && normalized !== null && normalized !== undefined && !(Array.isArray(normalized) && normalized.length === 0);
        const text = hasValue ? String(value).trim() : fallbackText;
        return {
            text,
            missing: !hasValue
        };
    };

    if (!books.length) {
        list.innerHTML = `
            <div class="admin-book-card empty-state">
                <h4>임시 등록된 도서가 없습니다.</h4>
                <p>수기, 바코드, 엑셀 방식으로 등록할 수 있습니다.</p>
                <p>정식 등록 전에는 홈페이지에 노출되지 않습니다.</p>
            </div>
        `;
        updateAdminStats(getBooksFromStorage());
        return;
    }

    const buildAdminBookCardMarkup = (book) => {
        const fields = [
            { label: '카테고리', value: getBookCategories(book).join(', ') || '미등록' },
            { label: '저자', value: book.author || '미등록' },
            { label: '옮긴이', value: book.translator || '미등록' },
            { label: '출판사', value: book.publisher || '미등록' },
            { label: '가격', value: book.price ? `${Number(book.price).toLocaleString()}원` : '미등록' },
            { label: '재고', value: Number(book.stock || 0) > 0 ? `${Number(book.stock || 0)}권` : '미등록' },
            { label: '바코드', value: book.barcode || '미등록' },
            { label: 'ISBN', value: book.isbn || '미등록' },
            { label: 'QR', value: book.qrcode || '미등록' },
            { label: '입고일', value: book.incomingDate || book.arrivalDate || '미등록' },
            { label: '등록일', value: book.registeredAt || '미등록' },
            { label: '만료일', value: book.newUntil || '미등록' },
            { label: '비고', value: book.note || '미등록' },
            { label: '상태', value: getAdminStatusLabel(book) || '미등록' },
            { label: '안내글', value: book.preview || '미등록' },
            { label: '책소개', value: book.description || '미등록' }
        ].map((item) => {
            const field = renderFieldValue(item.value, '미등록');
            const isWideDescription = item.label === '책소개';
            return `
                <div class="admin-book-detail-row ${isWideDescription ? 'admin-book-detail-row--wide' : ''}">
                    <span class="admin-book-detail-label">${item.label}</span>
                    <span class="admin-book-detail-value ${field.missing ? 'is-missing' : ''}">${field.text}</span>
                </div>
            `;
        }).join('');

        const coverSrc = book.cover
            ? (book.cover.startsWith('data:') ? book.cover : `../images/book-covers/${book.cover}`)
            : '../images/SyntropyBooks_logo.png';

        return `
            <article class="admin-book-card admin-draft-row" data-role="open-draft" data-book-id="${book.id}" tabindex="0">
                <div class="admin-book-card-top-row">
                    <div class="admin-book-card-title">${book.title || '미등록'}</div>
                    <img class="admin-book-card-cover" src="${coverSrc}" alt="${String(book.title || '도서').replace(/"/g, '&quot;')} 표지" loading="lazy">
                </div>

                <div class="admin-book-card-meta">
                    ${fields}
                </div>
            </article>
        `;
    };

    const allCategoryNames = Array.from(new Set([
        ...CATEGORY_ORDER,
        ...books.flatMap((book) => getBookCategories(book).filter((category) => !CATEGORY_ORDER.includes(category) && category !== UNCATEGORIZED_CATEGORY)),
        ...books.flatMap((book) => {
            const categories = getBookCategories(book);
            return categories.length ? categories : [UNCATEGORIZED_CATEGORY];
        }).filter((category) => category === UNCATEGORIZED_CATEGORY || CATEGORY_ORDER.includes(category))
    ]));

    const orderedCategoryNames = allCategoryNames.filter((category) => CATEGORY_ORDER.includes(category) || category === UNCATEGORIZED_CATEGORY || !CATEGORY_ORDER.includes(category) && ![UNCATEGORIZED_CATEGORY].includes(category));
    const typedGroups = [...CATEGORY_ORDER, ...Array.from(new Set(
        books.flatMap((book) => getBookCategories(book))
            .filter((category) => !CATEGORY_ORDER.includes(category) && category !== UNCATEGORIZED_CATEGORY)
    )), UNCATEGORIZED_CATEGORY];
    const groupedOrder = Array.from(new Set(typedGroups.filter(Boolean)));
    const groupedBooks = Object.fromEntries(groupedOrder.map((category) => [category, []]));

    books.forEach((book) => {
        const categories = getBookCategories(book);
        const targetCategories = categories.length ? categories : [UNCATEGORIZED_CATEGORY];
        targetCategories.forEach((category) => {
            const normalizedCategory = CATEGORY_ORDER.includes(category) ? category : (!category || category === '미분류' ? UNCATEGORIZED_CATEGORY : category);
            if (!groupedBooks[normalizedCategory]) {
                groupedBooks[normalizedCategory] = [];
            }
            groupedBooks[normalizedCategory].push(book);
        });
    });

    list.innerHTML = groupedOrder
        .map((category) => {
            const categoryBooks = [...(groupedBooks[category] || [])].slice().reverse();
            const palette = CATEGORY_COLOR_MAP[category] || { background: '#e9ece9', border: '#b8c5b8', text: '#4a5852' };
            const cardMarkup = categoryBooks.length
                ? categoryBooks.map((book) => buildAdminBookCardMarkup(book)).join('')
                : '';

            return `
                <section class="admin-category-section">
                    <div class="admin-category-header" style="--category-bg:${palette.background}; --category-border:${palette.border}; --category-text:${palette.text};">${category}</div>
                    ${cardMarkup ? `<div class="admin-category-cards">${cardMarkup}</div>` : ''}
                </section>
            `;
        })
        .join('');

    attachAdminBookActions(list);
    list.querySelectorAll('[data-role="open-draft"]').forEach((element) => {
        element.addEventListener('click', () => {
            const targetBook = books.find((book) => book.id === element.dataset.bookId);
            if (!targetBook) {
                return;
            }
            window.location.href = `../books/book-detail.html?book=${encodeURIComponent(targetBook.title)}&draft=true`;
        });
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                element.click();
            }
        });
    });
    updateAdminStats(getBooksFromStorage());
};

const getExportableBooks = () => {
    const publishedBooks = getBooksFromStorage().map((book) => ({
        ...book,
        status: book.status === 'draft' ? 'draft' : 'published'
    }));
    const draftBooks = getDraftBooksFromStorage().map((book) => ({
        ...book,
        status: 'draft'
    }));

    return [...publishedBooks, ...draftBooks].map((book) => ({
        id: book.id || '',
        category: getBookCategories(book).join(', ') || '',
        title: book.title || '',
        author: book.author || '',
        translator: book.translator || '',
        publisher: book.publisher || '',
        cover: book.cover || '',
        price: Number(book.price || 0),
        stock: Number(book.stock || 0),
        description: book.description || '',
        preview: book.preview || '',
        barcode: book.barcode || '',
        isbn: book.isbn || '',
        qrcode: book.qrcode || '',
        incomingDate: book.incomingDate || book.arrivalDate || '',
        registeredAt: book.registeredAt || '',
        newUntil: book.newUntil || '',
        status: book.status || 'published',
        note: book.note || ''
    }));
};

const escapeCsvValue = (value) => {
    const text = String(value ?? '');
    if (/[",\n\r]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
};

const exportAllBooksToExcel = () => {
    const books = getExportableBooks();
    if (!books.length) {
        window.alert('내보낼 도서 정보가 없습니다.');
        return;
    }

    const totalKinds = books.length;
    const totalCopies = books.reduce((sum, book) => sum + Math.max(0, Number(book.stock || 0)), 0);

    const headers = [
        'id',
        'category',
        'title',
        'author',
        'translator',
        'publisher',
        'cover',
        'price',
        'stock',
        'description',
        'preview',
        'barcode',
        'isbn',
        'qrcode',
        'incomingDate',
        'registeredAt',
        'newUntil',
        'status',
        'note'
    ];

    const koreanHeaders = headers.map((key) => BOOK_FIELD_LABELS[key] || key);
    const csvRows = [
        koreanHeaders.join(','),
        ...books.map((book) => headers.map((header) => escapeCsvValue(book[header])).join(','))
    ];
    const csvContent = `\uFEFF${csvRows.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `syntropy-books-export-${totalKinds}종-${totalCopies}권.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    window.alert(`${totalKinds}종 ${totalCopies}권의 도서 목록이 한국어 헤더 기준의 CSV 파일로 다운로드되었습니다.`);
};

const setEntryMode = (mode = 'manual') => {
    const form = document.querySelector('#book-form');
    if (!form) {
        return;
    }

    const nextMode = ['manual', 'barcode', 'excel'].includes(mode) ? mode : 'manual';
    form.dataset.entryMode = nextMode;

    document.querySelectorAll('.entry-mode-btn').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.entryMode === nextMode);
    });
    document.querySelectorAll('.entry-mode-panel').forEach((panel) => {
        panel.classList.toggle('is-visible', panel.dataset.panel === nextMode);
    });

    if (nextMode === 'manual') {
        setTimeout(() => document.querySelector('#book-title')?.focus(), 50);
    } else if (nextMode === 'barcode') {
        setTimeout(() => document.querySelector('#book-barcode')?.focus(), 50);
    } else {
        setTimeout(() => document.querySelector('#book-excel-file')?.focus(), 50);
    }
};

const openBookForm = (book = null, mode = 'manual') => {
    const modal = document.querySelector('#book-form-modal');
    const form = document.querySelector('#book-form');
    if (!modal || !form) {
        return;
    }

    const newBook = {
        id: '',
        title: '',
        author: '',
        category: '철학',
        categories: ['철학'],
        publisher: 'Syntropy Books 큐레이션',
        description: '',
        barcode: '',
        isbn: '',
        qrcode: '',
        translator: '',
        price: 0,
        stock: 1,
        preview: '',
        incomingDate: '',
        registeredAt: '',
        newUntil: '',
        status: '대기중',
        note: ''
    };

    modal.hidden = false;
    form.reset();
    const status = document.querySelector('#book-form-status');
    if (status) {
        status.textContent = '';
    }

    form.querySelector('#book-id').value = '';
    form.querySelector('#book-status').value = newBook.status;

    if (book) {
        form.dataset.bookId = book.id;
        form.querySelector('#book-id').value = book.id || '';
        form.querySelector('#book-title').value = book.title;
        form.querySelector('#book-author').value = book.author;
        form.querySelector('#book-category').value = getPrimaryCategory(book) || newBook.category;
        const selectedCategories = getBookCategories(book);
        form.querySelectorAll('input[name="categories"]').forEach((checkbox) => {
            checkbox.checked = selectedCategories.includes(checkbox.value);
        });
        form.querySelector('#book-publisher').value = book.publisher || newBook.publisher;
        form.querySelector('#book-description').value = book.description || '';
        form.querySelector('#book-preview').value = book.preview || '';
        form.querySelector('#book-barcode').value = book.barcode || '';
        form.querySelector('#book-isbn').value = book.isbn || '';
        form.querySelector('#book-qrcode').value = book.qrcode || '';
        form.querySelector('#book-price').value = Number(book.price || 0);
        form.querySelector('#book-stock').value = Number(book.stock || 1);
        form.querySelector('#book-translator').value = book.translator || '';
        form.querySelector('#book-incoming-date').value = book.incomingDate || '';
        form.querySelector('#book-registered-at').value = book.registeredAt ? new Date(book.registeredAt).toISOString().slice(0, 10) : '';
        form.querySelector('#book-new-until').value = book.newUntil || '';
        form.querySelector('#book-status').value = BOOK_STATUS_KEYS[book.status] || book.status || newBook.status;
        form.querySelector('#book-note').value = book.note || '';
    } else {
        delete form.dataset.bookId;
        form.querySelectorAll('input[name="categories"]').forEach((checkbox) => {
            checkbox.checked = checkbox.value === newBook.category;
        });
        form.querySelector('#book-category').value = newBook.category;
        setEntryMode(mode);
        return;
    }

    setEntryMode(mode);
};

const closeBookForm = () => {
    const modal = document.querySelector('#book-form-modal');
    const form = document.querySelector('#book-form');
    if (!modal) {
        return;
    }

    modal.hidden = true;
    if (form) {
        delete form.dataset.bookId;
        form.reset();
        form.dataset.entryMode = 'manual';
        document.querySelectorAll('.entry-mode-btn').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.entryMode === 'manual');
        });
        document.querySelectorAll('.entry-mode-panel').forEach((panel) => {
            panel.classList.toggle('is-visible', panel.dataset.panel === 'manual');
        });
    }
};

const setupEntryModeButtons = () => {
    const form = document.querySelector('#book-form');
    const modeButtons = document.querySelectorAll('.entry-mode-btn');
    const panels = document.querySelectorAll('.entry-mode-panel');

    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextMode = button.dataset.entryMode || 'manual';
            form.dataset.entryMode = nextMode;
            modeButtons.forEach((item) => item.classList.toggle('is-active', item === button));
            panels.forEach((panel) => {
                panel.classList.toggle('is-visible', panel.dataset.panel === nextMode);
            });
            if (nextMode === 'manual') {
                document.querySelector('#book-title')?.focus();
            } else if (nextMode === 'barcode') {
                document.querySelector('#book-barcode')?.focus();
            } else {
                document.querySelector('#book-excel-file')?.focus();
            }
        });
    });
};

const handleBookSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.querySelector('#book-form-status');
    const entryMode = form.dataset.entryMode || 'manual';

    if (entryMode === 'excel') {
        const file = document.querySelector('#book-excel-file')?.files?.[0];
        if (!file) {
            if (status) {
                status.textContent = '엑셀 파일을 선택해 주세요.';
                status.style.color = '#a64242';
            }
            return;
        }

        const rows = await parseUploadedExcelRows(file);
        if (!rows.length) {
            if (status) {
                status.textContent = '업로드한 파일에서 도서 정보를 읽지 못했습니다.';
                status.style.color = '#a64242';
            }
            return;
        }

        const nextDrafts = rows.map((row) => buildDraftBook({
            title: row.title || '',
            author: row.author || '',
            category: row.category || '미분류',
            publisher: row.publisher || '미기재',
            description: row.description || '엑셀 업로드로 등록된 도서입니다.',
            status: 'draft',
            isbn: row.isbn || '',
            barcode: row.barcode || '',
            translator: row.translator || '',
            price: row.price || 0,
            stock: Number(row.stock || row.재고 || 0),
            registeredAt: new Date().toISOString(),
            newUntil: ''
        }));

        const existing = getDraftBooksFromStorage();
        saveDraftBooksToStorage([...existing, ...nextDrafts]);
        renderAdminBooks();
        closeBookForm();
        if (status) {
            status.textContent = `${nextDrafts.length}권이 임시 등록되었습니다.`;
            status.style.color = '#2d6a4f';
        }
        return;
    }

    const formData = new FormData(form);
    const selectedCategories = [...document.querySelectorAll('input[name="categories"]:checked')].map((checkbox) => String(checkbox.value || '').trim()).filter(Boolean);
    const primaryCategory = String(formData.get('category') || selectedCategories[0] || '').trim();
    const categories = [...new Set([...selectedCategories, primaryCategory].filter(Boolean))];

    const incomingFile = document.querySelector('#book-cover')?.files?.[0];
    let coverValue = '';
    if (incomingFile && incomingFile.type.startsWith('image/')) {
        const reader = new FileReader();
        coverValue = await new Promise((resolve) => {
            reader.onload = () => resolve(String(reader.result || ''));
            reader.readAsDataURL(incomingFile);
        });
    }

    let newBook = {
        id: String(formData.get('id') || form.dataset.bookId || '').trim() || generateBookId(),
        title: String(formData.get('title') || '').trim(),
        author: String(formData.get('author') || '').trim(),
        category: primaryCategory,
        categories,
        publisher: String(formData.get('publisher') || '').trim(),
        description: String(formData.get('description') || '').trim(),
        barcode: String(formData.get('barcode') || '').trim(),
        isbn: String(formData.get('isbn') || '').trim(),
        qrcode: String(formData.get('qrcode') || '').trim(),
        translator: String(formData.get('translator') || '').trim(),
        price: Number(formData.get('price') || 0),
        stock: Number(formData.get('stock') || 0),
        incomingDate: String(formData.get('incomingDate') || '').trim(),
        registeredAt: String(formData.get('registeredAt') || new Date().toISOString()).trim(),
        newUntil: String(formData.get('newUntil') || '').trim(),
        classification: String(formData.get('classification') || (Number(formData.get('stock') || 0) === 0 ? BOOK_STATUS.SOLD_OUT : BOOK_STATUS.COMPLETE)).trim(),
        preview: String(formData.get('preview') || '').trim(),
        cover: coverValue,
        status: 'draft',
        note: String(formData.get('note') || '').trim()
    };

    if (entryMode === 'barcode') {
        const fromBarcode = parseBarcodeIntoBook(newBook.barcode || formData.get('barcode'));
        if (fromBarcode) {
            newBook = { ...newBook, ...fromBarcode, barcode: newBook.barcode || fromBarcode.barcode || '' };
        }
    }

    if (!newBook.title || !newBook.author || !newBook.category || !newBook.publisher || !newBook.description) {
        if (status) {
            status.textContent = '필수 항목을 모두 입력해 주세요.';
            status.style.color = '#a64242';
        }
        return;
    }

    newBook.category = getPrimaryCategory(newBook);
    newBook.categories = getBookCategories(newBook);

    const drafts = getDraftBooksFromStorage();
    const existingBookId = form.dataset.bookId;
    const completedDraft = buildDraftBook({
        ...newBook,
        id: existingBookId || generateBookId(),
        registeredAt: new Date().toISOString(),
        newUntil: ''
    });

    const updatedDrafts = existingBookId
        ? drafts.map((book) => book.id === existingBookId ? completedDraft : book)
        : [...drafts, completedDraft];

    saveDraftBooksToStorage(updatedDrafts);
    renderAdminBooks();
    closeBookForm();
    if (status) {
        status.textContent = '임시 등록되었습니다. 상세 정보를 채우면 정식 등록됩니다.';
        status.style.color = '#2d6a4f';
    }
};

const setupAutocompleteField = (inputId, nextFieldId, fieldName) => {
    const input = document.getElementById(inputId);
    if (!input) {
        return;
    }

    const parent = input.parentElement;
    if (!parent || parent.classList.contains('autocomplete-wrapper')) {
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'autocomplete-wrapper';
    parent.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const list = document.createElement('ul');
    list.className = 'autocomplete-list';
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-label', `${fieldName} 자동완성`);
    wrapper.appendChild(list);

    const hideSuggestions = () => {
        list.classList.remove('is-open');
        list.innerHTML = '';
        input.dataset.activeIndex = '-1';
    };

    const applySelection = (value) => {
        input.value = value;
        hideSuggestions();
        const target = nextFieldId ? document.getElementById(nextFieldId) : null;
        target?.focus();
    };

    const updateSuggestions = () => {
        const keyword = input.value.trim();
        if (!keyword) {
            hideSuggestions();
            return;
        }

        const books = getBooksFromStorage();
        const suggestions = [...new Set(
            books
                .map((book) => String(book[fieldName] || '').trim())
                .filter((value) => value)
        )]
            .map((value) => ({
                value,
                priority: value.startsWith(keyword) ? 0 : value.includes(keyword) ? 1 : 2
            }))
            .filter((item) => item.priority < 2)
            .sort((a, b) => a.priority - b.priority || a.value.localeCompare(b.value, 'ko'))
            .map((item) => item.value)
            .slice(0, 8);

        if (!suggestions.length) {
            hideSuggestions();
            return;
        }

        list.innerHTML = suggestions
            .map((value, index) => `
                <li class="autocomplete-item" data-value="${value}" data-index="${index}" role="option" aria-selected="false">${value}</li>
            `)
            .join('');

        list.classList.add('is-open');
        input.dataset.activeIndex = '0';

        list.querySelectorAll('.autocomplete-item').forEach((item) => {
            item.addEventListener('mousedown', (event) => {
                event.preventDefault();
                applySelection(item.dataset.value);
            });

            item.addEventListener('mouseenter', () => {
                list.querySelectorAll('.autocomplete-item').forEach((candidate) => candidate.classList.remove('is-active'));
                item.classList.add('is-active');
                input.dataset.activeIndex = String(item.dataset.index);
            });
        });
    };

    input.addEventListener('input', updateSuggestions);
    input.addEventListener('focus', () => {
        if (input.value.trim()) {
            updateSuggestions();
        }
    });

    input.addEventListener('keydown', (event) => {
        const items = [...list.querySelectorAll('.autocomplete-item')];
        if (!items.length) {
            if (event.key === 'Enter' && input.value.trim()) {
                const next = nextFieldId ? document.getElementById(nextFieldId) : null;
                next?.focus();
            }
            return;
        }

        const currentIndex = Number(input.dataset.activeIndex || '0');

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
            input.dataset.activeIndex = String(nextIndex);
            list.querySelectorAll('.autocomplete-item').forEach((item, index) => {
                item.classList.toggle('is-active', index === nextIndex);
            });
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            const nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
            input.dataset.activeIndex = String(nextIndex);
            list.querySelectorAll('.autocomplete-item').forEach((item, index) => {
                item.classList.toggle('is-active', index === nextIndex);
            });
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            const selectedIndex = Number(input.dataset.activeIndex || '0');
            const selectedItem = items[selectedIndex];
            if (selectedItem) {
                applySelection(selectedItem.dataset.value);
                return;
            }
            const next = nextFieldId ? document.getElementById(nextFieldId) : null;
            next?.focus();
        }

        if (event.key === 'Escape') {
            hideSuggestions();
        }
    });

    input.addEventListener('blur', () => {
        window.setTimeout(() => {
            if (!wrapper.contains(document.activeElement)) {
                hideSuggestions();
            }
        }, 120);
    });
};

const protectAdminPage = () => {
    const isLoggedIn = sessionStorage.getItem('syntropyAdminLoggedIn') === 'true';

    if (!isLoggedIn) {
        window.location.href = getMainPageUrl();
        return;
    }

    const logoutButton = document.querySelector('#admin-logout');
    logoutButton?.addEventListener('click', () => {
        sessionStorage.removeItem('syntropyAdminLoggedIn');
        window.location.href = getMainPageUrl();
    });

    const addBookButton = document.querySelector('#open-book-form-btn');
    addBookButton?.addEventListener('click', () => {
        const emptyDraft = {
            id: generateBookId(),
            title: '새 도서',
            author: '',
            category: '철학',
            publisher: 'Syntropy Books 큐레이션',
            description: '',
            translator: '',
            price: 0,
            stock: 1,
            registeredAt: new Date().toISOString(),
            newUntil: '',
            cover: '',
            preview: ''
        };

        const drafts = getDraftBooksFromStorage();
        saveDraftBooksToStorage([...drafts, emptyDraft]);
        window.location.href = `../books/book-detail.html?book=${encodeURIComponent(emptyDraft.title)}&draft=true`;
    });

    document.querySelectorAll('[data-open-mode]').forEach((button) => {
        button.addEventListener('click', () => {
            const mode = button.dataset.openMode || 'manual';
            openBookForm(null, mode);
        });
    });

    document.querySelectorAll('[data-close-book-form]').forEach((element) => {
        element.addEventListener('click', closeBookForm);
    });

    const exportButton = document.querySelector('#export-books-btn');
    exportButton?.addEventListener('click', exportAllBooksToExcel);

    const form = document.querySelector('#book-form');
    form?.addEventListener('submit', handleBookSubmit);
    setupEntryModeButtons();

    seedIncompleteDraftBooks();
    setupAutocompleteField('book-title', 'book-author', 'title');
    setupAutocompleteField('book-author', 'book-publisher', 'author');
    setupAutocompleteField('book-publisher', 'book-description', 'publisher');
    renderAdminBooks();
};

document.addEventListener('DOMContentLoaded', protectAdminPage);
