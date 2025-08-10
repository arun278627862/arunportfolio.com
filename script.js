// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    setupNavigation();
    setupThemeToggle();
    setupMobileMenu();
    setupScrollAnimations();
    setupSkillBars();
    setupSkillTooltips();
    setupContactForm();
    setupSmoothScrolling();
    setupScrollIndicator();
    loadTheme();
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });
    
    // Add click handlers for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            closeMobileMenu();
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        toggleTheme();
    });
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    // Set dark mode as default if no saved theme
    if (!savedTheme || savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animation when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe individual cards and elements
    const cards = document.querySelectorAll('.project-card, .achievement-card, .competency-item, .experience-content, .education-item');
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Skill bar animations
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.setAttribute('data-width', width);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
            bar.classList.add('animate');
        }, index * 200);
    });
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(contactForm);
        });
        
        // Add floating labels effect
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you! Your message has been received.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for all internal links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll indicator
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Add CSS for animations
const additionalStyles = `
    <style>
        .navbar.scrolled {
            background: var(--nav-bg);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 20px var(--shadow-color);
        }
        
        .nav-link.active {
            color: var(--secondary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: var(--nav-bg);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                backdrop-filter: blur(20px);
                padding: 2rem 0;
                z-index: 999;
            }
            
            .nav-menu.active {
                left: 0;
            }
        }
        
        .notification {
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
            }
            to {
                transform: translateX(0);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));

// Skill tooltip system
function setupSkillTooltips() {
    const skillData = {
        'PCB Rework': {
            level: 'Expert (95%)',
            description: 'Advanced surface mount and through-hole component repair, micro-soldering, and board-level troubleshooting.',
            experience: '4+ years of hands-on experience'
        },
        'Soldering': {
            level: 'Expert (92%)',
            description: 'Precision soldering techniques, IPC standards compliance, and defect-free assembly processes.',
            experience: '4+ years in production environments'
        },
        'ERP Systems': {
            level: 'Advanced (88%)',
            description: 'Enterprise resource planning implementation, data management, and process optimization.',
            experience: '3+ years with various ERP platforms'
        },
        'Automation': {
            level: 'Advanced (85%)',
            description: 'Industrial automation, process control systems, and workflow optimization.',
            experience: '3+ years in manufacturing automation'
        },
        'Equipment Calibration': {
            level: 'Advanced (88%)',
            description: 'Precision measurement tools calibration, quality assurance, and compliance maintenance.',
            experience: '3+ years with calibration procedures'
        },
        'Circuit Troubleshooting': {
            level: 'Expert (90%)',
            description: 'Electrical fault diagnosis, component testing, and systematic problem resolution.',
            experience: '4+ years in circuit analysis'
        },
        'Team Leadership': {
            level: 'Expert (90%)',
            description: 'Leading cross-functional teams, mentoring, and driving performance improvements.',
            experience: '2+ years in leadership roles'
        },
        'Process Improvement': {
            level: 'Expert (93%)',
            description: 'Lean manufacturing, Six Sigma methodologies, and continuous improvement initiatives.',
            experience: '4+ years in process optimization'
        },
        'Quality Control': {
            level: 'Expert (91%)',
            description: 'Quality systems implementation, defect prevention, and compliance management.',
            experience: '4+ years in quality assurance'
        },
        'Root Cause Analysis': {
            level: 'Advanced (87%)',
            description: 'Systematic problem-solving using Why-Why analysis and statistical tools.',
            experience: '3+ years in problem resolution'
        },
        'Inventory Control': {
            level: 'Advanced (85%)',
            description: 'Supply chain management, stock optimization, and inventory tracking systems.',
            experience: '3+ years in inventory management'
        },
        'OEE Optimization': {
            level: 'Advanced (88%)',
            description: 'Overall Equipment Effectiveness improvement, downtime reduction, and efficiency metrics.',
            experience: '3+ years in OEE implementation'
        },
        'AI-Powered Quality Inspection': {
            level: 'Intermediate (82%)',
            description: 'Machine learning algorithms for defect detection and automated quality assessment.',
            experience: '2+ years in AI applications'
        },
        'AI Process Optimization': {
            level: 'Intermediate (78%)',
            description: 'Artificial intelligence for manufacturing process enhancement and predictive analytics.',
            experience: '1+ years in AI-driven optimization'
        },
        'Machine Learning Applications': {
            level: 'Intermediate (75%)',
            description: 'ML model development for industrial applications and data-driven decision making.',
            experience: '1+ years in ML implementation'
        },
        'Microsoft Excel': {
            level: 'Expert (95%)',
            description: 'Advanced formulas, pivot tables, macros, and data analysis for business intelligence.',
            experience: '5+ years of advanced usage'
        },
        'Power BI': {
            level: 'Advanced (85%)',
            description: 'Business intelligence dashboards, data visualization, and reporting solutions.',
            experience: '2+ years in BI development'
        },
        'Microsoft Office Suite': {
            level: 'Expert (90%)',
            description: 'Comprehensive productivity suite utilization for documentation and presentations.',
            experience: '5+ years of professional usage'
        }
    };

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    document.body.appendChild(tooltip);

    // Add click handlers to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const skillName = item.querySelector('span').textContent;
        
        if (skillData[skillName]) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                showSkillTooltip(skillName, e.pageX, e.pageY, skillData, tooltip);
                
                // Remove active class from all items
                skillItems.forEach(si => si.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
            });
            
            // Add hover effect
            item.addEventListener('mouseenter', function() {
                this.style.cursor = 'pointer';
            });
        }
    });

    // Hide tooltip when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.skill-item') && !e.target.closest('.skill-tooltip')) {
            tooltip.classList.remove('show');
            skillItems.forEach(item => item.classList.remove('active'));
        }
    });

    // Hide tooltip on scroll
    window.addEventListener('scroll', function() {
        tooltip.classList.remove('show');
        skillItems.forEach(item => item.classList.remove('active'));
    });
}

// Show skill tooltip
function showSkillTooltip(skillName, x, y, skillData, tooltip) {
    const skill = skillData[skillName];
    if (!skill) return;
    
    tooltip.innerHTML = `
        <h4>${skillName} <span class="skill-level">${skill.level}</span></h4>
        <p>${skill.description}</p>
        <div class="skill-experience">${skill.experience}</div>
    `;
    
    // Position tooltip
    tooltip.style.display = 'block';
    const rect = tooltip.getBoundingClientRect();
    let left = x - rect.width / 2;
    let top = y - rect.height - 20;
    
    // Adjust if tooltip goes off screen
    if (left < 10) left = 10;
    if (left + rect.width > window.innerWidth - 10) {
        left = window.innerWidth - rect.width - 10;
    }
    if (top < 10) top = y + 20;
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.classList.add('show');
}

console.log('Portfolio initialized successfully! 🚀');
