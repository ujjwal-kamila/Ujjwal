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
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
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
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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

// Download CV Functionality
document.getElementById('download-cv').addEventListener('click', () => {
    const cvContent = `UJJWAL KAMILA
Full-Stack Developer & Problem Solver

CONTACT INFORMATION
Email: ujjwalkamila86@gmail.com
Phone: +91 81011 93171
LinkedIn: https://www.linkedin.com/in/ujjwal-kamila-8a12a4262/
GitHub: https://github.com/ujjwal-kamila
LeetCode: https://leetcode.com/u/ujjwalkamila86/
Facebook: https://www.facebook.com/ujjwalkamila.ujjwal/
Twitter: https://x.com/ujjwalkamila86

PROFESSIONAL SUMMARY
Passionate Full-Stack Developer with 3+ years of experience in building scalable web applications 
and solving complex technical challenges. Expertise in Python, Java, and C++ with a strong focus 
on creating maintainable and efficient solutions. Currently seeking full-time opportunities to 
contribute to innovative projects and grow alongside talented teams.

TECHNICAL SKILLS
Programming Languages:
• Python (90%) - Advanced proficiency in web development and data analysis
• Java (75%) - Strong foundation in object-oriented programming
• C/C++ (80%) - System programming and algorithm implementation

Web Technologies:
• HTML (90%) - Semantic markup and accessibility best practices
• CSS (80%) - Modern styling, animations, and responsive design
• JavaScript (70%) - DOM manipulation and modern ES6+ features

Databases & Tools:
• MySQL (80%) - Database design, optimization, and complex queries
• Git (90%) - Version control, branching strategies, and collaboration
• Docker (60%) - Containerization and deployment workflows

Frameworks & Libraries:
• Django (80%) - Full-stack web development with Python

Other Technologies:
• AWS - Cloud services and deployment
• Linux/Ubuntu - Server administration and command line
• Windows - Development environment setup
• VS Code - Primary development environment
• PyCharm - Python-specific development
• Replit - Online development and collaboration

FEATURED PROJECTS

1. E-Commerce Platform
   Technologies: HTML, CSS, JavaScript, Bootstrap
   • Developed full-stack e-commerce solution with user authentication
   • Integrated payment gateway for secure transactions
   • Built responsive admin dashboard for inventory management
   • GitHub: https://github.com/ujjwal-kamila/ecommerce-project
   • Live Demo: https://ecommerce-demo.netlify.app

2. Task Management System
   Technologies: Python, Django, SQLite, Bootstrap
   • Created comprehensive project management tool
   • Implemented real-time task updates and team collaboration
   • Developed advanced filtering and search capabilities
   • GitHub: https://github.com/ujjwal-kamila/task-manager
   • Live Demo: https://task-manager-demo.herokuapp.com

3. Data Analytics Dashboard
   Technologies: Python, Pandas, Matplotlib, NumPy
   • Built interactive dashboard for data visualization
   • Integrated machine learning insights and predictive analytics
   • Automated report generation and export functionality
   • GitHub: https://github.com/ujjwal-kamila/data-analytics
   • Live Demo: https://analytics-dashboard-demo.streamlit.app

4. Inventory Management System
   Technologies: C++, Qt, SQLite, OpenCV
   • Developed robust inventory tracking system
   • Implemented barcode scanning integration
   • Created automated stock alerts and comprehensive reporting
   • GitHub: https://github.com/ujjwal-kamila/inventory-system
   • Live Demo: https://inventory-demo.vercel.app

WHAT I BRING TO YOUR TEAM
• Strong problem-solving skills with algorithmic thinking
• Experience with full-stack web development lifecycle
• Proficient in database design and optimization
• Collaborative team player with excellent communication skills
• Quick learner who adapts to new technologies and frameworks
• Passionate about writing clean, maintainable, and scalable code

CAREER OBJECTIVES
Currently seeking full-time opportunities where I can:
• Contribute to innovative software development projects
• Work with cutting-edge technologies and frameworks
• Collaborate with talented development teams
• Grow professionally while making meaningful impact
• Apply my technical skills to solve real-world problems

AVAILABILITY
Open to full-time opportunities
Available for immediate start
Willing to relocate for the right opportunity

EDUCATION
Bachelor of Technology in Computer Science
[University Name] - [Year]

CERTIFICATIONS
• Python for Data Science and Web Development
• Java Programming Certification
• Full-Stack Web Development Bootcamp
• Database Design and Management

---
Generated from portfolio website: [Your Portfolio URL]
Last updated: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ujjwal_Kamila_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

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
    const animatedElements = document.querySelectorAll('.feature-card, .skill-category, .project-card');
    
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
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
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