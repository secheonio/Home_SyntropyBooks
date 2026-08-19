const categoryBookMetadata = {
    '생명이란 무엇인가': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '생명의 그물': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '다윈의 위험한 생각': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '시스템 사고': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '전체를 보는 방법': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '카오스': { translator: '박배식', publisher: '승산' },
    '복잡계 개론': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '세상을 바꾼 17가지 방정식': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '코스모스': { translator: '홍승수', publisher: '사이언스북스' },
    '시간의 역사': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '창백한 푸른 점': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '이기적 유전자': { translator: '홍영남, 이상임', publisher: '을유문화사' },
    '협력의 진화': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '생명체의 협력': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '엔트로피': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '에너지와 문명': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '지속 가능한 에너지': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '오래된 미래': { translator: '김태언', publisher: '중앙북스' },
    '침묵의 봄': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '숲은 생각한다': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '장자': { translator: '김학주', publisher: '을유문화사' },
    '스피노자 철학': { translator: '', publisher: 'Syntropy Books 큐레이션' },
    '자연과 자유': { translator: '', publisher: 'Syntropy Books 큐레이션' }
};

const addCategoryBookMetadata = () => {
    document.querySelectorAll('.category-book').forEach((card) => {
        const title = card.querySelector('h2')?.textContent.trim();
        const author = card.querySelector('.book-author');
        const metadata = categoryBookMetadata[title] || {
            translator: '',
            publisher: 'Syntropy Books 큐레이션'
        };

        if (!author) {
            return;
        }

        const categoryTop = document.createElement('div');
        categoryTop.className = 'category-book-top';
        categoryTop.innerHTML = `<span class="book-category">${document.querySelector('.category-page .main-title')?.textContent.trim() || ''}</span><span class="book-new-badge">신간</span>`;
        card.prepend(categoryTop);

        const translator = document.createElement('p');
        translator.className = 'category-book-translator';
        translator.textContent = metadata.translator ? `옮긴이: ${metadata.translator}` : '';
        translator.hidden = !metadata.translator;

        const publisher = document.createElement('p');
        publisher.className = 'category-book-publisher';
        publisher.textContent = `출판사: ${metadata.publisher}`;

        author.insertAdjacentElement('afterend', translator);
        translator.insertAdjacentElement('afterend', publisher);
        if (typeof addCatalogFields === 'function') {
            addCatalogFields(card, title);
            categoryTop.querySelector('.book-new-badge').classList.toggle('is-hidden', !getCatalogBookData(title).isNew);
        }
    });
};

document.addEventListener('DOMContentLoaded', addCategoryBookMetadata);
