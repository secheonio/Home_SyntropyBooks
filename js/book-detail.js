const DRAFT_STORAGE_KEY = 'syntropyDraftBooksCatalog';
const PUBLISHED_STORAGE_KEY = 'syntropyBooksCatalog';

const bookDetails = {
    '생명이란 무엇인가': { category: '생명과학', author: '에르빈 슈뢰딩거', translator: '', publisher: 'Syntropy Books 큐레이션', price: '큐레이션 도서', description: '물리학의 언어로 생명과 질서의 근원을 탐구하며 살아 있는 세계를 새롭게 바라보게 하는 고전입니다.', preview: '생명은 주변의 질서 속에서 스스로를 지켜 내는 존재다.', cover: 'life-science.svg' },
    '생명의 그물': { category: '시스템 사고', author: '프리초프 카프라', translator: '', publisher: 'Syntropy Books 큐레이션', price: '큐레이션 도서', description: '생태계와 사회를 서로 연결된 네트워크로 읽으며 관계 속의 질서를 설명합니다.', preview: '생명은 고립된 개체가 아니라 관계의 그물 속에서 살아간다.', cover: 'systems-thinking.svg' },
    '카오스': { category: '복잡계', author: '제임스 글릭', translator: '박배식', publisher: '승산', price: '출판사별 판본에 따라 다름', description: '작은 변화가 거대한 패턴을 만드는 과정을 따라가며 혼돈 속 질서를 보여줍니다.', preview: '예측할 수 없는 움직임 속에도 반복되는 패턴은 존재한다.', cover: 'complexity.svg' },
    '코스모스': { category: '우주와 질서', author: '칼 세이건', translator: '홍승수', publisher: '사이언스북스', price: '출판사별 판본에 따라 다름', description: '우주의 시간과 생명의 진화를 연결해 바라보는 과학 고전입니다.', preview: '우리는 우주가 스스로를 알아가는 방식의 일부다.', cover: 'cosmos.svg' },
    '이기적 유전자': { category: '진화와 협력', author: '리처드 도킨스', translator: '홍영남, 이상임', publisher: '을유문화사', price: '출판사별 판본에 따라 다름', description: '생명체의 행동과 진화를 유전자 관점에서 살피며 생명 시스템의 유지를 질문합니다.', preview: '생명의 역사는 경쟁만이 아니라 반복되는 선택의 역사이기도 하다.', cover: 'evolution.svg' },
    '엔트로피': { category: '문명과 에너지', author: '제러미 리프킨', translator: '', publisher: 'Syntropy Books 큐레이션', price: '큐레이션 도서', description: '에너지의 흐름과 문명의 방향을 돌아보며 지속 가능한 전환을 생각하게 합니다.', preview: '모든 문명은 에너지의 흐름 위에 세워진다.', cover: 'energy.svg' },
    '오래된 미래': { category: '생태철학', author: '헬레나 노르베리 호지', translator: '김태언', publisher: '중앙북스', price: '출판사별 판본에 따라 다름', description: '지역 공동체의 삶을 통해 성장 중심 문명을 성찰하고 미래의 단서를 찾습니다.', preview: '작은 공동체의 삶은 미래를 위한 오래된 지혜를 품고 있다.', cover: 'ecology.svg' },
    '장자': { category: '철학', author: '장자', translator: '김학주', publisher: '을유문화사', price: '출판사별 판본에 따라 다름', description: '고정된 질서에서 벗어나 변화와 관계의 흐름을 바라보는 감각을 일깨웁니다.', preview: '변화하는 세계와 함께 흐를 때 삶은 더 넓어진다.', cover: 'philosophy.svg' }
};

const BOOK_STATUS = Object.freeze({
    PURCHASE: '구매중',
    WAITING: '대기중',
    NEW: '신규책',
    COMPLETE: '등록완료',
    SHIPPING: '발송예정',
    RETURNED: '반품처리',
    SOLD_OUT: '품절'
});

const categoryPageByName = {
    '생명과학': 'life-science.html',
    '시스템 사고': 'systems-thinking.html',
    '복잡계': 'complexity.html',
    '우주와 질서': 'cosmos.html',
    '진화와 협력': 'evolution.html',
    '문명과 에너지': 'energy.html',
    '생태철학': 'ecology.html',
    '철학': 'philosophy.html'
};

const getSavedDrafts = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || '[]');
        return Array.isArray(stored) ? stored : [];
    } catch (error) {
        return [];
    }
};

