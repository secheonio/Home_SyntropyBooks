const getMainPageUrl = () => new URL('../index.html', window.location.href).toString();

const STORAGE_KEY = 'syntropyBooksCatalog';
const defaultBooks = [
    { title: '통합적 사고', author: '시스템 사고', category: '시스템 사고', publisher: 'Syntropy Books', description: '질서와 관계를 보는 사고의 방향을 제시합니다.' },
    { title: '생태학의 미래', author: '환경 철학', category: '생태철학', publisher: 'Syntropy Books', description: '생태와 인간 사회의 미래를 함께 생각합니다.' },
    { title: '우주와 시간', author: '우주론', category: '우주와 질서', publisher: 'Syntropy Books', description: '우주를 이해하는 시선과 시간의 의미를 탐색합니다.' },
    { title: '인간과 진화', author: '진화사', category: '진화와 협력', publisher: 'Syntropy Books', description: '진화와 협력의 관계를 통해 인간의 역할을 조명합니다.' }
];

const generateBookId = () => `book-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const normalizeBooks = (books) => books.map((book, index) => ({
    ...book,
    id: book.id || `book-${Date.now()}-${index}-${Math.random().toString(16).slice(2, 8)}`,
    title: String(book.title || '').trim(),
    author: String(book.author || '').trim(),
    category: String(book.category || '').trim(),
    publisher: String(book.publisher || '').trim(),
    description: String(book.description || '').trim()
}));

const getBooksFromStorage = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        if (Array.isArray(stored) && stored.length > 0) {
            const normalized = normalizeBooks(stored);
            if (JSON.stringify(normalized) !== JSON.stringify(stored)) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
            }
            return normalized;
        }
    } catch (error) {
        console.warn('도서 저장소를 불러오지 못했습니다.', error);
    }

    const initialBooks = normalizeBooks(defaultBooks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
    return initialBooks;
};

const saveBooksToStorage = (books) => {
    const normalized = normalizeBooks(books);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
};

const getBookById = (books, bookId) => books.find((book) => book.id === bookId);

const updateAdminStats = (books) => {
    const totalBooks = books.length;
    const categories = new Set(books.map((book) => book.category).filter(Boolean));
    const newBooksCount = books.filter((book) => book.category === '신간 도서 코너').length;

    const totalBooksElement = document.querySelector('[data-stat="total-books"]');
    const newBooksElement = document.querySelector('[data-stat="new-books"]');
    const categoriesElement = document.querySelector('[data-stat="categories"]');

    if (totalBooksElement) totalBooksElement.textContent = `${totalBooks}권`;
    if (newBooksElement) newBooksElement.textContent = `${newBooksCount}권`;
    if (categoriesElement) categoriesElement.textContent = `${categories.size}개`;
};

const attachAdminBookActions = (list) => {
    list.querySelectorAll('[data-role="edit"]').forEach((button) => {
        button.addEventListener('click', () => {
            const books = getBooksFromStorage();
            const targetBook = getBookById(books, button.dataset.bookId);
            if (targetBook) {
                openBookForm(targetBook);
            }
        });
    });

    list.querySelectorAll('[data-role="delete"]').forEach((button) => {
        button.addEventListener('click', () => {
            const books = getBooksFromStorage();
            const targetBook = getBookById(books, button.dataset.bookId);
            if (!targetBook) {
                return;
            }

            const confirmed = window.confirm(`"${targetBook.title}" 도서를 삭제하시겠습니까?`);
            if (!confirmed) {
                return;
            }

            const nextBooks = books.filter((book) => book.id !== targetBook.id);
            saveBooksToStorage(nextBooks);
            renderAdminBooks();
            window.dispatchEvent(new CustomEvent('syntropyCatalogUpdated'));
        });
    });
};

const renderAdminBooks = () => {
    const books = getBooksFromStorage();
    const list = document.querySelector('#admin-book-list');
    if (!list) {
        return;
    }

    list.innerHTML = books
        .slice()
        .reverse()
        .map((book) => `
            <div class="admin-book-row">
                <span>${book.title}</span>
                <span>${book.category}</span>
                <span>${book.author}</span>
                <div class="admin-book-actions">
                    <button type="button" class="admin-book-action-btn" data-role="edit" data-book-id="${book.id}">수정</button>
                    <button type="button" class="admin-book-action-btn danger" data-role="delete" data-book-id="${book.id}">삭제</button>
                </div>
            </div>
        `)
        .join('');

    attachAdminBookActions(list);
    updateAdminStats(books);
};

const openBookForm = (book = null) => {
    const modal = document.querySelector('#book-form-modal');
    const form = document.querySelector('#book-form');
    if (!modal || !form) {
        return;
    }

    modal.hidden = false;
    form.reset();
    const status = document.querySelector('#book-form-status');
    if (status) {
        status.textContent = '';
    }

    if (book) {
        form.dataset.bookId = book.id;
        form.querySelector('#book-title').value = book.title;
        form.querySelector('#book-author').value = book.author;
        form.querySelector('#book-category').value = book.category;
        form.querySelector('#book-publisher').value = book.publisher;
        form.querySelector('#book-description').value = book.description;
    } else {
        delete form.dataset.bookId;
    }

    setTimeout(() => document.querySelector('#book-title')?.focus(), 50);
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
    }
};

const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.querySelector('#book-form-status');
    const formData = new FormData(form);

    const newBook = {
        title: String(formData.get('title') || '').trim(),
        author: String(formData.get('author') || '').trim(),
        category: String(formData.get('category') || '').trim(),
        publisher: String(formData.get('publisher') || '').trim(),
        description: String(formData.get('description') || '').trim()
    };

    if (!newBook.title || !newBook.author || !newBook.category || !newBook.publisher || !newBook.description) {
        if (status) {
            status.textContent = '모든 항목을 입력해 주세요.';
            status.style.color = '#a64242';
        }
        return;
    }

    const books = getBooksFromStorage();
    const existingBookId = form.dataset.bookId;
    const updatedBooks = existingBookId
        ? books.map((book) => book.id === existingBookId ? { ...book, ...newBook, id: existingBookId } : book)
        : [...books, { ...newBook, id: generateBookId() }];

    saveBooksToStorage(updatedBooks);
    renderAdminBooks();
    window.dispatchEvent(new CustomEvent('syntropyCatalogUpdated'));
    closeBookForm();
    if (status) {
        status.textContent = '';
    }
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
    addBookButton?.addEventListener('click', () => openBookForm());

    document.querySelectorAll('[data-close-book-form]').forEach((element) => {
        element.addEventListener('click', closeBookForm);
    });

    document.querySelector('#book-form')?.addEventListener('submit', handleBookSubmit);
    renderAdminBooks();
};

document.addEventListener('DOMContentLoaded', protectAdminPage);
