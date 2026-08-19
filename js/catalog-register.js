const catalogCategoryLabels = {
    'life-science': '생명과학',
    'systems-thinking': '시스템 사고',
    complexity: '복잡계',
    cosmos: '우주와 질서',
    evolution: '진화와 협력',
    energy: '문명과 에너지',
    ecology: '생태철학',
    philosophy: '철학'
};

const catalogCoverNames = {
    'life-science': 'life-science.svg',
    'systems-thinking': 'systems-thinking.svg',
    complexity: 'complexity.svg',
    cosmos: 'cosmos.svg',
    evolution: 'evolution.svg',
    energy: 'energy.svg',
    ecology: 'ecology.svg',
    philosophy: 'philosophy.svg'
};

const renderCatalog = () => {
    const body = document.querySelector('#catalog-table-body');
    if (!body || typeof categoryBooks === 'undefined') return;

    Object.entries(categoryBooks).forEach(([category, books]) => {
        books.forEach((book) => {
            const metadata = typeof categoryBookMetadata !== 'undefined' ? categoryBookMetadata[book.title] : null;
            const catalog = getCatalogBookData(book.title);
            const row = document.createElement('tr');
            const translator = metadata?.translator || '';
            const publisher = metadata?.publisher || 'Syntropy Books 큐레이션';
            row.innerHTML = `
                <td><img class="catalog-cover" src="../images/book-covers/${catalogCoverNames[category]}" alt="${book.title} 표지"></td>
                <td><span class="catalog-category catalog-category-${category}">${catalogCategoryLabels[category]}</span></td>
                <td><strong>${book.title}</strong><small>저자: ${book.author}</small><small>${translator ? `옮긴이: ${translator}` : '옮긴이: 없음'}</small><small>출판사: ${publisher}</small></td>
                <td><small>책값: ${formatCatalogPrice(catalog.price)}</small><small>재고: ${catalog.stock}권</small></td>
                <td><small>등록일: ${formatCatalogDate(catalog.registeredAt)}</small><small>신간 만료일: ${formatCatalogDate(catalog.newUntil)}</small><strong class="catalog-new-status">${catalog.isNew ? '신간' : '일반 도서'}</strong></td>
                <td class="catalog-description">${book.description}</td>`;
            body.append(row);
        });
    });
};

document.addEventListener('DOMContentLoaded', renderCatalog);
