document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;

    // Otomatik slider
    let slideInterval = setInterval(nextSlide, 5000);

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Buton tıklama olayları
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.slider-container').addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.slider-container').addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            nextSlide();
        }
        if (touchEndX - touchStartX > 50) {
            // Swipe right
            prevSlide();
        }
    }
}); 