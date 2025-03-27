document.addEventListener('DOMContentLoaded', function() {
    // Get booking reference from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookingRef = urlParams.get('ref');
    
    if (bookingRef) {
        // In a real app, this would fetch from server
        // For demo, we'll use localStorage
        const bookings = JSON.parse(localStorage.getItem('mullaBookings') || '[]');
        const booking = bookings.find(b => b.bookingReference === bookingRef);
        
        if (booking) {
            // Display booking details
            document.getElementById('booking-ref').textContent = booking.bookingReference;
            document.getElementById('tour-name').textContent = booking.tourName;
            document.getElementById('travel-date').textContent = formatDate(booking.travelDate);
            document.getElementById('passengers').textContent = booking.passengers;
            document.getElementById('booking-date').textContent = formatDate(booking.bookingDate);
        } else {
            // No booking found
            document.querySelector('.booking-details').innerHTML = `
                <div class="alert alert-warning">
                    <h4 class="alert-heading">Booking Not Found</h4>
                    <p>We couldn't find your booking details. Please contact our support team.</p>
                </div>
            `;
        }
    } else {
        // No reference provided
        document.querySelector('.booking-details').innerHTML = `
            <div class="alert alert-danger">
                <h4 class="alert-heading">Invalid Booking Reference</h4>
                <p>Please check your confirmation email for the correct booking link.</p>
            </div>
        `;
    }
});

// Format date as DD/MM/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}