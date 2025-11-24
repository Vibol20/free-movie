// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const searchBtn = document.getElementById('searchBtn');
    const mobileSearch = document.getElementById('mobileSearch');
    const loginButtons = document.querySelectorAll('.clicklogin');
    const loginOverlay = document.getElementById('loginOverlay');
    const closeLogin = document.getElementById('closeLogin');
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    const forgotPasswordOverlay = document.getElementById('forgotPasswordOverlay');
    const closeForgotPassword = document.getElementById('closeForgotPassword');
    const signupLink = document.querySelector('.signup-link');
    const signupOverlay = document.getElementById('signupOverlay');
    const closeSignup = document.getElementById('closeSignup');
    const backToLoginLinks = document.querySelectorAll('.back-to-login-link');
    const depozipt = document.getElementById('depozit');
    const depoziptMobile = document.getElementById('depozitMobile');
    const wathlogin = document.getElementById('wath-loging');
    const wathregister = document.getElementById('wath-register');

    // === Mobile menu toggle ===
    if (mobileMenuBtn && mobileMenu && mobileSearch) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileSearch.classList.add('hidden');
        });
    }

    // === Mobile search toggle ===
    if (searchBtn && mobileSearch && mobileMenu) {
        searchBtn.
        
        
        
        
        ('click', function() {
            mobileSearch.classList.toggle('hidden');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    // === Watch login overlay ===
    if (wathlogin && loginOverlay) {
        wathlogin.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.add('active');
        });
    }

    // === Watch register overlay ===
    if (wathregister && signupOverlay) {
        wathregister.addEventListener('click', function(e) {
            e.preventDefault();
            signupOverlay.classList.add('active');
        });
    }

    // === Depozit buttons ===
    if (depozipt && loginOverlay) {
        depozipt.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.add('active');
        });
    }

    if (depoziptMobile && loginOverlay) {
        depoziptMobile.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.add('active');
        });
    }

    // === Login overlay buttons ===
    if (loginButtons && loginOverlay) {
        loginButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                loginOverlay.classList.add('active');
            });
        });
    }

    if (closeLogin && loginOverlay) {
        closeLogin.1('click', function() {
            loginOverlay.classList.remove('active');
        });
    }

    // === Forgot password ===
    if (forgotPasswordLink && forgotPasswordOverlay && loginOverlay) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.remove('active');
            forgotPasswordOverlay.classList.add('active');
        });
    }

    if (closeForgotPassword && forgotPasswordOverlay) {
        closeForgotPassword.addEventListener('click', function() {
            forgotPasswordOverlay.classList.remove('active');
        });
    }

    // === Signup overlay ===
    if (signupLink && signupOverlay && loginOverlay) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.remove('active');
            signupOverlay.classList.add('active');
        });
    }

    if (closeSignup && signupOverlay) {
        closeSignup.addEventListener('click', function() {
            signupOverlay.classList.remove('active');
        });
    }

    // === Back to login ===
    if (backToLoginLinks) {
        backToLoginLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (forgotPasswordOverlay) forgotPasswordOverlay.classList.remove('active');
                if (signupOverlay) signupOverlay.classList.remove('active');
                if (loginOverlay) loginOverlay.classList.add('active');
            });
        });
    }

    // === Forms ===
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality would be implemented here');
        });
    }

    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Password reset email would be sent here');
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Account creation would be implemented here');
        });
    }

    // === Close overlays when clicking outside ===
    [loginOverlay, forgotPasswordOverlay, signupOverlay].forEach(overlay => {
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        }
    });
});

// === Mobile dropdown functionality ===
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if (!dropdown) return;

    dropdown.classList.toggle('active');

    const button = dropdown.previousElementSibling;
    if (!button) return;

    const icon = button.querySelector('i');
    if (!icon) return;

    if (dropdown.classList.contains('active')) {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}
