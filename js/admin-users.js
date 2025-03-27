document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    if (!localStorage.getItem('adminLoggedIn') && !sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin/login.html';
        return;
    }

    // Sample user data (would come from API in real app)
    let users = [
        {
            id: 1,
            name: "Admin User",
            email: "admin@mullatravels.com",
            role: "admin",
            status: "active",
            lastLogin: "2023-07-15T09:30:00Z"
        },
        {
            id: 2,
            name: "John Smith",
            email: "john.smith@example.com",
            role: "user",
            status: "active",
            lastLogin: "2023-07-14T14:15:00Z"
        },
        {
            id: 3,
            name: "Sarah Johnson",
            email: "sarah.j@example.com",
            role: "user",
            status: "active",
            lastLogin: "2023-07-12T11:45:00Z"
        },
        {
            id: 4,
            name: "Michael Brown",
            email: "michael.b@example.com",
            role: "user",
            status: "inactive",
            lastLogin: "2023-06-28T16:20:00Z"
        }
    ];

    // Display users in table
    function renderUsers() {
        const tableBody = document.getElementById('users-table');
        tableBody.innerHTML = '';
        
        users.forEach(user => {
            const row = document.createElement('tr');
            
            // Set status class and text
            let statusClass = user.status === 'active' ? 'status-active' : 'status-inactive';
            let statusText = user.status === 'active' ? 'Active' : 'Inactive';
            
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${new Date(user.lastLogin).toLocaleString()}</td>
                <td class="text-end table-actions">
                    <button class="btn btn-sm btn-outline-primary me-1 edit-user" data-id="${user.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger toggle-user" data-id="${user.id}">
                        <i class="fas ${user.status === 'active' ? 'fa-user-slash' : 'fa-user-check'}"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-id'));
                editUser(userId);
            });
        });
        
        document.querySelectorAll('.toggle-user').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-id'));
                toggleUserStatus(userId);
            });
        });
    }

    // Add new user
    document.getElementById('save-user').addEventListener('click', function() {
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const role = document.getElementById('user-role').value;
        const password = document.getElementById('user-password').value;
        
        if (!name || !email || !password) {
            alert('Please fill in all required fields');
            return;
        }
        
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
            role,
            status: "active",
            lastLogin: new Date().toISOString()
        };
        
        users.push(newUser);
        renderUsers();
        
        // Reset form and close modal
        document.getElementById('add-user-form').reset();
        bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
    });

    // Edit user
    function editUser(userId) {
        const user = users.find(u => u.id === userId);
        if (!user) return;
        
        // In a real app, this would open an edit modal
        alert(`Editing user: ${user.name}\nThis would open an edit form in a real application.`);
    }

    // Toggle user status
    function toggleUserStatus(userId) {
        const user = users.find(u => u.id === userId);
        if (!user) return;
        
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        const confirmMessage = newStatus === 'active' 
            ? 'Are you sure you want to activate this user?' 
            : 'Are you sure you want to deactivate this user?';
        
        if (confirm(confirmMessage)) {
            user.status = newStatus;
            renderUsers();
        }
    }

    // Initialize the page
    renderUsers();
});