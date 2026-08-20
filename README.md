# Home_NetropyBooks
Home_NetropyBooks 폴더와 같으면 관리하기 편리

홈페이지 작업

현재 페이지 구조
- `index.html` : 홈페이지 시작 화면
- `about/` : 책방 소개, 책방 철학, 이용 안내
- `books/` : 도서 목록, 신간 도서 코너
- `contact/` : 오시는 길
- `css/` : 공통 및 페이지별 스타일시트
- `images/` : 로고 및 이미지 파일

- VS Code 설치
- Git 설치
- GitHub 계정 가입
- VS Code 실행

Git 연동 기본 명령
    git add .
    git commit -m "변경 내용"
    git push origin main

한 줄로 실행하기
    git add . && git commit -m "도서 목록 페이지 추가" && git push origin main

PowerShell에서 자주 쓰는 함수
    function push { git add . ; git commit -m $args ; git push origin main }
    push "변경 내용"


id, category, title, author, translator, publisher, cover, price, stock,description, preview, barcode, isbn, qrcode, incomingDate, registeredAt, newUntil, status, note

ID,카테고리,제목,저자,옮긴이,출판사,표지,가격,재고,책소개,안내글,바코드,ISBN,QR,입고일,등록일,만료일,상태,비고

홈페이지 작업
- open folder 클릭 – 홈페이지 루트폴더
- NewPPage 만들기 : init.html

<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>NetropyBooks의 홈페이지</title>
    </head>
    <body>
        <h1>안녕하세요? NetropyBooks의 홈페이지에 오신 것을 환영합니다.</h1>
        <p>VS Code로 제작하였습니다.</p>
    </body>
</html>

파일저장 : Ctrl + S
    (파일 이름 옆에 있던 동그란 점이 사라지면 저장 완료입니다.)

파일(홈페이지 시작화면)확인 : 탐색기 작업폴더에서 init.html 더블클릭.
    크롬등 브라우저에서 열림 확인.

==========================
다음 단계 ; '깃허브와 이 코드를 연결해서 인터넷에 올리기'
==============================
1. VScode 터미널 열기 ; 상단 메뉴
2. 1단계: Git에 내 이름과 이메일 등록하기
    git config --global user.email "secheonio@gmail.com"
    git config --global user.name "secheonio"
3.2단계: 깃허브(GitHub)에서 코드 저장소(Repository) 만들기
    이제 인터넷상에 내 코드를 담을 '온라인 주머니'를 만들 차례입니다.
    인터넷 창을 열고 GitHub 홈페이지에 로그인합니다.
    오른쪽 위의 [+] 아이콘을 누르고 [New repository]를 클릭합니다.
    Repository name 칸에 Home_NetropyBooks 라고 적습니다. (지금 우리 폴더 이름과 똑같이 맞추면 관리하기 편합니다.)
    아래 옵션에서 [Public]에 체크가 되어 있는지 확인합니다.
    페이지 맨 아래의 초록색 [Create repository] 버튼을 클릭합니다!

