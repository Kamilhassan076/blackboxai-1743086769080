document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    if (!localStorage.getItem('adminLoggedIn') && !sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin/login.html';
        return;
    }

    // Set current date
    const now = new Date();
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Sample data (would come from API in real app)
    const dashboardData = {
        totalBookings: 42,
        activeTours: 6,
        pendingBookings: 3,
        totalRevenue: 48250,
        bookingsData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Bookings',
                data: [12, 19, 3, 5, 2, 3, 8],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        toursData: {
            labels: ['Bali', 'Europe', 'Japan', 'Safari', 'Caribbean', 'NZ'],
            datasets: [{
                label: 'Popularity',
                data: [12, 19, 8, 5, 3, 7],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        recentBookings: [
            {
                ref: 'MTX58392',
                tour: 'Bali Adventure',
                customer: 'John Smith',
                date: '2023-07-15',
                amount: 899,
                status: 'Confirmed'
            },
            {
                ref: 'MTX47281',
                tour: 'European Explorer',
                customer: 'Sarah Johnson',
                date: '2023-07-14',
                amount: 1899,
                status: 'Confirmed'
            },
            {
                ref: 'MTX36170',
                tour: 'Japan Discovery',
                customer: 'Michael Brown',
                date: '2023-07-12',
                amount: 1499,
                status: 'Pending'
            },
            {
                ref: 'MTX25059',
                tour: 'Safari Expedition',
                customer: 'Emily Davis',
                date: '2023-07-10',
                amount: 1299,
                status: 'Confirmed'
            },
            {
                ref: 'MTX13948',
                tour: 'Caribbean Cruise',
                customer: 'Robert Wilson',
                date: '2023-07-08',
                amount: 1599,
                status: 'Cancelled'
            }
        ]
    };

    // Update stats
    document.getElementById('total-bookings').textContent = dashboardData.totalBookings;
    document.getElementById('active-tours').textContent = dashboardData.activeTours;
    document.getElementById('pending-bookings').textContent = dashboardData.pendingBookings;
    document.getElementById('total-revenue').textContent = '$' + dashboardData.totalRevenue.toLocaleString();

    // Initialize charts
    const bookingsCtx = document.getElementById('bookingsChart').getContext('2d');
    new Chart(bookingsCtx, {
        type: 'bar',
        data: dashboardData.bookingsData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const toursCtx = document.getElementById('toursChart').getContext('2d');
    new Chart(toursCtx, {
        type: 'doughnut',
        data: dashboardData.toursData,
        options: {
            responsive: true
        }
    });

    // Populate recent bookings
    const bookingsTable = document.getElementById('recent-bookings');
    dashboardData.recentBookings.forEach(booking => {
        const row = document.createElement('tr');
        
        // Set status color
        let statusClass = '';
        if (booking.status === 'Confirmed') statusClass = 'text-success';
        else if (booking.status === 'Pending') statusClass = 'text-warning';
        else if (booking.status === 'Cancelled') statusClass = 'text-danger';

        row.innerHTML = `
            <td>${booking.ref}</td>
            <td>${booking.tour}</td>
            <td>${booking.customer}</td>
            <td>${new Date(booking.date).toLocaleDateString()}</td>
            <td>$${booking.amount}</td>
            <td class="${statusClass}">${booking.status}</td>
        `;
        bookingsTable.appendChild(row);
    });
});