const getSavedBooks = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(PUBLISHED_STORAGE_KEY) || '[]');
        return Array.isArray(stored) ? stored : [];
    } catch (error) {
        return [];
    }
};

const normalizeDraftDisplayValue = (value, fallback = '없음') => {
    const text = String(value ?? '').trim();
    return text || fallback;
};

const getDraftClassification = (draft) => {
    const stock = Number(draft?.stock || 0);
    if (draft?.status === 'draft') {
        return BOOK_STATUS.WAITING;
    }
    if (draft?.status === 'preorder' || stock === 0) {
        return BOOK_STATUS.PURCHASE;
    }
    if (draft?.status === 'shipping') {
        return BOOK_STATUS.SHIPPING;
    }
    if (draft?.status === 'returned') {
        return BOOK_STATUS.RETURNED;
    }
    if (draft?.newUntil && new Date(draft.newUntil) > new Date()) {
        return BOOK_STATUS.NEW;
    }
    return BOOK_STATUS.COMPLETE;
};

const finalizeDraftBook = (draft) => {
    if (!draft || !draft.title) {
        return;
    }

    const publishedBooks = getSavedBooks();
    const normalizedDraft = {
        ...draft,
        cover: String(draft.cover || '').trim() || 'book.svg',
        translator: normalizeDraftDisplayValue(draft.translator, '없음'),
        title: String(draft.title || '').trim(),
        author: String(draft.author || '').trim(),
        category: String(draft.category || '').trim(),
        publisher: String(draft.publisher || '').trim(),
        description: String(draft.description || '').trim(),
        preview: String(draft.preview || '').trim(),
        price: Number(draft.price || 0),
        stock: Number(draft.stock || 0),
        incomingDate: String(draft.incomingDate || draft.arrivalDate || '').trim(),
        registeredAt: String(draft.registeredAt || new Date().toISOString()).trim(),
        newUntil: String(draft.newUntil || new Date(Date.now() + 30 * 86400000).toISOString()).trim(),
        classification: String(draft.classification || getDraftClassification(draft)).trim(),
        status: Number(draft.stock || 0) === 0 ? 'preorder' : 'published'
    };

    const alreadyExists = publishedBooks.some((book) => book.title === normalizedDraft.title);
    if (!alreadyExists) {
        localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify([...publishedBooks, normalizedDraft]));
    }

    const draftBooks = getSavedDrafts().filter((book) => book.id !== normalizedDraft.id && book.title !== normalizedDraft.title);
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftBooks));
    window.dispatchEvent(new CustomEvent('syntropyCatalogUpdated'));
    window.location.href = '../admin/admin.html';
};

const getMissingDraftFields = (draft) => {
    const requiredFields = [
        ['cover', '책표지 이미지'],
        ['category', '카테고리'],
        ['title', '책 제목'],
        ['author', '지은이'],
        ['translator', '옮긴이'],
        ['publisher', '출판사'],
        ['price', '책값'],
        ['stock', '재고'],
        ['incomingDate', '입고일'],
        ['registeredAt', '등록일'],
        ['newUntil', '신간 만료일'],
        ['classification', '상태 분류'],
        ['description', '책 소개'],
        ['preview', '미리보기 문장']
    ];

    return requiredFields
        .filter(([fieldName]) => {
            if (fieldName === 'translator') {
                return !String(draft[fieldName] || '').trim() && String(draft[fieldName] || '').trim() !== '없음';
            }
            return !String(draft[fieldName] || '').trim();
        })
        .map(([, label]) => label);
};

const saveDraftFormState = (bookId, values) => {
    const draftBooks = getSavedDrafts();
    const nextDrafts = draftBooks.map((book) => {
        if (book.id !== bookId) {
            return book;
        }

        return {
            ...book,
            ...values,
            title: String(values.title || '').trim(),
            author: String(values.author || '').trim(),
            category: String(values.category || '').trim(),
            publisher: String(values.publisher || '').trim(),
            translator: String(values.translator || '').trim(),
            description: String(values.description || '').trim(),
            price: Number(values.price || 0),
            stock: Number(values.stock || 0)
        };
    });

    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(nextDrafts));
    window.dispatchEvent(new CustomEvent('syntropyCatalogUpdated'));
};

