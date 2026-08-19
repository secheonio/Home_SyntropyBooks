const protectAdminPage = () => {
    const isLoggedIn = sessionStorage.getItem('syntropyAdminLoggedIn') === 'true';

    if (!isLoggedIn) {
        window.location.href = '../index.html';
        return;
    }

    const logoutButton = document.querySelector('#admin-logout');
    logoutButton?.addEventListener('click', () => {
        sessionStorage.removeItem('syntropyAdminLoggedIn');
        window.location.href = '../index.html';
    });
};

document.addEventListener('DOMContentLoaded', protectAdminPage);
