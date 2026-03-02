// ============================================
// main.js — Shared Utilities
// ============================================

// --- Floating Particles ---
function createParticles(container, count = 20) {
    const emojis = ['💛', '✨', '💫', '🌸', '💖', '⭐'];
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('span');
        particle.classList.add('particle');
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.fontSize = (14 + Math.random() * 12) + 'px';
        container.appendChild(particle);
    }
}

// Initialize particles on all pages
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        createParticles(particlesContainer);
    }
});

// --- Page Transition ---
function navigateWithTransition(url) {
    const overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    } else {
        window.location.href = url;
    }
}

// --- Intersection Observer for Animations ---
function observeElements(selector, className = 'visible') {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}
