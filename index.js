// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
    this.reset();
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
};

// Scroll Animation Functionality
const initScrollAnimations = () => {
    // Các phần tử cần animate
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Hiệu ứng cho các phần tử con trong hero section
    const heroElements = document.querySelectorAll('.hero-content > *');
    
    // Hiệu ứng cho skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Hiệu ứng cho project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Hiệu ứng cho about content
    const aboutElements = document.querySelectorAll('.about-content > *');
    
    // Hiệu ứng cho contact container
    const contactElements = document.querySelectorAll('.contact-container > *');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class 'visible' khi phần tử xuất hiện trong viewport
                entry.target.classList.add('visible');
                
                // Nếu là skills section, animate skill bars
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkillBars, 300);
                }
            }
        });
    }, observerOptions);
    
    // Quan sát các phần tử chính
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Quan sát các phần tử con trong hero
    heroElements.forEach(element => {
        observer.observe(element);
    });
    
    // Quan sát skill cards
    skillCards.forEach(card => {
        observer.observe(card);
    });
    
    // Quan sát project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Quan sát about elements
    aboutElements.forEach(element => {
        observer.observe(element);
    });
    
    // Quan sát contact elements
    contactElements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Trigger initial animation for elements already in view
    setTimeout(() => {
        const elementsInView = document.querySelectorAll('.fade-in');
        elementsInView.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

// Intersection Observer for skill bars animation (giữ lại cho tương thích)
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}