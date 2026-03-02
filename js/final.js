// ============================================
// final.js — Page 5: Will You Forgive Me?
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Load Choices from localStorage ---
    const choicesData = JSON.parse(localStorage.getItem('dinaChoices') || '{}');
    const summaryContainer = document.getElementById('choices-summary');

    if (Object.keys(choicesData).length > 0) {
        summaryContainer.innerHTML = '';
        const labels = {
            gift: 'For you',
            place: "Let's go to",
            food: "We'll eat"
        };
        Object.keys(choicesData).forEach(key => {
            const item = document.createElement('div');
            item.classList.add('summary-item', 'fade-in-up');
            item.innerHTML = `
        <span class="summary-emoji">${choicesData[key].emoji}</span>
        <span class="summary-text">${labels[key] || key}: ${choicesData[key].label}</span>
      `;
            summaryContainer.appendChild(item);
        });
    }

    // --- Runaway "No" Button ---
    const noBtn = document.getElementById('final-btn-no');

    let escapeCount = 0;
    const noTexts = ["No", "You sure? 🥺", "Think again!", "Please? 🙏", "💔", "😭"];

    noBtn.addEventListener('mouseenter', () => {
        noBtn.style.position = 'relative';
        noBtn.style.left = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 100) + 'px';
        noBtn.style.top = (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 60) + 'px';
        escapeCount++;
        if (escapeCount < noTexts.length) {
            noBtn.textContent = noTexts[escapeCount];
        }
    });

    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        noBtn.style.position = 'relative';
        noBtn.style.left = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 100) + 'px';
        noBtn.style.top = (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 60) + 'px';
        escapeCount++;
        if (escapeCount < noTexts.length) {
            noBtn.textContent = noTexts[escapeCount];
        }
    });

    // --- "Yes" Button — Confetti + Send Feedback ---
    const yesBtn = document.getElementById('final-btn-yes');
    yesBtn.addEventListener('click', () => {
        // Hide question
        document.querySelector('.final-question').style.display = 'none';
        document.querySelector('.forgive-buttons').style.display = 'none';
        if (summaryContainer) summaryContainer.style.display = 'none';

        // Show success
        const success = document.querySelector('.success-container');
        success.classList.add('visible');

        // Launch confetti
        launchConfetti();

        // Send feedback + choices to backend silently
        sendFeedbackToBackend(choicesData);
    });
});

// --- Send Feedback via Web3Forms ---
function sendFeedbackToBackend(choicesData) {
    const feedback = localStorage.getItem('dinaFeedback') || '';
    const forgiven = 'Yes';

    // Build choices summary text
    let choicesSummary = '';
    const labels = { gift: 'Gift', place: 'Place', food: 'Food' };
    Object.keys(choicesData).forEach(key => {
        choicesSummary += `${labels[key] || key}: ${choicesData[key].emoji} ${choicesData[key].label}\n`;
    });

    // Send via Web3Forms (free, no signup needed)
    const formData = new FormData();
    formData.append('access_key', 'YOUR_WEB3FORMS_KEY'); // Replace with your key from web3forms.com
    formData.append('subject', '💛 Dina responded to your apology!');
    formData.append('from_name', 'Dina\'s Apology Page');
    formData.append('Forgiven', forgiven);
    formData.append('Choices', choicesSummary || 'No choices made');
    formData.append('Dina\'s Message', feedback || 'No message left');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    }).catch(() => {
        // Silently fail — don't disrupt the experience
    });
}

// --- Confetti Engine ---
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#E8837C', '#F4B3AE', '#D4A853', '#F0D99A', '#C0526A', '#FF6B6B', '#FFC3A0', '#FF9AA2'];

    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: 8 + Math.random() * 8,
            h: 6 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: 2 + Math.random() * 4,
            speedX: (Math.random() - 0.5) * 3,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 0.8 + Math.random() * 0.2
        });
    }

    let frame = 0;
    const maxFrames = 300;

    function animate() {
        if (frame > maxFrames) {
            canvas.style.display = 'none';
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity * (1 - frame / maxFrames);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();

            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            p.speedX += (Math.random() - 0.5) * 0.2;
        });

        frame++;
        requestAnimationFrame(animate);
    }

    animate();
}
