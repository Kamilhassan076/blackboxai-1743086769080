// Extended tour data for tours page
const allTours = [
    {
        id: 1,
        title: "Bali Adventure",
        description: "7-day tropical paradise tour with cultural experiences",
        price: 899,
        duration: 7,
        image: "images/bali.jpg",
        rating: 4.8,
        category: "adventure"
    },
    {
        id: 2,
        title: "European Explorer",
        description: "14-day tour through 5 European countries",
        price: 1899,
        duration: 14,
        image: "images/europe.jpg",
        rating: 4.9,
        category: "cultural"
    },
    {
        id: 3,
        title: "Japan Discovery",
        description: "10-day cultural journey through Japan",
        price: 1499,
        duration: 10,
        image: "images/japan.jpg",
        rating: 4.7,
        category: "cultural"
    },
    {
        id: 4,
        title: "Safari Expedition",
        description: "5-day wildlife adventure in Tanzania",
        price: 1299,
        duration: 5,
        image: "images/safari.jpg",
        rating: 4.9,
        category: "adventure"
    },
    {
        id: 5,
        title: "Caribbean Cruise",
        description: "7-day luxury cruise through the Caribbean",
        price: 1599,
        duration: 7,
        image: "images/cruise.jpg",
        rating: 4.6,
        category: "luxury"
    },
    {
        id: 6,
        title: "New Zealand Trek",
        description: "14-day hiking adventure through New Zealand",
        price: 1999,
        duration: 14,
        image: "images/nz.jpg",
        rating: 4.8,
        category: "adventure"
    }
];

// Load all tours on page load
document.addEventListener('DOMContentLoaded', function() {
    displayTours(allTours);
    
    // Set up filter event listeners
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
});

// Display tours in the grid
function displayTours(tours) {
    const toursContainer = document.getElementById('all-tours');
    toursContainer.innerHTML = '';
    
    tours.forEach(tour => {
        const tourCard = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <img src="${tour.image}" class="card-img-top" alt="${tour.title}">
                    <div class="card-body">
                        <h5 class="card-title">${tour.title}</h5>
                        <p class="card-text">${tour.description}</p>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-primary">${tour.duration} days</span>
                            <span class="text-success fw-bold">$${tour.price}</span>
                        </div>
                        <div class="mb-3">
                            ${generateStarRating(tour.rating)}
                        </div>
                        <a href="tour-details.html?id=${tour.id}" class="btn btn-outline-primary w-100 mb-2">View Details</a>
                        <a href="booking.html?tour=${tour.id}" class="btn btn-primary w-100">Book Now</a>
                    </div>
                </div>
            </div>
        `;
        toursContainer.innerHTML += tourCard;
    });
}

// Apply filters when button clicked
function applyFilters() {
    const priceRange = document.getElementById('price-range').value;
    const durationFilters = [];
    
    // Get selected duration filters
    if (document.getElementById('duration-1week').checked) {
        durationFilters.push(7);
    }
    if (document.getElementById('duration-2weeks').checked) {
        durationFilters.push(14);
    }
    if (document.getElementById('duration-month').checked) {
        durationFilters.push(30);
    }
    
    // Filter tours
    let filteredTours = allTours.filter(tour => tour.price <= priceRange);
    
    if (durationFilters.length > 0) {
        filteredTours = filteredTours.filter(tour => 
            durationFilters.some(duration => 
                (duration === 7 && tour.duration <= 7) ||
                (duration === 14 && tour.duration > 7 && tour.duration <= 14) ||
                (duration === 30 && tour.duration > 14)
            )
        );
    }
    
    displayTours(filteredTours);
}

// Reuse star rating function from main.js
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