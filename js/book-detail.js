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

const showBookDetail = () => {
    const title = new URLSearchParams(window.location.search).get('book');
    const book = bookDetails[title];
    if (!book) return;

    document.title = `${title} | Syntropy Books`;
    document.querySelector('#book-detail-title').textContent = title;
    document.querySelector('#book-detail-category').textContent = book.category;
    document.querySelector('#book-detail-author').textContent = book.author;
    document.querySelector('#book-detail-translator').textContent = book.translator ? `옮긴이: ${book.translator}` : '';
    document.querySelector('#book-detail-publisher').textContent = `출판사: ${book.publisher}`;
    const catalogData = typeof getCatalogBookData === 'function' ? getCatalogBookData(title) : null;
    document.querySelector('#book-detail-price').textContent = `책값: ${catalogData ? formatCatalogPrice(catalogData.price) : book.price}`;
    document.querySelector('#book-detail-stock').textContent = catalogData ? `재고: ${catalogData.stock}권` : '';
    document.querySelector('#book-detail-registered').textContent = catalogData ? `등록일: ${formatCatalogDate(catalogData.registeredAt)}` : '';
    document.querySelector('#book-detail-new-until').textContent = catalogData ? `신간 만료일: ${formatCatalogDate(catalogData.newUntil)}` : '';
    document.querySelector('#book-detail-description').textContent = book.description;
    document.querySelector('#book-detail-preview').textContent = `“${book.preview}”`;
    const cover = document.querySelector('#book-detail-cover');
    cover.src = `../images/book-covers/${book.cover}`;
    cover.alt = `${title} 책표지`;
};

document.addEventListener('DOMContentLoaded', showBookDetail);
