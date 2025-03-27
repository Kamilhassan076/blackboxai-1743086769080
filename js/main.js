// Sample tour data (will be replaced with API calls later)
const featuredTours = [
    {
        id: 1,
        title: "Bali Adventure",
        description: "7-day tropical paradise tour with cultural experiences",
        price: 899,
        duration: "7 days",
        image: "images/bali.jpg",
        rating: 4.8
    },
    {
        id: 2,
        title: "European Explorer",
        description: "14-day tour through 5 European countries",
        price: 1899,
        duration: "14 days",
        image: "images/europe.jpg",
        rating: 4.9
    },
    {
        id: 3,
        title: "Japan Discovery",
        description: "10-day cultural journey through Japan",
        price: 1499,
        duration: "10 days",
        image: "images/japan.jpg",
        rating: 4.7
    }
];

// Load featured tours on homepage
document.addEventListener('DOMContentLoaded', function() {
    const toursContainer = document.getElementById('featured-tours');
    
    if (toursContainer) {
        featuredTours.forEach(tour => {
            const tourCard = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${tour.image}" class="card-img-top" alt="${tour.title}">
                        <div class="card-body">
                            <h5 class="card-title">${tour.title}</h5>
                            <p class="card-text">${tour.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-primary">${tour.duration}</span>
                                <span class="text-success fw-bold">$${tour.price}</span>
                            </div>
                            <div class="mt-2">
                                ${generateStarRating(tour.rating)}
                            </div>
                            <a href="booking.html?tour=${tour.id}" class="btn btn-primary mt-3 w-100">Book Now</a>
                        </div>
                    </div>
                </div>
            `;
            toursContainer.innerHTML += tourCard;
        });
    }
});

// Helper function to generate star ratings
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }
    
    return stars;
}

// Basic form validation for contact page
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Form submission would go here
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
}