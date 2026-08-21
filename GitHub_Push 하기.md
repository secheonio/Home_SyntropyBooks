Git 연동 기본 명령
    git add .
    git commit -m "변경 내용"
    git push origin main

한 줄로 실행하기
    git add . && git commit -m "도서 목록 페이지 추가" && git push origin main

PowerShell에서 자주 쓰는 함수
    function push { git add . ; git commit -m $args ; git push origin main }
    push "변경 내용"

function push { git add . ; git commit -m $args ; git push origin main }