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
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileSearch.classList.add('hidden');
        });

        // Mobile search toggle
        searchBtn.addEventListener('click', function() {
            mobileSearch.classList.toggle('hidden');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });

        //depozit all funtion 
        depozipt.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.add('active');
        });
        depoziptMobile.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.add('active');
        });

        // Login overlay functionality
        loginButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                loginOverlay.classList.add('active');
            });
        });

        closeLogin.addEventListener('click', function() {
            loginOverlay.classList.remove('active');
        });

        // Forgot password functionality
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.remove('active');
            forgotPasswordOverlay.classList.add('active');
        });

        closeForgotPassword.addEventListener('click', function() {
            forgotPasswordOverlay.classList.remove('active');
        });

        // Sign up functionality
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.remove('active');
            signupOverlay.classList.add('active');
        });

        closeSignup.addEventListener('click', function() {
            signupOverlay.classList.remove('active');
        });

        // Back to login functionality
        backToLoginLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                forgotPasswordOverlay.classList.remove('active');
                signupOverlay.classList.remove('active');
                loginOverlay.classList.add('active');
            });
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Add login logic here
            alert('Login functionality would be implemented here');
        });

        document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Add forgot password logic here
            alert('Password reset email would be sent here');
        });

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Add signup logic here
            alert('Account creation would be implemented here');
        });

        // Close overlays when clicking outside
        [loginOverlay, forgotPasswordOverlay, signupOverlay].forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        });
    });

    // Mobile dropdown functionality
    function toggleDropdown(id) {
        const dropdown = document.getElementById(id);
        dropdown.classList.toggle('active');
        
        // Rotate the chevron icon
        const button = dropdown.previousElementSibling;
        const icon = button.querySelector('i');
        if (dropdown.classList.contains('active')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    }