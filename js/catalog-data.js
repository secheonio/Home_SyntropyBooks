const catalogPrices = {
    '생명이란 무엇인가': 18000,
    '다윈의 위험한 생각': 22000,
    '생명의 그물': 20000,
    '시스템 사고': 24000,
    '카오스': 18000,
    '복잡계 개론': 15000,
    '코스모스': 22000,
    '시간의 역사': 18000,
    '이기적 유전자': 20000,
    '협력의 진화': 19000,
    '엔트로피': 18000,
    '에너지와 문명': 28000,
    '오래된 미래': 15000,
    '침묵의 봄': 16000,
    '장자': 14000,
    '스피노자 철학': 18000,
    '자연과 자유': 15000
};

const getCatalogBookData = (title) => {
    let hash = 0;
    for (const character of title) {
        hash = (hash * 31 + character.codePointAt(0)) % 100000;
    }

    const daysAgo = hash % 30;
    const registeredAt = new Date();
    registeredAt.setHours(0, 0, 0, 0);
    registeredAt.setDate(registeredAt.getDate() - daysAgo);

    const newUntil = new Date(registeredAt);
    newUntil.setDate(newUntil.getDate() + 14);

    return {
        price: catalogPrices[title] || 15000,
        stock: (hash % 10) + 1,
        registeredAt,
        newUntil,
        isNew: new Date() < newUntil
    };
};

const formatCatalogDate = (date) => date.toLocaleDateString('ko-KR');
const formatCatalogPrice = (price) => `${price.toLocaleString('ko-KR')}원`;

const addCatalogFields = (card, title) => {
    const metadata = getCatalogBookData(title);
    const publisher = card.querySelector('.book-publisher');
    if (!publisher) {
        return;
    }

    ['book-price', 'book-stock', 'book-registered', 'book-new-until'].forEach((className) => {
        if (!card.querySelector(`.${className}`)) {
            const field = document.createElement('p');
            field.className = className;
            publisher.after(field);
        }
    });

    card.querySelector('.book-price').textContent = `책값: ${formatCatalogPrice(metadata.price)}`;
    card.querySelector('.book-stock').textContent = `재고: ${metadata.stock}권`;
    card.querySelector('.book-registered').textContent = `등록일: ${formatCatalogDate(metadata.registeredAt)}`;
    card.querySelector('.book-new-until').textContent = `신간 만료일: ${formatCatalogDate(metadata.newUntil)}`;
};
