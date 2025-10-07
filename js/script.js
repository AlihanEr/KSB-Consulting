// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Prevent menu clicks from closing the menu
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        document.body.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('scrolled');
        document.body.classList.remove('navbar-scrolled');
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, approach cards, and other elements
document.querySelectorAll('.service-card, .approach-card, .feature-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== BRANDS SLIDER =====
// Carousel runs continuously without pausing

// ===== CONTACT FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would normally send the data to a server
        console.log('Form submitted:', data);

        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== COUNTER ANIMATION FOR STATS =====
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observe stats and trigger counter when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;

            // Extract number from text (e.g., "150+" -> 150)
            const match = text.match(/\d+/);
            if (match) {
                const target = parseInt(match[0]);
                const suffix = text.replace(/\d+/, '');

                animateCounter({
                    textContent: ''
                }, target, 2000);

                // Update with suffix
                let current = 0;
                const timer = setInterval(() => {
                    current += target / 120;
                    if (current >= target) {
                        statNumber.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current) + suffix;
                    }
                }, 16);
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== TYPING EFFECT FOR HERO TITLE (OPTIONAL) =====
const heroTitleMain = document.querySelector('.hero-title-main');
if (heroTitleMain) {
    const originalText = heroTitleMain.textContent;
    let charIndex = 0;

    // Uncomment below to enable typing effect
    /*
    heroTitleMain.textContent = '';

    const typeWriter = () => {
        if (charIndex < originalText.length) {
            heroTitleMain.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
    */
}

// ===== SERVICES CARDS STAGGER ANIMATION =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ===== ADD LOADING CLASS TO BODY =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== PREVENT ANIMATIONS ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Remove no-transition class after a brief delay
    setTimeout(() => {
        document.body.classList.add('animations-ready');
    }, 100);
});

// ===== LAZY LOADING FOR IMAGES (when you add brand logos) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // Use this when you add actual images: data-src="path/to/image.jpg"
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SCROLL TO TOP BUTTON (OPTIONAL) =====
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
    `;

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    document.body.appendChild(button);
};

// Uncomment to enable scroll to top button
// createScrollTopButton();

console.log('KSB Consulting website loaded successfully!');
