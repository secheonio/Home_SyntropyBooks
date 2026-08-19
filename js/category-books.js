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

const reflowCategoryBooks = () => {
    const categoryBooks = document.querySelector('.category-books');
    if (!categoryBooks) {
        return;
    }

    categoryBooks.style.display = 'grid';
    categoryBooks.style.gridTemplateColumns = 'repeat(4, minmax(0, 1fr))';
    categoryBooks.style.gridAutoFlow = 'row';
    categoryBooks.style.alignContent = 'start';
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

    reflowCategoryBooks();

    document.querySelectorAll('.category-book').forEach((card) => {
        const title = card.querySelector('h2')?.textContent.trim();
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

document.addEventListener('DOMContentLoaded', addCategoryBookLinks);
