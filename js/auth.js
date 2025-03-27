document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // In a real app, this would be a server-side authentication
            if (email && password) {
                // Simulate successful login
                if (rememberMe) {
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                } else {
                    sessionStorage.setItem('userLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                }
                
                // Redirect to account page or previous page
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect') || 'index.html';
                window.location.href = redirect;
            } else {
                alert('Please enter both email and password');
            }
        });
    }
});

// Check if user is logged in (to be used on protected pages)
function checkUserAuth() {
    if (!localStorage.getItem('userLoggedIn') && !sessionStorage.getItem('userLoggedIn')) {
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
    }
}

// Logout function
function userLogout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

// Get current user email
function getCurrentUser() {
    return localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
}