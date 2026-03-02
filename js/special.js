// ============================================
// special.js — Page 3: Why You're Special
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Flip Cards ---
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach((card, index) => {
        // Animate cards in sequentially
        setTimeout(() => {
            card.classList.add('fade-in-up');
        }, index * 200 + 500);

        // Click to flip
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // --- Next Button ---
    const nextBtn = document.getElementById('btn-next-promise');
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateWithTransition('promise.html');
    });

    // Show button after cards
    setTimeout(() => {
        document.querySelector('.special-next-btn').classList.add('fade-in-up');
    }, flipCards.length * 200 + 1200);
});
