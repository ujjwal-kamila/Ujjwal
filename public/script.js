// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
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
        
        // Close mobile menu if open
        mobileMenu.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
    });
});

// Active Navigation Highlighting
function updateActiveNav() {
    const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 150;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav links
                document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        }
    });
}

// Header Background on Scroll
function updateHeaderBackground() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.background = html.getAttribute('data-theme') === 'dark' 
            ? 'rgba(15, 23, 42, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = html.getAttribute('data-theme') === 'dark' 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNav();
    updateHeaderBackground();
});

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize skill bar animation
animateSkillBars();


// Contact Form Handling with EmailJS
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Hide previous messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.style.opacity = '0.7';
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        mobile: formData.get('mobile'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toLocaleString()
    };
    
    try {
        // Send email using EmailJS
        await emailjs.send('service_8jg1v1l', 'template_hvrwrew', {
            from_name: data.name,
            from_email: data.email,
            phone_number: data.mobile,
            subject: data.subject,
            message: data.message,
            time: data.timestamp,
            to_email: 'ujjwalkamila86@gmail.com'
        });
        
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        e.target.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Store message locally as backup
        const messages = JSON.parse(localStorage.getItem('portfolio-messages') || '[]');
        messages.push({
            ...data,
            id: Date.now(),
            status: 'sent'
        });
        localStorage.setItem('portfolio-messages', JSON.stringify(messages));
        
    } catch (error) {
        console.error('Error sending message:', error);
        errorMessage.classList.add('show');
        errorMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Store failed message locally
        const messages = JSON.parse(localStorage.getItem('portfolio-messages') || '[]');
        messages.push({
            ...data,
            id: Date.now(),
            status: 'failed',
            error: error.message
        });
        localStorage.setItem('portfolio-messages', JSON.stringify(messages));
        
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.style.opacity = '1';
        
        // Hide messages after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
            errorMessage.classList.remove('show');
        }, 5000);
    }
});

// Scroll to Top Functionality
document.getElementById('scroll-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .skill-category, .project-card, .education-item, .certification-card');
    
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
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Parallax Effect for Hero Background
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroShapes = document.querySelectorAll('.hero-shape');
        
        heroShapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Smooth Hover Effects
function initializeHoverEffects() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card, .certification-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card, .education-item');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    updateHeaderBackground();
    initializeAnimations();
    initializeParallax();
    initializeHoverEffects();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
    }
    
    // Toggle theme with Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNav();
    updateHeaderBackground();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log(`
🚀 Welcome to Ujjwal Kamila's Portfolio!
📧 Contact: ujjwalkamila86@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/ujjwal-kamila-8a12a4262/
🔗 GitHub: https://github.com/ujjwal-kamila

Thanks for checking out the code! 
Feel free to reach out if you have any questions.
`);