document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    if (!localStorage.getItem('adminLoggedIn') && !sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin/login.html';
        return;
    }

    // Sample tour data (would come from API in real app)
    let tours = [
        {
            id: 1,
            name: "Bali Adventure",
            price: 899,
            duration: 7,
            rating: 4.8,
            status: "Active",
            category: "adventure",
            description: "7-day tropical paradise tour with cultural experiences",
            image: "images/bali.jpg"
        },
        {
            id: 2,
            name: "European Explorer",
            price: 1899,
            duration: 14,
            rating: 4.9,
            status: "Active",
            category: "cultural",
            description: "14-day tour through 5 European countries",
            image: "images/europe.jpg"
        },
        {
            id: 3,
            name: "Japan Discovery",
            price: 1499,
            duration: 10,
            rating: 4.7,
            status: "Active",
            category: "cultural",
            description: "10-day cultural journey through Japan",
            image: "images/japan.jpg"
        },
        {
            id: 4,
            name: "Safari Expedition",
            price: 1299,
            duration: 5,
            rating: 4.9,
            status: "Inactive",
            category: "adventure",
            description: "5-day wildlife adventure in Tanzania",
            image: "images/safari.jpg"
        }
    ];

    // Display tours in table
    function renderTours() {
        const tableBody = document.getElementById('tours-table');
        tableBody.innerHTML = '';
        
        tours.forEach(tour => {
            const row = document.createElement('tr');
            
            // Set status color
            let statusClass = '';
            if (tour.status === 'Active') statusClass = 'text-success';
            else if (tour.status === 'Inactive') statusClass = 'text-danger';
            
            row.innerHTML = `
                <td>${tour.id}</td>
                <td>${tour.name}</td>
                <td>$${tour.price}</td>
                <td>${tour.duration} days</td>
                <td>${tour.rating} <i class="fas fa-star text-warning"></i></td>
                <td class="${statusClass}">${tour.status}</td>
                <td class="text-end table-actions">
                    <button class="btn btn-sm btn-outline-primary me-1 edit-tour" data-id="${tour.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-tour" data-id="${tour.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-tour').forEach(btn => {
            btn.addEventListener('click', function() {
                const tourId = parseInt(this.getAttribute('data-id'));
                editTour(tourId);
            });
        });
        
        document.querySelectorAll('.delete-tour').forEach(btn => {
            btn.addEventListener('click', function() {
                const tourId = parseInt(this.getAttribute('data-id'));
                deleteTour(tourId);
            });
        });
    }

    // Add new tour
    document.getElementById('save-tour').addEventListener('click', function() {
        const name = document.getElementById('tour-name').value;
        const price = parseFloat(document.getElementById('tour-price').value);
        const duration = parseInt(document.getElementById('tour-duration').value);
        const category = document.getElementById('tour-category').value;
        const description = document.getElementById('tour-description').value;
        const image = document.getElementById('tour-image').value;
        
        if (!name || !price || !duration || !description) {
            alert('Please fill in all required fields');
            return;
        }
        
        const newTour = {
            id: tours.length > 0 ? Math.max(...tours.map(t => t.id)) + 1 : 1,
            name,
            price,
            duration,
            rating: 0,
            status: "Active",
            category,
            description,
            image: image || 'images/default-tour.jpg'
        };
        
        tours.push(newTour);
        renderTours();
        
        // Reset form and close modal
        document.getElementById('add-tour-form').reset();
        bootstrap.Modal.getInstance(document.getElementById('addTourModal')).hide();
    });

    // Edit tour
    function editTour(tourId) {
        const tour = tours.find(t => t.id === tourId);
        if (!tour) return;
        
        // In a real app, this would open an edit modal
        alert(`Editing tour: ${tour.name}\nThis would open an edit form in a real application.`);
    }

    // Delete tour
    function deleteTour(tourId) {
        if (confirm('Are you sure you want to delete this tour?')) {
            tours = tours.filter(t => t.id !== tourId);
            renderTours();
        }
    }

    // Initialize the page
    renderTours();
});