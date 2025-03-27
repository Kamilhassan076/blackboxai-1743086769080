document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const bookingForm = document.getElementById('booking-form');
    const tourSelect = document.getElementById('tour-select');
    const travelDate = document.getElementById('travel-date');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    travelDate.min = today;
    
    // Populate tour dropdown
    function populateTourSelect() {
        // Clear existing options
        tourSelect.innerHTML = '<option value="" selected disabled>Choose a tour</option>';
        
        // Add tour options
        allTours.forEach(tour => {
            const option = document.createElement('option');
            option.value = tour.id;
            option.textContent = `${tour.title} ($${tour.price})`;
            tourSelect.appendChild(option);
        });
        
        // Check for tour ID in URL
        const urlParams = new URLSearchParams(window.location.search);
        const tourId = urlParams.get('tour');
        if (tourId) {
            tourSelect.value = tourId;
        }
    }
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!bookingForm.checkValidity()) {
            e.stopPropagation();
            bookingForm.classList.add('was-validated');
            return;
        }
        
        // Collect form data
        const bookingData = {
            tourId: tourSelect.value,
            tourName: tourSelect.options[tourSelect.selectedIndex].text,
            travelDate: travelDate.value,
            passengers: document.getElementById('passengers').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            specialRequests: document.getElementById('special-requests').value,
            bookingDate: new Date().toISOString(),
            bookingReference: generateBookingReference()
        };
        
        // In a real app, this would be sent to a server
        console.log('Booking submitted:', bookingData);
        
        // Store in localStorage (temporary solution)
        const bookings = JSON.parse(localStorage.getItem('mullaBookings') || '[]');
        bookings.push(bookingData);
        localStorage.setItem('mullaBookings', JSON.stringify(bookings));
        
        // Redirect to confirmation
        window.location.href = `confirmation.html?ref=${bookingData.bookingReference}`;
    });
    
    // Generate random booking reference
    function generateBookingReference() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Initialize the page
    populateTourSelect();
});

// Make allTours available (would normally come from API)
const allTours = [
    {
        id: 1,
        title: "Bali Adventure",
        price: 899
    },
    {
        id: 2,
        title: "European Explorer",
        price: 1899
    },
    {
        id: 3,
        title: "Japan Discovery",
        price: 1499
    },
    {
        id: 4,
        title: "Safari Expedition",
        price: 1299
    },
    {
        id: 5,
        title: "Caribbean Cruise",
        price: 1599
    },
    {
        id: 6,
        title: "New Zealand Trek",
        price: 1999
    }
];