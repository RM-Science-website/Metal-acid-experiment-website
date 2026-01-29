// Console message
console.log('%c🔬 Welcome to Metal-Acid Reaction Study!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cExplore the interactive science behind surface contamination effects', 'font-size: 14px; color: #06b6d4;');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.style.animation;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('[class*="animate"], [class*="slide"], [class*="fade"], [class*="scale"]').forEach(el => {
    observer.observe(el);
});

// Active navigation link highlighting
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn, .cta-button, .check-btn, .answer-option').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    .btn, .cta-button, .check-btn, .answer-option {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Page transition animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.animation = 'pageLoad 0.5s ease-out forwards';
});

// Add page load animation to CSS
const pageLoadStyle = document.createElement('style');
pageLoadStyle.textContent = `
    @keyframes pageLoad {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(pageLoadStyle);

// Counter animation for numbers (if any)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// Add interactive feedback to cards
document.querySelectorAll('.feature-card, .material-card, .step-card, .result-card, .condition-card, .equipment-card, .implication-card, .future-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform.includes('scale') ? 'scale(1.02)' : 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Advanced prediction game logic
let correctAnswers = {
    q1: 'skin',
    q2: ['cleaned', 'untouched', 'skin'],
    q3: 'magnesium',
    q4: 'disrupts',
    q5: 'skin'
};

let userAnswers = {
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null
};

// Make these available globally for HTML onclick
window.checkAnswer = function(element, questionId, answer) {
    // Remove previous selection
    element.parentElement.querySelectorAll('.answer-option').forEach(el => {
        el.classList.remove('selected');
    });

    element.classList.add('selected');
    userAnswers[questionId] = answer;

    const feedback = document.getElementById(`feedback-${questionId}`);
    const isCorrect = answer === correctAnswers[questionId];

    if (isCorrect) {
        feedback.innerHTML = '<span style="color: #10b981; font-weight: 700;">✓ Correct! Well done!</span>';
        element.classList.add('correct');
        // Add celebration animation
        celebrateCorrect(element);
    } else {
        feedback.innerHTML = '<span style="color: #ef4444; font-weight: 700;">✗ Incorrect. Think about how surface contamination affects reactions.</span>';
        element.classList.add('incorrect');
    }

    updateScore();
};

if (!window.checkRanking) {
    window.checkRanking = function() {
        // If the select-based ranking exists on the page, evaluate it.
        const fastEl = document.getElementById('rank-fastest');
        if (fastEl) {
            const s0 = document.getElementById('rank-fastest').value;
            const s1 = document.getElementById('rank-middle').value;
            const s2 = document.getElementById('rank-slowest').value;

            if (!s0 || !s1 || !s2) {
                alert('Please select all three conditions.');
                return;
            }

            if (new Set([s0, s1, s2]).size !== 3) {
                alert('Please choose each condition only once.');
                return;
            }

            const userOrder = [s0, s1, s2];
            const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctAnswers.q2);
            userAnswers.q2 = isCorrect;
            const feedback = document.getElementById('feedback-q2');

            if (isCorrect) {
                if (feedback) feedback.innerHTML = '<span style="color: #10b981; font-weight:700;">✓ Correct! Cleaned → Untouched → Skin Contact</span>';
                celebrateCorrect(fastEl);
            } else {
                if (feedback) feedback.innerHTML = '<span style="color: #ef4444; font-weight:700;">✗ Incorrect. Should be: Cleaned (fastest) → Untouched → Skin Contact (slowest)</span>';
            }

            updateScore();
            return;
        }

        // Fallback message for other ranking implementations
        alert('Perfect! The ranking should be: Cleaned (fastest) → Untouched (middle) → Skin Contact (slowest)');
    };
}

// Disable already-selected options across the three ranking selects to prevent duplicates
function syncRankingOptions() {
    const ids = ['rank-fastest', 'rank-middle', 'rank-slowest'];
    const selects = ids.map(id => document.getElementById(id)).filter(s => s);
    const values = selects.map(s => s.value).filter(v => v);

    selects.forEach(s => {
        Array.from(s.options).forEach(opt => {
            if (!opt.value) {
                opt.disabled = false;
                return;
            }
            // disable option if chosen in another select
            opt.disabled = values.includes(opt.value) && s.value !== opt.value;
        });
    });
}

// Hamburger menu toggle for mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    const ids = ['rank-fastest', 'rank-middle', 'rank-slowest'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', syncRankingOptions);
    });
    // run once in case page already loaded
    try { syncRankingOptions(); } catch (e) {}
});

window.updateScore = function() {
    let score = 0;
    if (userAnswers.q1 === correctAnswers.q1) score++;
    if (userAnswers.q2 === true) score++;
    if (userAnswers.q3 === correctAnswers.q3) score++;
    if (userAnswers.q4 === correctAnswers.q4) score++;
    if (userAnswers.q5 === correctAnswers.q5) score++;
    
    // Update displayed score if at least 3 answered
    if (Object.values(userAnswers).filter(v => v !== null).length >= 3) {
        const scoreSection = document.getElementById('score-section');
        if (scoreSection) {
            scoreSection.style.display = 'block';
            document.getElementById('score-number').textContent = score;
        }
    }
};

window.resetGame = function() {
    userAnswers = { q1: null, q2: null, q3: null, q4: null, q5: null };
    document.querySelectorAll('.answer-option').forEach(el => {
        el.classList.remove('selected', 'correct', 'incorrect');
    });
    document.querySelectorAll('.feedback').forEach(el => {
        el.innerHTML = '';
    });
    const scoreSection = document.getElementById('score-section');
    if (scoreSection) {
        scoreSection.style.display = 'none';
    }
};

// Celebrate correct answer with animation
function celebrateCorrect(element) {
    // Create confetti effect
    for (let i = 0; i < 5; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#6366f1', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        const rect = element.getBoundingClientRect();
        confetti.style.left = (rect.left + rect.width / 2) + 'px';
        confetti.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 2;
        
        let x = parseFloat(confetti.style.left);
        let y = parseFloat(confetti.style.top);
        let velocityY = vy;
        
        const animate = () => {
            x += vx;
            y += velocityY;
            velocityY += 0.1; // gravity
            
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.opacity = 1 - (y / window.innerHeight);
            
            if (y < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        animate();
    }
}

// Smooth data visualization on scroll
const chartElements = document.querySelectorAll('.data-bar');
if (chartElements.length > 0) {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'growUp 0.8s ease-out backwards';
                chartObserver.unobserve(entry.target);
            }
        });
    });

    chartElements.forEach(bar => chartObserver.observe(bar));
}