깃허브 저장소 주소 확인하는 법
    내 저장소 페이지로 이동: 깃허브 화면 왼쪽 사이드바나 위쪽 메뉴에서 방금 만드신 Home_NetropyBooks 라는 글자를 클릭해 보세요.
    주소 확인: 그 페이지로 이동하면, 화면 중앙이나 오른쪽에 [Code] 라고 적힌 초록색 버튼이 보일 겁니다. 그 버튼을 살짝 클릭해 보세요.
    주소 복사: 버튼을 누르면 아래로 창이 하나 내려오는데, 거기에 [https://github.com/secheonio/Home_NetropyBooks.git](https://github.com/secheonio/Home_NetropyBooks.git) 이라고 적힌 주소가 나타납니다. 그 옆의 작은 아이콘(클립보드 모양)을 누르면 복사 완료입니다!

    PS C:\Users\user\OneDrive\문서\Home_NetropyBooks> git init 
            '"이 폴더는 이제부터 내 컴퓨터의 개인 작업실이야"라고 선언"

    PS C:\Users\user\OneDrive\문서\Home_NetropyBooks> git remote add origine https://github.com/secheonio/Home_NetropyBooks.git
            '"내 작업실과 인터넷의 깃허브 주머니를 실로 연결해!"라고 명령
    PS C:\Users\user\OneDrive\문서\Home_NetropyBooks> git remote -v
        origine https://github.com/secheonio/Home_NetropyBooks.git (fetch)
        origine https://github.com/secheonio/Home_NetropyBooks.git (push)
    PS C:\Users\user\OneDrive\문서\Home_NetropyBooks> 

4. 3단계: 코드 전송(Push)하기
    git add .   '파일을 전송할 준비
    git commit -m "first commit"    '파일에 "첫 번째 버전"이라는 이름을 붙여 기록합니다:
    git push -u origin main     '인터넷 깃허브로 파일을 쏘아 올립니다:
        1단계: git branch -M main   '브랜치 이름을 확실하게 'main'으로 만들기
            최신 Git 프로그램은 기본 브랜치 이름이 master로 되어 있어서 main을 찾지 못할 때가 있습니다. 확실하게 main으로 이름을 지정해 줍니다.
        2단계: 파일들을 담을 주머니 만들기 (Add & Commit)
              git add .    '
              git commit -m "first commit"  
            아직 컴퓨터가 "어떤 파일을 올릴지" 확정을 짓지 않아서 그렇습니다. 파일을 담고 기록을 남겨줍니다.
        3단계: git push -u origin main  '다시 깃허브로 쏘아 올리기 (Push)
            '이제 준비가 완료되었으니 다시 한번 멋지게 전송해 봅니다!
    
    원격 저장소 다시 연결하기
        1단계: 연결고리 다시 묶기 (원격 주소 재지정)
            git remote add origin https://github.com/secheonio/Home_NetropyBooks.git
            아까 깃허브에서 복사했던 그 주소를 다시 내 컴퓨터에 등록해 줍니다. 아래 명령어를 그대로 복사해서 엔터를 쳐주세요.
        2단계: 연결이 잘 되었는지 확인하기
            git remote -v
        
    (강제 통합 및 업로드)
    현재 깃허브에 있는 내용과 내 컴퓨터의 내용을 안전하게 하나로 합쳐주는 마법의 명령어입니다. VS Code 터미널에 아래 순서대로 입력해 주세요.
        1. 깃허브에 있는 원격 내용을 내 컴퓨터로 가져와서 합치기:
        2. 이제 다시 깃허브로 당당하게 쏘아 올리기! (Push):

    Vim 화면에서 빠져나오는 법 (마법의 주문)
        키보드에서 아무리 글자를 치려고 해도 잘 안 되고 화면만 이상하게 변해서 놀라셨을 겁니다. 순서대로 차근차근 따라 해 보세요.
            키보드 왼쪽 위에 있는 Esc ( ESCAPE ) 키를 꾹 눌러줍니다. (입력 모드에서 탈출하는 명령입니다.)
            이어서 키보드에서 콜론과 알파벳을 순서대로 누릅니다. 콜론(:)을 누르면 화면 맨 아래쪽에 커서가 가면서 : 기호가 뜰 겁니다.
            그 상태에서 바로 이어서 wq 라고 입력합니다.w는 저장(Write), q는 나가기(Quit)를 의미합니다. 즉, "기록을 저장하고 이 창을 닫아라!"라는 뜻입니다.
            마지막으로 키보드 Enter (엔터)를 칩니다!

🎉 이제 무엇을 하면 될까요?
    지금 방금 올린 코드가 인터넷상에 아주 잘 저장되었으니, 이제 깃허브의 'GitHub Pages' 기능을 켜서 이 파일을 전 세계 누구나 볼 수 있는 진짜 웹사이트 주소로 만들어 볼 차례입니다.
    아까 살짝 말씀드렸던 순서대로 최종 배포를 마무리해 볼까요?
        인터넷 브라우저로 GitHub 홈페이지에 접속한 뒤, 내 저장소인 Home_NetropyBooks로 들어갑니다.
        페이지 상단 메뉴 중 [Settings(설정)] (톱니바퀴 아이콘)을 클릭합니다.
        왼쪽 사이드바 메뉴에서 [Pages] 항목을 클릭합니다.
        Build and deployment 섹션의 Source가 "Deploy from a branch"로 되어 있는지 확인하고, 바로 아래 Branch를 None에서 main으로 바꾼 뒤 [Save(저장)] 버튼을 누릅니다.
    1~2분 정도 기다린 후, 이 [Pages] 설정 화면 맨 위를 새로고침해 보시면 Your site is live at...이라는 문구와 함께 나만의 멋진 웹사이트 주소(URL)가 나타날 것입니다!

💡 홈페이지 주소 바로 찾기 (지금 화면 기준)
    보내주신 스크린샷 화면 오른쪽 아래를 보시면 [Deployments] 라는 항목이 보이시나요?
    그 아래에 github-pages 라고 적힌 초록색 체크 표시가 있습니다. 그걸 클릭해 보세요!
    클릭하면 [Active] 라고 적힌 링크가 보이거나, 바로 [View deployment] 라는 버튼이 나타날 겁니다.
    그 [View deployment] 버튼을 클릭하시면, 바로 여러분이 만드신 홈페이지로 연결됩니다!

💡 만약 [About] 영역에 주소를 직접 등록하고 싶으시다면?
    방금 보신 About 영역에 지구본 아이콘이 없는 이유는 아직 깃허브에게 "이 저장소는 홈페이지로 쓸 거야"라고 주소를 직접 입력해주지 않았기 때문입니다. 예쁘게 등록해 볼까요?
    [About] 이라는 글자 바로 옆에 있는 작은 톱니바퀴 아이콘(Edit)을 클릭합니다.
    팝업창이 뜨면 [Website] 라고 적힌 칸이 보이실 거예요.
    거기에 방금 확인하신 여러분의 홈페이지 주소(예: [https://secheonio.github.io/Home_NetropyBooks/](https://secheonio.github.io/Home_NetropyBooks/))를 복사해서 붙여넣고 [Save changes] 버튼을 누릅니다.
    이제부터는 말씀드렸던 대로 [About] 영역에 지구본 모양 아이콘과 함께 홈페이지 주소가 항상 고정되어 나타나게 됩니다.

정말 잘하셨습니다! 이제 클릭 한 번으로 나만의 웹사이트를 확인할 수 있게 되었습니다.

====================================
배포용 설명서: GitHub Pages로 공개하기
====================================

이 프로젝트는 정적 HTML/CSS/JavaScript로 구성된 책방 홈페이지입니다.
브라우저에서 바로 열 수 있지만, 인터넷에 공개하려면 GitHub Pages를 통해 배포하면 됩니다.

1. 저장소 준비하기
    - GitHub에 로그인합니다.
    - 오른쪽 위 [+] 버튼을 누르고 [New repository]를 선택합니다.
    - 저장소 이름을 예시로 Home_NetropyBooks 로 만듭니다.
    - Public 옵션을 선택합니다.
    - [Create repository]를 누릅니다.

2. 로컬 프로젝트와 연결하기
    터미널에서 현재 프로젝트 폴더로 이동한 뒤 아래 명령을 실행합니다.

    git init
    git branch -M main
    git remote add origin https://github.com/본인아이디/Home_NetropyBooks.git
    git remote -v

    참고:
    - 본인아이디 부분은 GitHub 아이디로 바꿔서 입력합니다.
    - 저장소 주소는 GitHub 저장소의 Code 버튼에서 확인할 수 있습니다.

3. 파일 업로드하기
    git add .
    git commit -m "first commit"
    git push -u origin main

    만약 커밋 메시지가 잘 안 먹거나 브랜치 문제가 있으면 아래처럼 다시 시도합니다.
    git branch -M main
    git push -u origin main

4. GitHub Pages 설정하기
    - GitHub 저장소 페이지로 이동합니다.
    - [Settings] 메뉴를 클릭합니다.
    - 왼쪽 메뉴에서 [Pages]를 선택합니다.
    - Source 항목에서 [Deploy from a branch]를 선택합니다.
    - Branch에서 main을 선택합니다.
    - 폴더는 보통 /root 를 선택합니다.
    - [Save] 버튼을 누릅니다.

5. 배포 완료 확인
    1~2분 정도 기다린 뒤 페이지를 새로고침합니다.
    화면 상단에 Your site is live at ... 문구가 보이면 배포가 완료된 것입니다.

    공개 주소 예시:
    https://본인아이디.github.io/Home_NetropyBooks/

6. 홈페이지 주소 등록하기
    저장소 페이지에서 [About] 섹션에 들어가서
    [Website] 항목이 있다면 방금 생성한 GitHub Pages 주소를 넣어두면 좋습니다.

    예:
    https://secheonio.github.io/Home_NetropyBooks/

7. 프로젝트를 운영할 때 유의할 점
    - 이 사이트는 정적 페이지라서 서버 없이 GitHub Pages로 바로 배포됩니다.
    - 관리자 로그인은 브라우저의 sessionStorage를 사용하므로, 새로고침 또는 다른 브라우저 환경에서는 다시 로그인해야 할 수 있습니다.
    - 도서 목록과 신간 도서 코너의 데이터는 localStorage를 사용하므로, 브라우저 저장소가 비워지면 등록된 내용이 사라질 수 있습니다.
    - 실제 서비스용으로 오래 유지하려면 서버 기반 DB 저장 방식으로 전환하는 것이 더 안정적입니다.

8. 배포 전 체크리스트
    - [ ] index.html 이 정상적으로 존재하는가
    - [ ] 모든 링크 경로가 올바른가
    - [ ] 이미지 경로가 깨지지 않았는가
    - [ ] admin 페이지 진입이 가능한가
    - [ ] 관리자 로그인 정보가 정상인가
    - [ ] GitHub Pages 주소가 정상적으로 표시되는가

배포 환경에서 가장 중요한 점은 이 프로젝트가 정적 웹사이트라는 것입니다.
즉, 서버 설치 없이도 GitHub Pages에서 그대로 운영할 수 있으며,
관리자 기능은 브라우저 안에서 동작하는 방식으로 구성되어 있습니다.

이제 본인 저장소에 업로드 후 GitHub Pages를 켜면,
웹사이트를 인터넷에서 바로 확인할 수 있습니다.

====================================
프로젝트 완료 현황
====================================

현재 이 프로젝트는 다음 기능까지 구현되어 있습니다.

- 홈페이지 메인 페이지 구성
- 책방 소개 / 도서 관리 / 오시는 길 페이지 구성
- 도서 목록 페이지와 신간 도서 코너 페이지 구성
- 좌측 메뉴 하위 항목 구조 정리
- 관리자 로그인 기능
- 관리자 전용 대시보드
- 도서 추가 / 수정 / 삭제 기능
- localStorage 기반 데이터 저장
- 페이지 간 동기화 기능
- GitHub Pages 배포 설명서 정리

주요 관리자 정보
    관리자 아이디: 관리자
    비밀번호: scipark

운영상 주의점
    - 저장소는 정적 페이지라서 GitHub Pages에서 바로 호스팅됩니다.
    - 관리자 로그아웃 상태와 도서 데이터는 브라우저 로컬 저장소에 저장됩니다.
    - 다른 브라우저나 다른 기기에서는 데이터가 공유되지 않습니다.
    - 장기 운영 서비스로 확장할 경우, 서버 API와 데이터베이스 구조로 전환하는 것이 적합합니다.

다음 단계 추천
    1. GitHub 저장소에 최종 코드 업로드
    2. GitHub Pages 활성화
    3. 실제 공개 URL 확인
    4. 관리자 로그인 테스트
    5. 도서 추가/삭제 기능 실제 검증
    6. 필요 시 관리자 UI와 디자인 보완

이 문서만 따라가면, 프로젝트를 GitHub에 올리고 공개용 웹사이트로 연결하는 흐름을 모두 정리할 수 있습니다.


포트폴리오용 소개글
Syntropy Books는 과학, 철학, 생태, 시스템 사고를 중심으로 질서와 무질서 사이를 연결하는 책을 소개하는 정적 웹사이트입니다. 단순한 책 소개 페이지를 넘어, 도서 관리 기능과 관리자 대시보드를 포함한 완성형 책방 웹사이트로 설계되었습니다.

이 프로젝트는 HTML, CSS, JavaScript를 기반으로 제작되었으며, 브라우저 로컬 저장소를 활용해 도서 데이터를 관리하고, 관리자 계정을 통해 도서를 추가·수정·삭제할 수 있도록 구현했습니다. 또한 GitHub Pages 배포를 고려한 정적 구조로 구성되어 있어, 웹사이트를 빠르게 공개하고 운영할 수 있다는 장점이 있습니다.

주요 기능으로는 메인 홈페이지, 책방 소개 페이지, 도서 목록 페이지, 신간 도서 코너, 관리자 로그인, 관리자 대시보드, 도서 관리 기능, 페이지 간 데이터 동기화 등을 포함합니다. 사용자 경험을 고려해 사이드바 구조와 카테고리별 탐색 흐름을 정리했으며, 브라우저 환경에서 즉시 동작하는 정적 웹사이트로서 실사용성을 갖추고 있습니다.

이 프로젝트를 통해 정적 웹사이트 제작, UI/UX 구성, 관리자 기능 구현, 로컬 저장소 기반 데이터 관리, GitHub Pages 배포까지 실제 서비스 운영에 필요한 기본 역량을 함께 경험할 수 있었습니다.

한 줄 포트폴리오 문장
과학과 철학적인 가치를 담은 책방 웹사이트를 구축하며, 정적 웹사이트 개발, 관리자 기능 구현, 로컬 데이터 관리, GitHub Pages 배포까지 경험한 프로젝트입니다.


최종 정리
현재 프로젝트는 GitHub에 최종 반영된 상태입니다.

저장소: https://github.com/secheonio/Home_SyntropyBooks.git
브랜치: main
마지막 확인된 원격 커밋 해시:
5e19271f0e647750b591a180556999f603a7e8b0
포함된 내용
홈페이지 구성
관리자 로그인 및 대시보드
도서 추가 / 수정 / 삭제
localStorage 기반 동기화
도서 목록 + 신간 코너 반영
GitHub Pages 배포 설명서
포트폴리오용 프로젝트 요약
문서 위치
README.md
project-summary.md
다음 단계
GitHub Pages에서 실제로 공개하려면:

GitHub 저장소 열기
Settings → Pages 이동
Source를 main으로 설정
저장 후 공개 URL 확인
공개 주소 형식은 보통 아래처럼 됩니다.

https://secheonio.github.io/Home_NetropyBooks/
마지막 한 줄 정리
이 프로젝트는 정적 웹사이트 제작, 관리자 기능 구현, 로컬 데이터 관리, GitHub Pages 배포까지 포함한 완성형 책방 프로젝트로 마무리되었습니다.
