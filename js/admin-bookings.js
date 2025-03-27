document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    if (!localStorage.getItem('adminLoggedIn') && !sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin/login.html';
        return;
    }

    // Sample booking data (would come from API in real app)
    let bookings = [
        {
            ref: 'MTX58392',
            tour: 'Bali Adventure',
            customer: 'John Smith',
            date: '2023-07-15',
            amount: 899,
            status: 'confirmed',
            details: {
                passengers: 2,
                email: 'john.smith@example.com',
                phone: '+1 555-123-4567',
                specialRequests: 'Vegetarian meals required',
                bookingDate: '2023-07-10T14:30:00Z'
            }
        },
        {
            ref: 'MTX47281',
            tour: 'European Explorer',
            customer: 'Sarah Johnson',
            date: '2023-07-14',
            amount: 1899,
            status: 'confirmed',
            details: {
                passengers: 1,
                email: 'sarah.j@example.com',
                phone: '+1 555-987-6543',
                specialRequests: '',
                bookingDate: '2023-07-08T09:15:00Z'
            }
        },
        {
            ref: 'MTX36170',
            tour: 'Japan Discovery',
            customer: 'Michael Brown',
            date: '2023-07-12',
            amount: 1499,
            status: 'pending',
            details: {
                passengers: 4,
                email: 'michael.b@example.com',
                phone: '+1 555-456-7890',
                specialRequests: 'Need 2 connecting rooms',
                bookingDate: '2023-07-05T16:45:00Z'
            }
        },
        {
            ref: 'MTX25059',
            tour: 'Safari Expedition',
            customer: 'Emily Davis',
            date: '2023-07-10',
            amount: 1299,
            status: 'confirmed',
            details: {
                passengers: 2,
                email: 'emily.d@example.com',
                phone: '+1 555-789-0123',
                specialRequests: 'Allergic to nuts',
                bookingDate: '2023-07-01T11:20:00Z'
            }
        },
        {
            ref: 'MTX13948',
            tour: 'Caribbean Cruise',
            customer: 'Robert Wilson',
            date: '2023-07-08',
            amount: 1599,
            status: 'cancelled',
            details: {
                passengers: 3,
                email: 'robert.w@example.com',
                phone: '+1 555-234-5678',
                specialRequests: 'Wheelchair accessible room needed',
                bookingDate: '2023-06-28T13:10:00Z'
            }
        }
    ];

    // Display bookings in table
    function renderBookings(filterStatus = 'all') {
        const tableBody = document.getElementById('bookings-table');
        tableBody.innerHTML = '';
        
        const filteredBookings = filterStatus === 'all' 
            ? bookings 
            : bookings.filter(b => b.status === filterStatus);
        
        filteredBookings.forEach(booking => {
            const row = document.createElement('tr');
            
            // Set status class and text
            let statusClass = '';
            let statusText = '';
            switch(booking.status) {
                case 'confirmed':
                    statusClass = 'status-confirmed';
                    statusText = 'Confirmed';
                    break;
                case 'pending':
                    statusClass = 'status-pending';
                    statusText = 'Pending';
                    break;
                case 'cancelled':
                    statusClass = 'status-cancelled';
                    statusText = 'Cancelled';
                    break;
            }
            
            row.innerHTML = `
                <td>${booking.ref}</td>
                <td>${booking.tour}</td>
                <td>${booking.customer}</td>
                <td>${new Date(booking.date).toLocaleDateString()}</td>
                <td>$${booking.amount}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td class="text-end table-actions">
                    <button class="btn btn-sm btn-outline-primary me-1 view-booking" data-ref="${booking.ref}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success me-1 confirm-booking" data-ref="${booking.ref}">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger cancel-booking" data-ref="${booking.ref}">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.view-booking').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookingRef = this.getAttribute('data-ref');
                showBookingDetails(bookingRef);
            });
        });
        
        document.querySelectorAll('.confirm-booking').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookingRef = this.getAttribute('data-ref');
                updateBookingStatus(bookingRef, 'confirmed');
            });
        });
        
        document.querySelectorAll('.cancel-booking').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookingRef = this.getAttribute('data-ref');
                updateBookingStatus(bookingRef, 'cancelled');
            });
        });
    }

    // Show booking details in modal
    function showBookingDetails(bookingRef) {
        const booking = bookings.find(b => b.ref === bookingRef);
        if (!booking) return;
        
        const modalContent = document.getElementById('booking-details-content');
        modalContent.innerHTML = `
            <div class="row mb-3">
                <div class="col-md-6">
                    <h5>Booking Reference</h5>
                    <p>${booking.ref}</p>
                </div>
                <div class="col-md-6">
                    <h5>Tour Package</h5>
                    <p>${booking.tour}</p>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <h5>Customer</h5>
                    <p>${booking.customer}</p>
                </div>
                <div class="col-md-6">
                    <h5>Travel Date</h5>
                    <p>${new Date(booking.date).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <h5>Amount</h5>
                    <p>$${booking.amount}</p>
                </div>
                <div class="col-md-6">
                    <h5>Status</h5>
                    <p><span class="status-badge ${getStatusClass(booking.status)}">${getStatusText(booking.status)}</span></p>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <h5>Passengers</h5>
                    <p>${booking.details.passengers}</p>
                </div>
                <div class="col-md-6">
                    <h5>Booking Date</h5>
                    <p>${new Date(booking.details.bookingDate).toLocaleString()}</p>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <h5>Contact Email</h5>
                    <p>${booking.details.email}</p>
                </div>
                <div class="col-md-6">
                    <h5>Contact Phone</h5>
                    <p>${booking.details.phone}</p>
                </div>
            </div>
            <div class="mb-3">
                <h5>Special Requests</h5>
                <p>${booking.details.specialRequests || 'None'}</p>
            </div>
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('bookingDetailsModal'));
        modal.show();
    }

    // Update booking status
    function updateBookingStatus(bookingRef, newStatus) {
        const booking = bookings.find(b => b.ref === bookingRef);
        if (!booking) return;
        
        if (confirm(`Are you sure you want to ${newStatus} this booking?`)) {
            booking.status = newStatus;
            renderBookings();
        }
    }

    // Helper functions for status display
    function getStatusClass(status) {
        switch(status) {
            case 'confirmed': return 'status-confirmed';
            case 'pending': return 'status-pending';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    }

    function getStatusText(status) {
        switch(status) {
            case 'confirmed': return 'Confirmed';
            case 'pending': return 'Pending';
            case 'cancelled': return 'Cancelled';
            default: return status;
        }
    }

    // Set up filter buttons
    document.querySelectorAll('.dropdown-item[data-status]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const status = this.getAttribute('data-status');
            renderBookings(status);
        });
    });

    // Initialize the page
    renderBookings();
});