const readDraftFormValues = (bookId) => {
    const form = document.querySelector('#draft-book-form');
    if (!form) {
        return null;
    }

    const formData = new FormData(form);
    return {
        id: bookId,
        title: String(formData.get('title') || '').trim(),
        category: String(formData.get('category') || '').trim(),
        author: String(formData.get('author') || '').trim(),
        translator: String(formData.get('translator') || '').trim() || '없음',
        publisher: String(formData.get('publisher') || '').trim(),
        price: Number(formData.get('price') || 0),
        stock: Number(formData.get('stock') || 0),
        incomingDate: String(formData.get('incomingDate') || '').trim(),
        registeredAt: String(formData.get('registeredAt') || '').trim(),
        newUntil: String(formData.get('newUntil') || '').trim(),
        classification: String(formData.get('classification') || '').trim() || (Number(formData.get('stock') || 0) === 0 ? BOOK_STATUS.SOLD_OUT : BOOK_STATUS.COMPLETE),
        description: String(formData.get('description') || '').trim(),
        cover: String(formData.get('cover') || '').trim(),
        preview: String(formData.get('preview') || '').trim()
    };
};

const MAX_COVER_BYTES = 260000;
const MAX_COVER_DIMENSION = 1200;

const normalizeCoverValue = (coverValue) => {
    if (!coverValue || typeof coverValue !== 'string') {
        return 'book.svg';
    }

    if (coverValue.startsWith('data:image/')) {
        const size = new TextEncoder().encode(coverValue).length;
        if (size > MAX_COVER_BYTES) {
            return 'book.svg';
        }
        return coverValue;
    }

    return coverValue;
};

const resizeCoverImage = (file, maxDimension = MAX_COVER_DIMENSION, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const image = new Image();
            image.onload = () => {
                const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
                const width = Math.max(1, Math.round(image.width * scale));
                const height = Math.max(1, Math.round(image.height * scale));
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext('2d');
                if (!context) {
                    resolve('');
                    return;
                }

                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, width, height);
                context.drawImage(image, 0, 0, width, height);

                const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                const dataUrl = mimeType === 'image/png'
                    ? canvas.toDataURL('image/png')
                    : canvas.toDataURL('image/jpeg', quality);

                const size = new TextEncoder().encode(dataUrl).length;
                if (!dataUrl || size > MAX_COVER_BYTES) {
                    const fallback = canvas.toDataURL('image/jpeg', Math.min(0.65, quality));
                    const fallbackSize = new TextEncoder().encode(fallback).length;
                    resolve(fallbackSize <= MAX_COVER_BYTES ? fallback : '');
                    return;
                }

                resolve(dataUrl);
            };
            image.onerror = () => reject(new Error('이미지를 불러오지 못했습니다.'));
            image.src = String(reader.result || '');
        };
        reader.onerror = () => reject(new Error('이미지를 읽을 수 없습니다.'));
        reader.readAsDataURL(file);
    });
};

const safeSaveCoverValue = (coverValue) => {
    const normalized = normalizeCoverValue(coverValue);

    if (normalized === 'book.svg') {
        return 'book.svg';
    }

    try {
        const testKey = '__syntropy_cover_storage_test__';
        localStorage.setItem(testKey, normalized.slice(0, 1000));
        localStorage.removeItem(testKey);
        return normalized;
    } catch (error) {
        console.warn('표지 이미지를 저장할 수 없어 기본 이미지를 사용합니다.', error);
        return 'book.svg';
    }
};

