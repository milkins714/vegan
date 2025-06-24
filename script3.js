document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });

    mainImage.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        modalImg.alt = this.alt;
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const productName = document.querySelector('.product-title').textContent;

    loadReviews();

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const review = {
            name: document.getElementById('reviewName').value,
            rating: document.getElementById('reviewRating').value,
            text: document.getElementById('reviewText').value,
            date: new Date().toLocaleDateString('ru-RU'),
            product: productName
        };

        saveReview(review);
        addReviewToDOM(review);
        reviewForm.reset();
    });

    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const productReviews = reviews.filter(r => r.product === productName);
        
        productReviews.forEach(review => {
            addReviewToDOM(review);
        });
    }

    function addReviewToDOM(review) {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        const reviewEl = document.createElement('div');
        reviewEl.className = 'review';
        reviewEl.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.name}</span>
                <span class="review-rating">${stars}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        
        reviewsContainer.prepend(reviewEl);
    }
});