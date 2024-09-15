// Select the carousel element
const carousel = document.querySelector('.clients-carousel');
const noClientsMessage = document.querySelector('.no-clients-message');
let scrollSpeed = 0.5; // Pixels per frame
const scrollSpeedMultiplier = 60; // Helps convert the speed to pixels per second
let carouselWidth = carousel.scrollWidth;
let isPaused = false;
let pos = 0;

// Function to move the carousel
function moveCarousel() {
    if (!isPaused) {
        pos -= scrollSpeed * scrollSpeedMultiplier / 60; // 60 fps assumption

        // Reset the position when the scroll reaches the end of the carousel
        if (Math.abs(pos) >= carouselWidth / 2) {
            pos = 0;
        }

        // Move the carousel
        carousel.style.transform = `translateX(${pos}px)`;
    }
    requestAnimationFrame(moveCarousel);
}

// Function to duplicate items for infinite scroll effect
function duplicateItems() {
    const items = Array.from(document.querySelectorAll('.item'));
    if (items.length > 0) {
        noClientsMessage.style.display = 'none'; // Hide the no-clients message
        const visibleItems = Math.ceil(window.innerWidth / 150);  // Adjust 150 based on item width
        const clonesNeeded = visibleItems * 2;  // Duplicate enough items to make it smooth
        for (let i = 0; i < clonesNeeded; i++) {
            const clone = items[i % items.length].cloneNode(true);
            carousel.appendChild(clone);
        }
        carouselWidth = carousel.scrollWidth;
    } else {
        noClientsMessage.style.display = 'block'; // Show the no-clients message
    }
}

// Event listener for window resize
window.addEventListener('resize', () => {
    carouselWidth = carousel.scrollWidth;
});

// Pause on hover
carousel.addEventListener('mouseenter', () => {
    isPaused = true;
});

carousel.addEventListener('mouseleave', () => {
    isPaused = false;
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].pageX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].pageX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        scrollSpeed = 3 * scrollSpeedMultiplier / 60;  // Swipe left: speed up scroll
    } else if (touchEndX > touchStartX) {
        scrollSpeed = -3 * scrollSpeedMultiplier / 60;  // Swipe right: reverse scroll
    }
    // Reset speed after a short delay
    setTimeout(() => {
        scrollSpeed = 0.5 * scrollSpeedMultiplier / 60;
    }, 1000);
}

// Mouse dragging support
let isDragging = false;
let startX, scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDragging = false;
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 3; // Scroll speed
    carousel.scrollLeft = scrollLeft - walk;
});

// Initialize the carousel
window.onload = function () {
    duplicateItems();
    moveCarousel();
};
