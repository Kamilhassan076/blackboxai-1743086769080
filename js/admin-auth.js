document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('admin-login-form');
    
    // Check for existing session
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        window.location.href = '../admin/dashboard.html';
    }
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // In a real app, this would be a server-side check
        if (username === 'admin' && password === 'MullaTravels2023') {
            // Set session
            if (remember) {
                localStorage.setItem('adminLoggedIn', 'true');
            } else {
                sessionStorage.setItem('adminLoggedIn', 'true');
            }
            
            // Redirect to dashboard
            window.location.href = '../admin/dashboard.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});

// Admin logout function (to be used in admin pages)
function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = '../admin/login.html';
}