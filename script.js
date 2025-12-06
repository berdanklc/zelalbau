// Smooth Scrolling für Navigation mit verbessertem Offset
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Schließe Mobile Menu nach Klick
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            navToggle.checked = false;
        }
        
        // Hole das Ziel
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Berechne die Position mit Offset für die Navbar
            const navbarHeight = 90;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            // Scrolle zur Position
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll-Effekt
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Füge Shadow hinzu beim Scrollen
    if (currentScroll > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animation on Scroll (verbesserte Version)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Verzögerte Animation für schönen Effekt
            setTimeout(() => {
                entry.target.classList.add('fade-in-visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Elemente beobachten
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.service-category, .reference-card, .about-content, .contact-wrapper');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Aktualisiere aktiven Nav-Link beim Scrollen
    updateActiveNavLink();
});

// Aktualisiere aktiven Navigationspunkt
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Formular Handling - Einfache Version für FormSubmit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Lasse FormSubmit den normalen Submit durchführen
        // Keine e.preventDefault() mehr - das Formular wird normal gesendet
        // FormSubmit leitet dann automatisch zu einer Bestätigungsseite weiter
    });
}

// Success Modal Funktionen
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Modal schließen beim Klick außerhalb des Inhalts
document.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (modal && e.target === modal) {
        closeSuccessModal();
    }
});

// Modal mit ESC-Taste schließen
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSuccessModal();
    }
});
