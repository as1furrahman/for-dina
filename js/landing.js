// ============================================
// landing.js — Page 1: Landing
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Typewriter Effect ---
    const typewriterEl = document.getElementById('typewriter-text');
    const text = typewriterEl.getAttribute('data-text');
    typewriterEl.textContent = '';
    let charIndex = 0;

    function typeChar() {
        if (charIndex < text.length) {
            typewriterEl.textContent += text[charIndex];
            charIndex++;
            setTimeout(typeChar, 80 + Math.random() * 60);
        } else {
            typewriterEl.classList.remove('typewriter-cursor');
            // Show subtitle and buttons after typing
            document.querySelector('.landing-subtitle').classList.add('fade-in-up');
            setTimeout(() => {
                document.querySelector('.hero-image').classList.add('fade-in-up');
            }, 200);
            setTimeout(() => {
                document.querySelector('.landing-buttons').classList.add('fade-in-up');
            }, 500);
        }
    }

    setTimeout(typeChar, 600);

    // --- "No" Button Shrink/Run ---
    const noBtn = document.getElementById('btn-no');
    let noClickCount = 0;
    const noTexts = [
        "No 😤",
        "Are you sure? 🥺",
        "Really?? 😢",
        "Please? 🙏",
        "Pretty please? 💔",
        "I'm shrinking... 😭",
        "🥺🥺🥺",
        "...",
    ];

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        noClickCount++;

        if (noClickCount < noTexts.length) {
            noBtn.textContent = noTexts[noClickCount];
            noBtn.style.transform = `scale(${1 - noClickCount * 0.1})`;
            noBtn.classList.add('shake');
            setTimeout(() => noBtn.classList.remove('shake'), 500);
        }

        if (noClickCount >= noTexts.length - 1) {
            noBtn.style.opacity = '0.3';
            noBtn.style.pointerEvents = 'none';
            noBtn.style.transform = 'scale(0.3)';
        }
    });

    // --- "Yes" Button ---
    const yesBtn = document.getElementById('btn-yes');
    yesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateWithTransition('apology.html');
    });
});
