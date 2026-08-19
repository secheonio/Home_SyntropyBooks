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

const addCategoryBookLinks = () => {
    const categorySlug = categorySlugByPath[window.location.pathname.split('/').pop()];
    if (!categorySlug) {
        return;
    }

    const selectedBook = new URLSearchParams(window.location.search).get('book');
    const categoryBooks = document.querySelector('.category-books');
    if (selectedBook && categoryBooks) {
        const selectedCard = [...categoryBooks.querySelectorAll('.category-book')].find((card) => {
            return card.querySelector('h2')?.textContent.trim() === selectedBook;
        });

        if (selectedCard) {
            categoryBooks.prepend(selectedCard);
        }
    }

    document.querySelectorAll('.category-book').forEach((card) => {
        const title = card.querySelector('h2')?.textContent.trim();
        if (!title) {
            return;
        }

        const linkGroup = document.createElement('div');
        linkGroup.className = 'category-book-link-group';

        const bookListLink = document.createElement('a');
        bookListLink.className = 'category-book-full-link';
        bookListLink.href = `books.html#${categorySlug}`;
        const categoryLabel = document.querySelector('.category-page .main-title')?.textContent.trim() || categorySlug;
        bookListLink.textContent = `${categoryLabel} 전체보기 >>`;
        bookListLink.setAttribute('aria-label', `${title} 도서목록 전체보기`);

        const newBookLink = document.createElement('a');
        newBookLink.className = 'category-book-new-link';
        newBookLink.href = `books-new.html#${categorySlug}`;
        newBookLink.textContent = '신간 전체보기 >>';
        newBookLink.setAttribute('aria-label', `${title} 신간도서코너 전체보기`);

        linkGroup.append(bookListLink, newBookLink);
        card.append(linkGroup);

        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                return;
            }

            window.location.href = `book-detail.html?book=${encodeURIComponent(title)}`;
        });
    });
};

document.addEventListener('DOMContentLoaded', addCategoryBookLinks);
