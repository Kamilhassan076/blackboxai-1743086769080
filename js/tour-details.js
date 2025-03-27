// Tour data - would normally come from an API
const tours = {
    1: {
        id: 1,
        title: "Bali Adventure",
        description: "Experience the tropical paradise of Bali with our 7-day adventure tour. This carefully curated itinerary takes you through Bali's most stunning landscapes, vibrant culture, and breathtaking beaches.",
        duration: "7 days",
        location: "Bali, Indonesia",
        price: 899,
        rating: 4.8,
        reviewCount: 24,
        image: "images/bali-hero.jpg",
        highlights: [
            "Visit the iconic Tanah Lot temple at sunset",
            "Explore the lush Tegallalang Rice Terraces",
            "Relax at the beautiful beaches of Uluwatu",
            "Experience traditional Balinese dance performance",
            "Enjoy a day of snorkeling in crystal clear waters"
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival in Bali",
                description: "Arrive at Ngurah Rai International Airport and transfer to your hotel in Seminyak. Rest and relax after your flight."
            },
            {
                day: 2,
                title: "Ubud Cultural Tour",
                description: "Visit the Sacred Monkey Forest, Ubud Palace, and local art markets. Enjoy a traditional Balinese dance performance in the evening."
            },
            {
                day: 3,
                title: "Rice Terraces & Volcano",
                description: "Explore the Tegallalang Rice Terraces and visit Mount Batur with its stunning caldera lake."
            },
            {
                day: 4,
                title: "Beach Day in Uluwatu",
                description: "Relax at the beautiful beaches of Uluwatu and visit the famous Uluwatu Temple perched on a cliff."
            },
            {
                day: 5,
                title: "Snorkeling Adventure",
                description: "Boat trip to Nusa Penida for a day of snorkeling in crystal clear waters with colorful marine life."
            },
            {
                day: 6,
                title: "Free Day",
                description: "Free day to explore on your own or enjoy spa treatments at your hotel."
            },
            {
                day: 7,
                title: "Departure",
                description: "Transfer to the airport for your departure flight."
            }
        ],
        gallery: [
            "images/bali-1.jpg",
            "images/bali-2.jpg",
            "images/bali-3.jpg",
            "images/bali-4.jpg"
        ],
        details: {
            groupSize: "2-12 people",
            languages: "English, Indonesian",
            meals: "Breakfast daily, 3 lunches",
            accommodation: "4-star hotels",
            difficulty: "Moderate",
            minAge: 12
        }
    },
    2: {
        id: 2,
        title: "European Explorer",
        description: "14-day tour through 5 European countries including France, Switzerland, Italy, Austria and Germany.",
        duration: "14 days",
        location: "Multiple Countries",
        price: 1899,
        rating: 4.9,
        reviewCount: 32,
        image: "images/europe-hero.jpg",
        highlights: [
            "Eiffel Tower visit in Paris",
            "Swiss Alps train journey",
            "Venice gondola ride",
            "Neuschwanstein Castle tour",
            "Salzburg musical heritage"
        ],
        itinerary: [
            // Similar itinerary structure as Bali tour
        ],
        gallery: [
            "images/europe-1.jpg",
            "images/europe-2.jpg"
        ],
        details: {
            groupSize: "4-16 people",
            languages: "English, French, German",
            meals: "Breakfast daily, 5 dinners",
            accommodation: "3-4 star hotels",
            difficulty: "Easy",
            minAge: 10
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Get tour ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id') || 1; // Default to Bali if no ID
    
    // Load tour data
    const tour = tours[tourId];
    if (!tour) {
        window.location.href = 'tours.html';
        return;
    }

    // Populate tour data
    document.getElementById('tour-title').textContent = tour.title;
    document.getElementById('tour-duration').textContent = tour.duration;
    document.getElementById('tour-duration-side').textContent = tour.duration;
    document.getElementById('tour-location').textContent = tour.location;
    document.getElementById('tour-rating').textContent = `${tour.rating} (${tour.reviewCount} reviews)`;
    document.getElementById('tour-price').textContent = `$${tour.price}`;
    document.getElementById('tour-description').textContent = tour.description;
    document.getElementById('tour-hero-image').style.backgroundImage = `url(${tour.image})`;

    // Set up booking link with tour ID
    document.querySelectorAll('.book-tour-btn').forEach(btn => {
        btn.href = `booking.html?tour=${tour.id}`;
    });

    // Populate highlights
    const highlightsList = document.getElementById('tour-highlights');
    highlightsList.innerHTML = '';
    tour.highlights.forEach(highlight => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle text-primary me-2"></i> ${highlight}`;
        highlightsList.appendChild(li);
    });

    // Populate itinerary
    const itineraryContainer = document.getElementById('tour-itinerary');
    itineraryContainer.innerHTML = '';
    tour.itinerary.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'itinerary-day';
        dayDiv.innerHTML = `
            <h4>Day ${day.day}: ${day.title}</h4>
            <p>${day.description}</p>
        `;
        itineraryContainer.appendChild(dayDiv);
    });

    // Populate gallery
    const galleryContainer = document.getElementById('lightgallery');
    galleryContainer.innerHTML = '';
    tour.gallery.forEach(image => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 gallery-item';
        colDiv.setAttribute('data-src', image);
        colDiv.innerHTML = `
            <img src="${image}" class="img-fluid rounded" alt="${tour.title}">
        `;
        galleryContainer.appendChild(colDiv);
    });

    // Populate tour details
    const detailsItems = [
        { icon: 'users', text: 'Group Size', value: tour.details.groupSize },
        { icon: 'language', text: 'Language', value: tour.details.languages },
        { icon: 'utensils', text: 'Meals', value: tour.details.meals },
        { icon: 'bed', text: 'Accommodation', value: tour.details.accommodation },
        { icon: 'running', text: 'Difficulty', value: tour.details.difficulty },
        { icon: 'user', text: 'Minimum Age', value: tour.details.minAge }
    ];

    const detailsList = document.querySelector('.list-group');
    detailsList.innerHTML = '';
    detailsItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span><i class="fas fa-${item.icon} text-primary me-2"></i> ${item.text}</span>
            <span>${item.value}</span>
        `;
        detailsList.appendChild(li);
    });

    // Initialize lightGallery after dynamic content is loaded
    lightGallery(document.getElementById('lightgallery'), {
        selector: '.gallery-item',
        download: false,
        zoom: true,
        fullScreen: true
    });
});

// Add event listener for inquiry button
document.querySelector('.inquiry-btn').addEventListener('click', function() {
    const tourTitle = document.getElementById('tour-title').textContent;
    window.location.href = `contact.html?subject=Inquiry about ${encodeURIComponent(tourTitle)}`;
});