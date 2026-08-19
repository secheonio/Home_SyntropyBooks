const createAdminAccess = () => {
    let adminTrigger = document.querySelector('.admin-trigger');
    let adminLoginModal = document.querySelector('#admin-login-modal');

    if (!adminTrigger) {
        adminTrigger = document.createElement('button');
        adminTrigger.className = 'admin-trigger';
        adminTrigger.type = 'button';
        adminTrigger.setAttribute('aria-label', '관리자 로그인 열기');
        document.querySelector('.footer-section')?.prepend(adminTrigger);
    }

    if (!adminLoginModal) {
        adminLoginModal = document.createElement('div');
        adminLoginModal.className = 'admin-modal';
        adminLoginModal.id = 'admin-login-modal';
        adminLoginModal.hidden = true;
        adminLoginModal.innerHTML = `
            <div class="admin-modal-backdrop" data-admin-close></div>
            <section class="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
                <button class="admin-dialog-close" type="button" aria-label="관리자 로그인 닫기" data-admin-close>&times;</button>
                <p class="admin-eyebrow">ADMIN ACCESS</p>
                <h2 id="admin-login-title">관리자 로그인</h2>
                <form id="admin-login-form">
                    <label for="admin-login-id">관리자 아이디</label>
                    <input id="admin-login-id" name="loginId" type="text" autocomplete="username" required>
                    <label for="admin-login-password">비밀번호</label>
                    <div class="admin-password-field">
                        <input id="admin-login-password" name="password" type="password" autocomplete="current-password" required>
                        <button class="admin-password-toggle" type="button" aria-label="비밀번호 보기" aria-pressed="false">&#128065;</button>
                    </div>
                    <button type="submit">로그인</button>
                    <p class="admin-login-status" id="admin-login-status" aria-live="polite"></p>
                </form>
            </section>`;
        document.body.append(adminLoginModal);
    }

    const ensureBooksHeaderSearch = () => {
        const currentPath = window.location.pathname;
        const isBooksArea = /\/books\//.test(currentPath) || currentPath.endsWith('/books.html') || currentPath.endsWith('/books-new.html') || currentPath.endsWith('/catalog.html');

        if (!isBooksArea) {
            return;
        }

        if (document.querySelector('#book-search-input')) {
            return;
        }

        const headerBottomRow = document.querySelector('.header-bottom-row');
        const navWrap = document.querySelector('.header-nav-wrap');

        if (!headerBottomRow || !navWrap) {
            return;
        }

        const searchSection = document.createElement('section');
        searchSection.className = 'book-search';
        searchSection.setAttribute('aria-label', '도서 검색');
        searchSection.innerHTML = `
            <label for="book-search-input">도서 검색</label>
            <input id="book-search-input" type="search" placeholder="제목, 저자, 카테고리로 검색" autocomplete="off">
            <p id="book-search-status" class="book-search-status" aria-live="polite">전체 도서 8권</p>
        `;

        headerBottomRow.insertBefore(searchSection, navWrap);
    };

    const getAdminDashboardUrl = () => {
        const currentPath = window.location.pathname;
        const currentIsAdminPage = currentPath.includes('/admin/');
        const currentIsNestedPage = /\/(books|about|contact)\//.test(currentPath);

        if (currentIsAdminPage) {
            return new URL('admin.html', window.location.href).toString();
        }

        if (currentIsNestedPage) {
            return new URL('../admin/admin.html', window.location.href).toString();
        }

        return new URL('admin/admin.html', window.location.href).toString();
    };

    const getMainPageUrl = () => {
        const currentPath = window.location.pathname;
        const currentIsAdminPage = currentPath.includes('/admin/');
        const currentIsNestedPage = /\/(books|about|contact)\//.test(currentPath);

        if (currentIsAdminPage) {
            return new URL('../index.html', window.location.href).toString();
        }

        if (currentIsNestedPage) {
            return new URL('../index.html', window.location.href).toString();
        }

        return new URL('index.html', window.location.href).toString();
    };

    const logoutAdmin = () => {
        sessionStorage.removeItem('syntropyAdminLoggedIn');
        const existingLink = document.querySelector('.admin-dashboard-link');
        const existingLogoutButton = document.querySelector('.admin-logout-link');
        existingLink?.remove();
        existingLogoutButton?.remove();
        window.location.href = getMainPageUrl();
    };

    const updateAdminDashboardLink = () => {
        const isLoggedIn = sessionStorage.getItem('syntropyAdminLoggedIn') === 'true';
        const existingLink = document.querySelector('.admin-dashboard-link');
        const existingLogoutButton = document.querySelector('.admin-logout-link');

        if (!isLoggedIn) {
            existingLink?.remove();
            existingLogoutButton?.remove();
            return;
        }

        if (existingLink && existingLogoutButton) {
            return;
        }

        const dashboardLink = document.createElement('a');
        dashboardLink.className = 'admin-dashboard-link';
        dashboardLink.href = getAdminDashboardUrl();
        dashboardLink.textContent = '관리자센터';
        dashboardLink.setAttribute('aria-label', '관리자 대시보드로 이동');

        const logoutButton = document.createElement('button');
        logoutButton.type = 'button';
        logoutButton.className = 'admin-logout-link';
        logoutButton.textContent = '로그아웃';
        logoutButton.setAttribute('aria-label', '관리자 로그아웃');
        logoutButton.addEventListener('click', logoutAdmin);

        const navBar = document.querySelector('.nav-bar');
        const footerSection = document.querySelector('.footer-section');

        if (navBar) {
            navBar.append(dashboardLink, logoutButton);
            return;
        }

        if (footerSection) {
            footerSection.append(dashboardLink, logoutButton);
            return;
        }

        document.body.append(dashboardLink, logoutButton);
    };

    const adminLoginForm = document.querySelector('#admin-login-form');
    const adminLoginStatus = document.querySelector('#admin-login-status');
    const closeAdminLogin = () => {
        adminLoginModal.hidden = true;
        document.body.classList.remove('admin-modal-open');
    };
    const openAdminLogin = () => {
        adminLoginModal.hidden = false;
        document.body.classList.add('admin-modal-open');
        document.querySelector('#admin-login-id')?.focus();
    };

    const DEFAULT_ADMIN_ID = '관리자';
    const DEFAULT_ADMIN_PASSWORD = 'scipark';

    adminTrigger.addEventListener('click', openAdminLogin);
    adminLoginModal.querySelectorAll('[data-admin-close]').forEach((button) => {
        button.addEventListener('click', closeAdminLogin);
    });
    adminLoginForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const loginId = adminLoginForm.querySelector('#admin-login-id')?.value.trim();
        const password = adminLoginForm.querySelector('#admin-login-password')?.value;

        if (!adminLoginStatus) {
            return;
        }

        if (loginId === DEFAULT_ADMIN_ID && password === DEFAULT_ADMIN_PASSWORD) {
            adminLoginStatus.textContent = '로그인 성공';
            adminLoginStatus.style.color = '#2d6a4f';
            sessionStorage.setItem('syntropyAdminLoggedIn', 'true');
            updateAdminDashboardLink();
            window.location.href = getAdminDashboardUrl();
            return;
        }

        adminLoginStatus.textContent = '아이디 또는 비밀번호가 올바르지 않습니다.';
        adminLoginStatus.style.color = '#a64242';
    });
    adminLoginModal.querySelector('.admin-password-toggle')?.addEventListener('click', (event) => {
        const toggle = event.currentTarget;
        const passwordInput = adminLoginModal.querySelector('#admin-login-password');
        const isVisible = passwordInput.type === 'text';
        passwordInput.type = isVisible ? 'password' : 'text';
        toggle.setAttribute('aria-pressed', String(!isVisible));
        toggle.setAttribute('aria-label', isVisible ? '비밀번호 보기' : '비밀번호 숨기기');
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !adminLoginModal.hidden) {
            closeAdminLogin();
        }
    });

    ensureBooksHeaderSearch();
    updateAdminDashboardLink();
};

document.addEventListener('DOMContentLoaded', createAdminAccess);
