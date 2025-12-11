// Initial Setup & Loading
window.addEventListener('load', () => {
    const loader = document.getElementById('loading');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            initAnimations(); // Start animations after loading
        }, 500);
    }, 1500); // Fake load time
});

function initAnimations() {
    startHeroAnimation();
    startScrollAnimations();
    startConfetti();
}

// Hero Section: Typewriter
function startHeroAnimation() {
    const text = "20 years of being my partner-in-crime—remember. You are 20thhhh sukleyyy like literally..😂 when we thought we'd rule the world? Well, you're still my Queen, even if our kingdom is just Netflix and snacks! (not Gold & Diamonds) Love, Harmain 💕😂";
    const container = document.getElementById('typewriter-text');
    let i = 0;
    const speed = 50;

    function typeWriter() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();

    // Floating hearts background
    const hero = document.querySelector('.floating-hearts-bg');
    for (let j = 0; j < 20; j++) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart');
        heart.style.position = 'absolute';
        heart.style.color = 'rgba(255, 209, 220, 0.4)';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animation = `float ${Math.random() * 3 + 2}s infinite ease-in-out`;

        // Easter Egg
        heart.addEventListener('mouseenter', function (e) {
            showCompliment(e.clientX, e.clientY);
            this.style.color = '#ff0055';
            setTimeout(() => this.style.color = 'rgba(255, 209, 220, 0.4)', 1000);
        });

        hero.appendChild(heart);
    }
}

function showCompliment(x, y) {
    const compliments = ["You're Amazing!", "Bestie Goals!", "Queen!", "Love ya!", "Beautiful!", "Kind soul"];
    const comp = document.createElement('div');
    comp.innerText = compliments[Math.floor(Math.random() * compliments.length)];
    comp.style.position = 'fixed';
    comp.style.left = x + 'px';
    comp.style.top = y + 'px';
    comp.style.color = '#D4AF37';
    comp.style.fontWeight = 'bold';
    comp.style.pointerEvents = 'none';
    comp.style.transition = 'all 1s';
    comp.style.zIndex = '1000';
    document.body.appendChild(comp);

    setTimeout(() => {
        comp.style.transform = 'translateY(-50px)';
        comp.style.opacity = '0';
        setTimeout(() => comp.remove(), 1000);
    }, 50);
}

// GSAP Scroll Animations
function startScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline Items
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleClass: "visible"
                // once: true
            }
        });
    });

    // Poem Lines
    const lines = document.querySelectorAll('.poem-line');
    lines.forEach((line, index) => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: '#poem',
                start: "top 70%"
            },
            delay: index * 0.8,
            onStart: () => {
                line.classList.add('visible');
            }
        });
    });
}

// Confetti Effect
function startConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Surprises: Gift Box
const giftBox = document.getElementById('gift-box');
const giftMessage = document.getElementById('gift-message');
let giftOpened = false;

giftBox.addEventListener('click', () => {
    if (!giftOpened) {
        giftBox.classList.add('open');
        setTimeout(() => {
            giftMessage.classList.remove('hidden');
            gsap.from(giftMessage, { opacity: 0, y: 10, duration: 0.5 });
            launchSmallConfetti();
        }, 500);
        giftOpened = true;
    }
});

function launchSmallConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}


// --- Intersection Observer for Scroll Animations ---
const observerOptions = {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: "0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once visible if you don't want it to re-trigger
            // scrollObserver.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observe generalized fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    scrollObserver.observe(el);
});

// Surprises: Memory Game (Simple Version)
// Memory Game Cards
const gameContainer = document.getElementById('memory-game');

const cardsData = [
    { front: "Best Listener", back: "❤️" },
    { front: "Best Supporter", back: "😭" },
    { front: "Netflix Buddy", back: "💕" },
    { front: "2005 Born", back: "✨" }
];

cardsData.forEach(cardData => {
    const card = document.createElement('div');
    card.classList.add('memory-card');

    card.innerHTML = `
        <div class="front">${cardData.front}</div>
        <div class="back">${cardData.back}</div>
    `;

    // Flip on click
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    gameContainer.appendChild(card);
});

// Countdown Timer
const birthday = new Date('December 29, 2025 00:00:00').getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthday - now;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = "HAPPY BIRTHDAY!";
        startConfetti(); // Again!
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);

// Wish Form
document.getElementById('wish-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Message sent to Harmain! (This is a demo, but she feels the love!)");
    e.target.reset();
});






