// ============================================
// apology.js — Page 2: The Apology
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Reveal Letter Text Line by Line ---
    const lines = document.querySelectorAll('.letter-line');
    let lineIndex = 0;

    function revealLine() {
        if (lineIndex < lines.length) {
            lines[lineIndex].classList.add('fade-in-up');
            lineIndex++;
            setTimeout(revealLine, 400);
        } else {
            // Show signature and button after all lines
            setTimeout(() => {
                document.querySelector('.letter-signature').classList.add('fade-in-up');
            }, 300);
            setTimeout(() => {
                document.querySelector('.apology-next-btn').classList.add('fade-in-up');
            }, 600);
        }
    }

    // Start after a short delay
    setTimeout(revealLine, 800);

    // --- Next Button ---
    const nextBtn = document.getElementById('btn-next-special');
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateWithTransition('special.html');
    });
});
