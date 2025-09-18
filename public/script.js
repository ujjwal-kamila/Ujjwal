// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Custom Cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});


// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth Scrolling and Navigation
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-links a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        if (mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Active Navigation Highlighting
function updateActiveNav() {
    const sections = ['home', 'about', 'education', 'skills', 'projects', 'certifications', 'contact'];
    const scrollPosition = window.scrollY + 150;

    let currentSection = '';

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            if (scrollPosition >= section.offsetTop) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Header Background on Scroll
function updateHeaderBackground() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'none';
    }
}

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Contact Form Handling with EmailJS
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
    
    submitBtn.disabled = true;
    btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        await emailjs.sendForm('service_8jg1v1l', 'template_hvrwrew', e.target);
        successMessage.classList.add('show');
        e.target.reset();
    } catch (error) {
        console.error('Failed to send email:', error);
        errorMessage.classList.add('show');
    } finally {
        submitBtn.disabled = false;
        btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        setTimeout(() => {
            successMessage.classList.remove('show');
            errorMessage.classList.remove('show');
        }, 5000);
    }
});

// Scroll to Top Functionality
document.getElementById('scroll-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for Animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .skill-category, .project-card, .certification-card');
    const timelineItems = document.querySelectorAll('.education-item');

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.classList.add('reveal-up');
        observer.observe(el);
    });

    timelineItems.forEach(item => observer.observe(item));
}

// Certificate Modal Logic
function initializeModal() {
    const viewCredentialBtns = document.querySelectorAll('.view-credential-btn');
    const modalOverlay = document.getElementById('certificate-modal-overlay');
    const modalImage = document.getElementById('modal-cert-image');
    const closeModalBtn = document.getElementById('modal-close-btn');

    if (!modalOverlay) return;

    const openModal = (imgSrc) => {
        modalImage.src = imgSrc;
        modalOverlay.classList.add('show');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('show');
    };

    viewCredentialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(btn.dataset.imgSrc);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) closeModal();
    });
}

// Performance-friendly scroll listener
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    updateHeaderBackground();
    animateSkillBars();
    initializeAnimations();
    initializeModal();
});

window.addEventListener('scroll', debounce(() => {
    updateActiveNav();
    updateHeaderBackground();
}));

// Console welcome message
console.log(`
🚀 Welcome to Ujjwal Kamila's Portfolio!
📧 Contact: ujjwalkamila86@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/ujjwal-kamila-8a12a4262/
🔗 GitHub: https://github.com/ujjwal-kamila

Thanks for checking out the code!
`);
