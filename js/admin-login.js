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

    adminTrigger.addEventListener('click', openAdminLogin);
    adminLoginModal.querySelectorAll('[data-admin-close]').forEach((button) => {
        button.addEventListener('click', closeAdminLogin);
    });
    adminLoginForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (adminLoginStatus) {
            adminLoginStatus.textContent = '관리자 인증 서비스를 연결한 후 로그인할 수 있습니다.';
        }
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
};

document.addEventListener('DOMContentLoaded', createAdminAccess);
