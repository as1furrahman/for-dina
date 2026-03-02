// ============================================
// promise.js — Page 4: Make It Up To You
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const choices = {};

    // --- Choice Selection ---
    document.querySelectorAll('.choice-group').forEach(group => {
        const key = group.getAttribute('data-key');
        const items = group.querySelectorAll('.choice-item');

        items.forEach(item => {
            item.addEventListener('click', () => {
                // Remove selected from siblings
                items.forEach(i => i.classList.remove('selected'));
                // Select this one
                item.classList.add('selected');
                choices[key] = {
                    emoji: item.querySelector('.choice-emoji').textContent,
                    label: item.querySelector('.choice-label').textContent
                };
                // Save to localStorage
                localStorage.setItem('dinaChoices', JSON.stringify(choices));
                // Check if all groups have selection
                checkAllSelected();
            });
        });
    });

    function checkAllSelected() {
        const groups = document.querySelectorAll('.choice-group');
        const allSelected = Array.from(groups).every(g => {
            return g.querySelector('.choice-item.selected');
        });
        const nextBtn = document.querySelector('.promise-next-btn');
        if (allSelected) {
            nextBtn.classList.add('fade-in-up');
            nextBtn.style.visibility = 'visible';
        }
    }

    // --- Feedback Textarea ---
    const feedbackEl = document.getElementById('dina-feedback');
    if (feedbackEl) {
        // Restore any previously typed feedback
        const savedFeedback = localStorage.getItem('dinaFeedback') || '';
        feedbackEl.value = savedFeedback;

        // Save on every keystroke
        feedbackEl.addEventListener('input', () => {
            localStorage.setItem('dinaFeedback', feedbackEl.value);
        });
    }

    // --- Next Button ---
    const nextBtn = document.getElementById('btn-next-final');
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Save feedback one final time before navigating
        if (feedbackEl) {
            localStorage.setItem('dinaFeedback', feedbackEl.value);
        }
        navigateWithTransition('final.html');
    });

    // --- Animate sections in ---
    const sections = document.querySelectorAll('.choice-section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in-up');
        }, index * 300 + 400);
    });
});