const renderEditableDraftDetail = (draftBook) => {
    const content = document.querySelector('.book-detail-content');
    const coverPath = draftBook.cover || 'book.svg';
    const coverSrc = coverPath.startsWith('data:') ? coverPath : `../images/book-covers/${coverPath}`;

    content.innerHTML = `
        <form id="draft-book-form" class="book-detail-form" autocomplete="off">
            <input type="hidden" name="cover" value="${String(draftBook.cover || 'book.svg').replace(/"/g, '&quot;')}" />
            <div class="book-detail-form-cover-wrap">
                <label class="book-detail-cover-upload" for="book-cover-input" title="이미지 삽입">
                    <img class="book-detail-cover book-detail-cover--editable" id="book-detail-cover" src="${coverSrc}" alt="${String(draftBook.title || '도서 표지').replace(/"/g, '&quot;')} 책표지">
                </label>
                <input id="book-cover-input" type="file" accept="image/*" hidden>
            </div>

            <div class="book-detail-form-body">
                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-category">카테고리</label>
                    <select id="draft-category" name="category">
                        <option value="생명과학" ${draftBook.category === '생명과학' ? 'selected' : ''}>생명과학</option>
                        <option value="시스템 사고" ${draftBook.category === '시스템 사고' ? 'selected' : ''}>시스템 사고</option>
                        <option value="복잡계" ${draftBook.category === '복잡계' ? 'selected' : ''}>복잡계</option>
                        <option value="우주와 질서" ${draftBook.category === '우주와 질서' ? 'selected' : ''}>우주와 질서</option>
                        <option value="진화와 협력" ${draftBook.category === '진화와 협력' ? 'selected' : ''}>진화와 협력</option>
                        <option value="문명과 에너지" ${draftBook.category === '문명과 에너지' ? 'selected' : ''}>문명과 에너지</option>
                        <option value="생태철학" ${draftBook.category === '생태철학' ? 'selected' : ''}>생태철학</option>
                        <option value="철학" ${draftBook.category === '철학' ? 'selected' : ''}>철학</option>
                    </select>
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-title">책 제목</label>
                    <input id="draft-title" name="title" type="text" value="${String(draftBook.title || '').replace(/"/g, '&quot;')}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-author">지은이</label>
                    <input id="draft-author" name="author" type="text" value="${String(draftBook.author || '').replace(/"/g, '&quot;')}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-translator">옮긴이</label>
                    <input id="draft-translator" name="translator" type="text" value="${String(draftBook.translator || '없음').replace(/"/g, '&quot;')}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-publisher">출판사</label>
                    <input id="draft-publisher" name="publisher" type="text" value="${String(draftBook.publisher || '').replace(/"/g, '&quot;')}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-price">책값</label>
                    <input id="draft-price" name="price" type="number" min="0" step="100" value="${Number(draftBook.price || 0)}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-stock">재고</label>
                    <input id="draft-stock" name="stock" type="number" min="0" step="1" value="${Number(draftBook.stock || 0)}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-incomingDate">입고일</label>
                    <input id="draft-incomingDate" name="incomingDate" type="date" value="${draftBook.incomingDate ? draftBook.incomingDate.slice(0, 10) : ''}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-registeredAt">등록일</label>
                    <input id="draft-registeredAt" name="registeredAt" type="date" value="${draftBook.registeredAt ? draftBook.registeredAt.slice(0, 10) : ''}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-newUntil">신간 만료일</label>
                    <input id="draft-newUntil" name="newUntil" type="date" value="${draftBook.newUntil ? draftBook.newUntil.slice(0, 10) : ''}" />
                </div>

                <div class="book-detail-form-row">
                    <label class="book-detail-form-label" for="draft-classification">상태 분류</label>
                    <select id="draft-classification" name="classification">
                        <option value="구매중" ${String(draftBook.classification || '') === '구매중' ? 'selected' : ''}>구매중</option>
                        <option value="대기중" ${String(draftBook.classification || '') === '대기중' ? 'selected' : ''}>대기중</option>
                        <option value="신규책" ${String(draftBook.classification || '') === '신규책' ? 'selected' : ''}>신규책</option>
                        <option value="등록완료" ${String(draftBook.classification || '') === '등록완료' ? 'selected' : ''}>등록완료</option>
                        <option value="발송예정" ${String(draftBook.classification || '') === '발송예정' ? 'selected' : ''}>발송예정</option>
                        <option value="반품처리" ${String(draftBook.classification || '') === '반품처리' ? 'selected' : ''}>반품처리</option>
                        <option value="품절" ${String(draftBook.classification || '') === '품절' ? 'selected' : ''}>품절</option>
                    </select>
                </div>

                <div class="book-detail-form-row book-detail-form-row--full">
                    <label class="book-detail-form-label" for="draft-description">책 소개</label>
                    <textarea id="draft-description" name="description" rows="6">${String(draftBook.description || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</textarea>
                </div>

                <div class="book-detail-form-row book-detail-form-row--full">
                    <label class="book-detail-form-label" for="draft-preview">미리보기 문장</label>
                    <textarea id="draft-preview" name="preview" rows="2">${String(draftBook.preview || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</textarea>
                </div>
            </div>

            <div class="book-detail-form-actions">
                <button type="button" class="book-detail-action-btn book-detail-action-btn--secondary" data-action="save">임시 저장</button>
                <button type="button" class="admin-form-submit" data-action="publish">정식 등록하기</button>
                <a href="../admin/admin.html" class="book-detail-back-link">미등록 도서목록으로 가기</a>
            </div>
            <p id="book-detail-status" class="admin-login-status" aria-live="polite"></p>
        </form>
    `;

    const statusText = document.querySelector('#book-detail-status');
    const bookCoverInput = document.querySelector('#book-cover-input');
    if (bookCoverInput) {
        bookCoverInput.addEventListener('change', async (event) => {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }

            if (!file.type.startsWith('image/')) {
                if (statusText) {
                    statusText.textContent = '이미지 파일만 선택할 수 있습니다.';
                    statusText.style.color = '#a64242';
                }
                return;
            }

            try {
                const safeCover = await resizeCoverImage(file);
                const finalCover = safeSaveCoverValue(safeCover || file.name);
                const hiddenCover = document.querySelector('input[name="cover"]');
                const previewImage = document.querySelector('#book-detail-cover');

                if (hiddenCover) {
                    hiddenCover.value = finalCover;
                }
                if (previewImage) {
                    previewImage.src = finalCover.startsWith('data:image/') ? finalCover : `../images/book-covers/${finalCover || 'book.svg'}`;
                }

                if (statusText) {
                    statusText.textContent = '표지 이미지가 안전하게 반영되었습니다.';
                    statusText.style.color = '#2d6a4f';
                }
            } catch (error) {
                console.warn('이미지 업로드 처리 중 문제가 발생했습니다.', error);
                if (statusText) {
                    statusText.textContent = '이미지를 처리하지 못했습니다. 다른 이미지를 시도해 주세요.';
                    statusText.style.color = '#a64242';
                }
            }
        });
    }

    document.querySelectorAll('[data-action="save"]').forEach((button) => {
        button.addEventListener('click', () => {
            const values = readDraftFormValues(draftBook.id);
            if (!values) {
                return;
            }

            saveDraftFormState(draftBook.id, values);
            if (statusText) {
                statusText.textContent = '임시 저장되었습니다. 등록 대기 상태를 유지합니다.';
                statusText.style.color = '#2d6a4f';
            }
        });
    });

    document.querySelectorAll('[data-action="publish"]').forEach((button) => {
        button.addEventListener('click', () => {
            const values = readDraftFormValues(draftBook.id);
            if (!values) {
                return;
            }

            const draftToPublish = { ...draftBook, ...values };
            const missingFields = getMissingDraftFields(draftToPublish);

            if (missingFields.length) {
                if (statusText) {
                    statusText.textContent = `추가 입력이 필요합니다: ${missingFields.join(', ')}`;
                    statusText.style.color = '#a64242';
                }
                return;
            }

            const publishedBooks = getSavedBooks();
            const nextPublishedBooks = publishedBooks.filter((book) => book.title !== draftToPublish.title);
            const finalPublishedBook = {
                ...draftToPublish,
                classification: String(draftToPublish.classification || (Number(draftToPublish.stock || 0) === 0 ? BOOK_STATUS.SOLD_OUT : BOOK_STATUS.COMPLETE)).trim(),
                status: Number(draftToPublish.stock || 0) === 0 ? 'preorder' : 'published',
                incomingDate: String(draftToPublish.incomingDate || '').trim(),
                registeredAt: draftToPublish.registeredAt || new Date().toISOString(),
                newUntil: draftToPublish.newUntil || new Date(Date.now() + 30 * 86400000).toISOString(),
                price: Number(draftToPublish.price || 0),
                stock: Number(draftToPublish.stock || 0)
            };

            localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify([...nextPublishedBooks, finalPublishedBook]));
            localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(getSavedDrafts().filter((book) => book.id !== draftToPublish.id)));
            window.dispatchEvent(new CustomEvent('syntropyCatalogUpdated'));

            if (statusText) {
                statusText.textContent = '정식 등록되었습니다. 미등록 도서 목록에서 제외됩니다.';
                statusText.style.color = '#2d6a4f';
            }

            window.setTimeout(() => {
                window.location.href = '../admin/admin.html';
            }, 400);
        });
    });
};

