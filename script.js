document.addEventListener('DOMContentLoaded', function() {
    // Слайдер
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Инициализация слайдера
    showSlide(0);
    startSlider();

    // Обработчики событий
    nextBtn.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    prevBtn.addEventListener('click', () => {
        stopSlider();
        prevSlide();
        startSlider();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            stopSlider();
            showSlide(parseInt(this.dataset.slide));
            startSlider();
        });
    });

    // Анимация при прокрутке
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .about-image, .cta-section h2, .cta-section p, .cta-buttons');
        const windowHeight = window.innerHeight;
        const triggerBottom = windowHeight * 0.85;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });

        // Проверяем секцию CTA целиком
        const ctaSection = document.querySelector('.cta-section');
        const ctaTop = ctaSection.getBoundingClientRect().top;
        
        if (ctaTop < triggerBottom) {
            ctaSection.classList.add('visible');
        }
    };

    // Проверяем при загрузке
    animateOnScroll();

    // Проверяем при прокрутке
    window.addEventListener('scroll', animateOnScroll);
});