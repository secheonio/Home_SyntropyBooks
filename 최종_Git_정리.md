# SyntropyBooks 최종 Git 정리 문서

## 1. 목적
이 프로젝트는 웹사이트를 GitHub에 올릴 때, 사이트 구동에 직접 필요한 파일만 올리고 비필수 파일은 로컬 보관 폴더인 archive로 이동시켜 관리한다.

이 방식으로 GitHub 업로드 제한 문제를 피하고, 저장소를 깔끔하게 유지한다.

---

## 2. 기본 원칙
다음 파일들은 사이트 실행과 직접 관련이 없으므로 archive 폴더로 보관한다.

- 설치 파일
- 영수증 및 문서
- 백업 이미지
- 원본 디자인 파일
- export CSV
- 메모/체크리스트/개발 문서

반대로, 다음은 웹사이트의 실제 실행에 필요한 핵심 파일이다.

- index.html
- css/
- js/
- books/
- about/
- admin/
- contact/
- images 폴더 안의 실제 로고 및 커버 파일

---

## 3. archive 폴더 구조 예시

프로젝트 루트에는 다음 구조를 유지한다.

```text
Home_SyntropyBooks/
├─ index.html
├─ css/
├─ js/
├─ books/
├─ about/
├─ admin/
├─ contact/
├─ images/
│  ├─ SyntropyBooks_logo.png
│  ├─ SB_logo_White.png
│  └─ book-covers/
├─ archive/
│  ├─ 설치파일/
│  ├─ 백업이미지/
│  ├─ 영수증/
│  ├─ export/
│  └─ docs/
├─ .gitignore
└─ 기타 필요한 파일
```

---

## 4. .gitignore 설정
프로젝트 루트의 .gitignore 파일에 아래를 넣는다.

```gitignore
archive/
```

이렇게 하면 GitHub로 push할 때 archive 폴더 안의 파일은 자동으로 제외된다.

---

## 5. PowerShell 함수 설정
PowerShell 프로필에 아래 함수를 등록해 두면, 새 터미널에서도 즉시 사용할 수 있다.

```powershell
function push {
    git add .
    git commit -m $args
    git push origin main
}
```

사용법:

```powershell
push "변경 내용"
```

예:

```powershell
push "도서 목록 수정"
```

이 명령은 내부적으로 아래와 같이 실행된다.

```powershell
git add .
git commit -m "도서 목록 수정"
git push origin main
```

---

## 6. GitHub 업로드 시나리오
다음과 같은 흐름으로 관리한다.

1. 비필수 파일을 archive 폴더로 이동한다.
2. .gitignore에 archive/를 추가한다.
3. 실제 웹사이트 파일만 루트에 남긴다.
4. 필요할 때마다 아래처럼 푸시한다.

```powershell
push "변경 내용"
```

이 경우 archive 폴더는 Git 추적 대상에서 제외되므로, GitHub에는 올라가지 않는다.

---

## 7. 프로필 위치
PowerShell 프로필 파일은 다음 위치에 있다.

```text
C:\Users\user\OneDrive\문서\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```

이 파일 안에 push 함수가 들어 있으며, 새로운 PowerShell 세션이 열릴 때 자동으로 로드된다.

---

## 8. 운영 규칙
다음 규칙을 지킨다.

- 실제 웹사이트 동작에 필요한 파일은 루트 또는 하위 폴더에 유지
- 설치 파일, 백업 파일, 문서 파일, export 파일은 archive로 이동
- archive는 GitHub에 올리지 않는다
- push 함수는 계속 `push "메시지"` 형태로 사용한다

---

## 9. 최종 정리
이 프로젝트는 다음 구조를 기준으로 운영한다.

- 실제 사이트 파일: Git 추적 대상
- 비필수 파일: archive 폴더에 보관
- archive: .gitignore로 제외
- push 함수: 항상 `push "메시지"` 사용

이렇게 하면 저장소를 깔끔하게 유지하면서도 GitHub 업로드 제한 문제를 피할 수 있다.