const showBookDetail = () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('book') || '도서 소개';
    const isDraft = params.get('draft') === 'true';
    const draftBook = isDraft ? getSavedDrafts().find((book) => book.title === title) : null;

    if (isDraft && draftBook) {
        const categoryLink = document.querySelector('#book-detail-category-back');
        if (categoryLink) {
            categoryLink.href = '../admin/admin.html';
            categoryLink.textContent = '미등록 도서 목록으로 돌아가기';
        }
        document.title = `${title} | Syntropy Books`;
        const cover = document.querySelector('#book-detail-cover');
        const coverSrc = draftBook.cover && draftBook.cover.startsWith('data:') ? draftBook.cover : `../images/book-covers/${draftBook.cover || 'book.svg'}`;
        if (cover) {
            cover.src = coverSrc;
            cover.alt = `${title} 책표지`;
        }
        renderEditableDraftDetail(draftBook);
        return;
    }

    const book = draftBook || bookDetails[title] || {
        category: '도서 안내',
        author: 'Syntropy Books 큐레이션',
        translator: '',
        publisher: 'Syntropy Books 큐레이션',
        price: '문의 예정',
        description: '현재 이 책의 상세 소개를 준비 중입니다. 잠시 후 더 풍부한 정보를 확인하실 수 있습니다.',
        preview: '좋은 책은 아직 완성된 문장보다, 곧 열릴 여백을 더 많이 남긴다.',
        cover: 'category-book.svg'
    };

    const categoryLink = document.querySelector('#book-detail-category-back');
    const categoryPage = categoryPageByName[book.category];
    if (categoryLink) {
        categoryLink.href = categoryPage ? `../books/${categoryPage}` : 'books.html';
        categoryLink.textContent = book.category === '도서 안내' ? '도서 목록으로 돌아가기' : `${book.category} 카테고리로 돌아가기`;
    }

    document.title = `${title} | Syntropy Books`;
    document.querySelector('#book-detail-title').textContent = title;
    document.querySelector('#book-detail-category').textContent = book.category || '미분류';
    document.querySelector('#book-detail-author').textContent = book.author || '미상';
    document.querySelector('#book-detail-translator').textContent = book.translator ? `옮긴이: ${book.translator}` : '옮긴이: 정보 없음';
    document.querySelector('#book-detail-publisher').textContent = `출판사: ${book.publisher || '미기재'}`;
    const catalogData = typeof getCatalogBookData === 'function' ? getCatalogBookData(title) : null;
    document.querySelector('#book-detail-price').textContent = `책값: ${catalogData ? formatCatalogPrice(catalogData.price) : (book.price || '미기재')}`;
    document.querySelector('#book-detail-stock').textContent = catalogData ? `재고: ${catalogData.stock}권` : `재고: ${book.stock || 0}권`;
    document.querySelector('#book-detail-incoming').textContent = `입고일: ${book.incomingDate ? formatCatalogDate(book.incomingDate) : '미기재'}`;
    document.querySelector('#book-detail-registered').textContent = catalogData ? `등록일: ${formatCatalogDate(catalogData.registeredAt)}` : `등록일: ${book.registeredAt ? formatCatalogDate(book.registeredAt) : '미기재'}`;
    document.querySelector('#book-detail-new-until').textContent = catalogData ? `신간 만료일: ${formatCatalogDate(catalogData.newUntil)}` : `신간 만료일: ${book.newUntil ? formatCatalogDate(book.newUntil) : '미기재'}`;
    document.querySelector('#book-detail-classification').textContent = `상태 분류: ${book.classification || (Number(book.stock || 0) === 0 ? BOOK_STATUS.SOLD_OUT : BOOK_STATUS.COMPLETE)}`;
    document.querySelector('#book-detail-description').textContent = book.description || '책 소개가 아직 입력되지 않았습니다.';
    document.querySelector('#book-detail-preview').textContent = `“${book.preview || '새로운 책의 이야기는 아직 완성되지 않았습니다.'}”`;
    const cover = document.querySelector('#book-detail-cover');
    cover.src = `../images/book-covers/${book.cover || 'book.svg'}`;
    cover.alt = `${title} 책표지`;

    const statusText = document.querySelector('#book-detail-status');
    const publishButton = document.querySelector('#book-publish-btn');
    if (isDraft) {
        const requiredFields = [book.title, book.author, book.category, book.publisher, book.description];
        const completionReady = requiredFields.every((field) => String(field || '').trim().length > 0);
        if (publishButton) {
            publishButton.hidden = !completionReady;
            publishButton.disabled = !completionReady;
            publishButton.textContent = completionReady ? '정식 등록하기' : '필수 정보 입력 전';
        }
        if (statusText) {
            statusText.textContent = completionReady
                ? '필수 소개 정보가 모두 채워져 정식 등록이 가능합니다.'
                : '임시 등록 상태입니다. 책 소개 정보가 모두 채워지면 정식 등록됩니다.';
            statusText.style.color = completionReady ? '#2d6a4f' : '#7b5d3c';
        }
        if (completionReady && publishButton) {
            publishButton.onclick = () => finalizeDraftBook(draftBook);
        }
    } else {
        if (publishButton) {
            publishButton.hidden = true;
        }
        if (statusText) {
            statusText.textContent = '';
        }
    }
};

document.addEventListener('DOMContentLoaded', showBookDetail);
