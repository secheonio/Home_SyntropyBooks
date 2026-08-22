(function () {
    const normalizeQuery = (value) => String(value ?? '').trim().toLocaleLowerCase();

    const getFallbackCatalog = () => [
        { title: '생명이란 무엇인가', author: '에르빈 슈뢰딩거', category: '생명과학', publisher: 'Syntropy Books 큐레이션', description: '물리학의 언어로 생명과 질서의 근원을 탐구합니다.', href: 'life-science.html?book=생명이란%20무엇인가' },
        { title: '생명의 그물', author: '프리초프 카프라', category: '생명과학', publisher: 'Syntropy Books 큐레이션', description: '생태계와 사회를 연결하는 네트워크적 사고를 제시합니다.', href: 'life-science.html?book=생명의%20그물' },
        { title: '시스템 사고', author: '피터 센게', category: '시스템 사고', publisher: 'Syntropy Books 큐레이션', description: '복잡한 문제를 구조와 관계로 이해하는 사고법을 소개합니다.', href: 'systems-thinking.html?book=시스템%20사고' },
        { title: '카오스', author: '제임스 글릭', category: '복잡계', publisher: '승산', description: '혼돈 속의 패턴을 읽는 통찰을 제공합니다.', href: 'complexity.html?book=카오스' },
        { title: '코스모스', author: '칼 세이건', category: '우주와 질서', publisher: '사이언스북스', description: '우주와 생명의 관계를 생각하게 하는 과학 고전입니다.', href: 'cosmos.html?book=코스모스' },
        { title: '이기적 유전자', author: '리처드 도킨스', category: '진화와 협력', publisher: '을유문화사', description: '진화와 생명 유지의 원리를 유전자 관점에서 탐구합니다.', href: 'evolution.html?book=이기적%20유전자' },
        { title: '엔트로피', author: '제러미 리프킨', category: '문명과 에너지', publisher: 'Syntropy Books 큐레이션', description: '에너지와 문명의 흐름을 연결해 바라봅니다.', href: 'energy.html?book=엔트로피' },
        { title: '오래된 미래', author: '헬레나 노르베리 호지', category: '생태철학', publisher: '중앙북스', description: '지속 가능한 미래를 공동체와 생태의 관점에서 제시합니다.', href: 'ecology.html?book=오래된%20미래' },
        { title: '장자', author: '장자', category: '철학', publisher: '을유문화사', description: '변화와 관계를 유기적으로 이해하는 철학적 통찰을 담고 있습니다.', href: 'philosophy.html?book=장자' },
        { title: '다윈의 위험한 생각', author: '대니얼 데닛', category: '생명과학', publisher: 'Syntropy Books 큐레이션', description: '진화적 시선이 인간 이해를 어떻게 변화시켰는지 보여줍니다.', href: 'life-science.html?book=다윈의%20위험한%20생각' },
        { title: '협력의 진화', author: '로버트 액설로드', category: '진화와 협력', publisher: 'Syntropy Books 큐레이션', description: '경쟁과 협력이 함께 진화의 토대가 된다는 통찰을 제공합니다.', href: 'evolution.html?book=협력의%20진화' },
        { title: '지속 가능한 에너지', author: '데이비드 맥케이', category: '문명과 에너지', publisher: 'Syntropy Books 큐레이션', description: '에너지 전환의 현실과 조건을 체계적으로 살펴봅니다.', href: 'energy.html?book=지속%20가능한%20에너지' }
    ];

    const formatSearchDate = (value) => {
        if (!value) {
            return '미기재';
        }

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return '미기재';
        }

        return date.toLocaleDateString('ko-KR');
    };

    const getBookDisplayStatus = (book) => {
        const rawStatus = String(book?.status || book?.bookStatus || '').trim().toLowerCase();
        const stock = Number(book?.stock ?? 0);

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

    const normalizeCatalogBook = (book) => {
        if (!book || typeof book !== 'object') {
            return null;
        }

        const title = String(book.title || '').trim();
        if (!title) {
            return null;
        }

        return {
            title,
            author: String(book.author || book.writer || '미상').trim() || '미상',
            category: String(book.category || book.categories || '기타').trim() || '기타',
            publisher: String(book.publisher || 'Syntropy Books 큐레이션').trim() || 'Syntropy Books 큐레이션',
            description: String(book.description || '').trim() || '도서 소개를 준비 중입니다.',
            href: String(book.href || book.link || `book-detail.html?book=${encodeURIComponent(title)}`),
            cover: String(book.cover || '').trim(),
            registeredAt: book.registeredAt || book.registered_at || '',
            stock: Number(book.stock || 0),
            status: book.status || 'published'
        };
    };

    const INVENTORY_RESET_SESSION_KEY = 'syntropyInventoryBaselineApplied';
    const INVENTORY_KIND_TARGET = 35;
    const INVENTORY_COPY_TARGET = 158;

    const getInventoryBaselineBooks = () => {
        const titles = [
            '생명이란 무엇인가', '다윈의 위험한 생각', '생명의 그물', '시스템 사고', '카오스', '복잡계 개론', '코스모스',
            '시간의 역사', '이기적 유전자', '협력의 진화', '엔트로피', '에너지와 문명', '오래된 미래', '침묵의 봄', '장자',
            '스피노자 철학', '고요한 붉은 달', '결정의 형태', '사라지는 경계', '무질서의 그림자', '빛의 장기', '달빛 아래의 네트워크',
            '우주에서 읽는 인간', '시간의 나무', '진화의 가벼움', '공존의 패턴', '에너지의 일기', '도시에서 배우는 평온',
            '생태계의 낮은 목소리', '막다른 길의 철학', '새벽의 구조', '태양의 반지', '도시와 평온', '첫 번째 질문', '자연과 자유'
        ];

        const stockByIndex = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 2];

        return titles.map((title, index) => ({
            id: `baseline-${index + 1}`,
            title,
            author: ['에르빈 슈뢰딩거', '대니얼 데닛', '프리초프 카프라', '피터 센게', '제임스 글릭', '복잡계 큐레이션', '칼 세이건', '스티븐 호킹', '리처트 도킨스', '로버트 액설로드', '제러미 리프킨', '바츨라프 스밀', '헬레나 노르베리 호지', '레이첼 카슨', '장자', '스피노자', '서윤아', '최하린', '나재호', '이도엽', '박서린', '정우진', '강민서', '유세은', '빈예준', '오태경', '홍지우', '신유나', '문지환', '이한결', '전예림', '김지혜', '신예린', '이성우', '철학 큐레이션'][index],
            category: ['생명과학', '생명과학', '시스템 사고', '시스템 사고', '복잡계', '복잡계', '우주와 질서', '우주와 질서', '진화와 협력', '진화와 협력', '문명과 에너지', '문명과 에너지', '생태철학', '생태철학', '철학', '철학', '생명과학', '철학', '시스템 사고', '복잡계', '미분류', '시스템 사고', '우주와 질서', '철학', '진화와 협력', '진화와 협력', '문명과 에너지', '문명과 에너지', '생태철학', '철학', '철학', '우주와 질서', '문명과 에너지', '생태철학', '철학'][index],
            publisher: 'Syntropy Books 큐레이션',
            description: index === titles.length - 1 ? '자연과 함께 살아가는 삶의 태도와 판단의 기준을 탐구합니다.' : '기본 비치 도서 기준 데이터입니다.',
            href: `book-detail.html?book=${encodeURIComponent(title)}`,
            cover: '',
            registeredAt: '2026-08-22',
            status: 'published',
            stock: stockByIndex[index],
            price: 0
        }));
    };

    const ensureInventoryBaseline = () => {
        const existingCatalog = (() => {
            try {
                const raw = localStorage.getItem('syntropyBooksCatalog');
                return raw ? JSON.parse(raw) : null;
            } catch (error) {
                return null;
            }
        })();

        const sampleTitles = new Set(['신규추가도서', '미분류 샘플 도서', '분류 보류 자료집', '카테고리 검토 노트']);
        const hasSampleData = Array.isArray(existingCatalog)
            ? existingCatalog.some((book) => sampleTitles.has(String(book.title || '').trim()))
            : false;
        const kindCount = Array.isArray(existingCatalog) ? existingCatalog.length : 0;
        const totalCopies = Array.isArray(existingCatalog)
            ? existingCatalog.reduce((sum, book) => sum + Number(book.stock || 0), 0)
            : 0;

        const isCanonicalCatalog = Array.isArray(existingCatalog)
            && kindCount === INVENTORY_KIND_TARGET
            && totalCopies === INVENTORY_COPY_TARGET
            && !hasSampleData;

        if (isCanonicalCatalog) {
            return;
        }

        const baselineBooks = getInventoryBaselineBooks();
        const baselineCopies = baselineBooks.reduce((sum, book) => sum + Number(book.stock || 0), 0);

        if (baselineBooks.length !== INVENTORY_KIND_TARGET || baselineCopies !== INVENTORY_COPY_TARGET) {
            console.warn('기본 재고 기준이 일치하지 않아 보정합니다.', { kindCount: baselineBooks.length, totalCopies: baselineCopies });
        }

        localStorage.setItem('syntropyBooksCatalog', JSON.stringify(baselineBooks));
        localStorage.setItem('syntropyDraftBooksCatalog', JSON.stringify([]));
        sessionStorage.setItem(INVENTORY_RESET_SESSION_KEY, 'true');
    };

    const getManagedCatalogEntries = () => {
        ensureInventoryBaseline();

        const storageCatalogs = [];

        try {
            const published = JSON.parse(localStorage.getItem('syntropyBooksCatalog') || localStorage.getItem('syntropyCatalog') || '[]');
            if (Array.isArray(published)) {
                storageCatalogs.push(...published.map((book) => ({ ...book, status: 'published' })));
            }
        } catch (error) {
            // ignore and fall back to static data
        }

        try {
            const drafts = JSON.parse(localStorage.getItem('syntropyDraftBooksCatalog') || '[]');
            if (Array.isArray(drafts)) {
                storageCatalogs.push(...drafts.map((book) => ({ ...book, status: book.status || 'draft' })));
            }
        } catch (error) {
            // ignore and fall back to static data
        }

        const merged = [];
        const seen = new Set();

        storageCatalogs.forEach((book) => {
            const title = String(book.title || '').trim();
            if (!title) {
                return;
            }

            const key = `${title.toLocaleLowerCase()}|${String(book.author || book.writer || '').trim().toLocaleLowerCase()}`;
            if (seen.has(key)) {
                return;
            }

            seen.add(key);
            merged.push(book);
        });

        return merged;
    };

    const getSearchCatalogBooks = () => {
        const storageCatalogs = getManagedCatalogEntries();
        if (storageCatalogs.length > 0) {
            return storageCatalogs.map(normalizeCatalogBook).filter(Boolean);
        }

        const fromCards = [...document.querySelectorAll('.book-card')]
            .map((card) => {
                const title = card.querySelector('.book-title')?.textContent?.trim();
                if (!title) {
                    return null;
                }

                const author = card.querySelector('.book-author')?.textContent?.trim() || '미상';
                const category = card.dataset.categoryLabel || card.querySelector('.book-category')?.textContent?.trim() || '기타';
                const publisher = card.querySelector('.book-publisher')?.textContent?.replace(/^출판사:\s*/, '')?.trim() || 'Syntropy Books 큐레이션';
                const description = card.querySelector('.book-description')?.textContent?.trim() || '도서 소개를 준비 중입니다.';
                const href = card.querySelector('a.book-detail-link')?.getAttribute('href') || `book-detail.html?book=${encodeURIComponent(title)}`;

                return { title, author, category, publisher, description, href };
            })
            .filter(Boolean);

        if (fromCards.length > 0) {
            return fromCards;
        }

        return getFallbackCatalog();
    };

    const matchesBookTitleQuery = (bookTitle, query) => {
        if (!query) {
            return true;
        }

        return String(bookTitle || '').trim().toLocaleLowerCase().includes(query);
    };

    const getTitleMatchCount = (input, cards) => {
        const query = normalizeQuery(input.value);
        if (!query) {
            return cards.length;
        }

        return getSearchCatalogBooks()
            .filter((book) => matchesBookTitleQuery(book.title, query))
            .length;
    };

    const getCatalogStatusSummary = (books) => {
        const validBooks = Array.isArray(books) ? books.filter(Boolean) : [];
        const kindCount = validBooks.length;
        const totalCopies = validBooks.reduce((sum, book) => sum + Math.max(0, Number(book?.stock || 0)), 0);

        return {
            kindCount,
            totalCopies
        };
    };

    const getSearchStatusText = (input, cards, totalCount) => {
        const query = normalizeQuery(input.value);
        const catalogBooks = getSearchCatalogBooks();
        const matchedBooks = query
            ? catalogBooks.filter((book) => matchesBookTitleQuery(book.title, query))
            : catalogBooks;
        const summary = getCatalogStatusSummary(matchedBooks);

        if (!query) {
            return `총 ${summary.kindCount}종 ${summary.totalCopies}권`;
        }

        return `${summary.kindCount}종 ${summary.totalCopies}권 검색`;
    };

    const getSuggestionHref = (book) => {
        if (book?.href) {
            return book.href;
        }

        const title = encodeURIComponent(String(book?.title || '').trim() || '');
        return title ? `book-detail.html?book=${title}` : 'books.html';
    };

    const getDropdownHost = (input) => {
        return input.closest('.book-search, .header-search') || input.parentElement;
    };

    const ensureSuggestionDropdown = (input) => {
        const host = getDropdownHost(input);
        if (!host) {
            return null;
        }

        let dropdown = host.querySelector('.search-suggestion-list');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'search-suggestion-list';
            dropdown.setAttribute('role', 'listbox');
            dropdown.hidden = true;
            host.appendChild(dropdown);
        }

        return dropdown;
    };

    const hideSuggestions = (input) => {
        const dropdown = ensureSuggestionDropdown(input);
        if (!dropdown) {
            return;
        }

        dropdown.hidden = true;
        dropdown.innerHTML = '';
    };

    const renderSuggestions = (input) => {
        const query = normalizeQuery(input.value);
        const dropdown = ensureSuggestionDropdown(input);
        const status = document.querySelector('#book-search-status');
        const cards = [...document.querySelectorAll('.book-card')];

        if (!dropdown) {
            return;
        }

        if (!query) {
            hideSuggestions(input);
            if (status) {
                status.textContent = getSearchStatusText(input, cards, cards.length);
            }
            return;
        }

        const suggestions = getSearchCatalogBooks()
            .filter((book) => matchesBookTitleQuery(book.title, query))
            .slice(0, 8);

        if (!suggestions.length) {
            dropdown.innerHTML = '<button type="button" class="search-suggestion-empty" disabled>일치하는 도서가 없습니다.</button>';
            dropdown.hidden = false;
            return;
        }

        dropdown.innerHTML = suggestions.map((book) => {
            const title = String(book.title || '제목 없음').trim();
            const href = getSuggestionHref(book);
            const author = String(book.author || '미상').trim();
            const publisher = String(book.publisher || 'Syntropy Books 큐레이션').trim();
            const status = getBookDisplayStatus(book);
            const registeredAt = book.registeredAt || book.registered_at || '';
            const formattedDate = registeredAt ? formatSearchDate(registeredAt) : '';
            const cover = book.cover ? String(book.cover).trim() : '';
            const coverMarkup = cover
                ? `<img src="${cover}" alt="${title} 표지" class="search-suggestion-cover-image">`
                : `<div class="search-suggestion-cover-fallback">${title.slice(0, 2) || '도서'}</div>`;

            return `<button type="button" class="search-suggestion-item" data-href="${href}" role="option">
                <div class="search-suggestion-cover">${coverMarkup}</div>
                <div class="search-suggestion-details">
                    <div class="search-suggestion-line search-suggestion-primary-line">
                        <span class="search-suggestion-title">${title}</span>
                        <span class="search-suggestion-author">${author}</span>
                        <span class="search-suggestion-publisher">${publisher}</span>
                    </div>
                    <div class="search-suggestion-line search-suggestion-meta-line">
                        <span class="search-suggestion-status">${status}</span>
                        ${formattedDate ? `<span class="search-suggestion-date">${formattedDate}</span>` : ''}
                    </div>
                </div>
            </button>`;
        }).join('');

        dropdown.hidden = false;

        dropdown.querySelectorAll('.search-suggestion-item').forEach((button) => {
            button.addEventListener('click', () => {
                window.location.href = button.dataset.href || 'book-detail.html';
            });
        });

        if (status) {
            status.textContent = getSearchStatusText(input, cards, cards.length);
        }
    };

    const initCommonBookSearch = () => {
        const input = document.querySelector('#book-search-input');
        const status = document.querySelector('#book-search-status');
        const cards = [...document.querySelectorAll('.book-card')];

        if (!input) {
            return;
        }

        const syncStatus = () => {
            if (status) {
                status.textContent = getSearchStatusText(input, cards, cards.length);
            }
        };

        if (input.dataset.commonSearchBound === 'true') {
            syncStatus();
            return;
        }

        input.dataset.commonSearchBound = 'true';

        input.addEventListener('input', () => {
            renderSuggestions(input);
            syncStatus();
        });

        input.addEventListener('focus', () => {
            renderSuggestions(input);
        });

        input.addEventListener('blur', () => {
            window.setTimeout(() => hideSuggestions(input), 120);
        });

        input.addEventListener('keydown', (event) => {
            const dropdown = ensureSuggestionDropdown(input);
            const suggestionButtons = dropdown ? [...dropdown.querySelectorAll('.search-suggestion-item')] : [];

            if (event.key === 'Escape') {
                hideSuggestions(input);
                return;
            }

            if (event.key === 'Enter') {
                const query = normalizeQuery(input.value);
                if (!query) {
                    return;
                }

                if (suggestionButtons.length === 1) {
                    event.preventDefault();
                    window.location.href = suggestionButtons[0].dataset.href || 'book-detail.html';
                    return;
                }

                event.preventDefault();
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
                return;
            }

            if (event.key === 'ArrowDown' && dropdown && !dropdown.hidden && suggestionButtons.length) {
                event.preventDefault();
                suggestionButtons[0]?.focus();
            }
        });

        if (status) {
            status.textContent = getSearchStatusText(input, cards, cards.length);
        }
    };

    window.getSearchCatalogBooks = getSearchCatalogBooks;
    window.initCommonBookSearch = initCommonBookSearch;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initCommonBookSearch();
        }, { once: true });
    } else {
        initCommonBookSearch();
    }
})();
