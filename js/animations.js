/**
 * Cosmic Animations Module
 * Provides animated effects throughout the space-themed portfolio
 * @author Swayam Goyal
 */

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initializeAnimations();
    
    // Setup scroll-triggered animations
    setupScrollAnimations();
    
    // Initialize floating elements
    initializeFloatingElements();
    
    // Create starfield effect
    createStarfieldEffect();
    
    // Setup hover animations
    setupHoverAnimations();
});

/**
 * Initialize all animation effects
 */
function initializeAnimations() {
    // Add animation classes to elements with data attributes
    document.querySelectorAll('[data-animation]').forEach(element => {
        const animationType = element.getAttribute('data-animation');
        const delay = element.getAttribute('data-delay') || 0;
        
        // Add animation class
        element.classList.add(`animate-${animationType}`);
        
        // Add delay style
        if (delay > 0) {
            element.style.animationDelay = `${delay}ms`;
        }
    });
}

/**
 * Setup scroll-triggered animations using Intersection Observer
 */
function setupScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-down, .slide-left, .slide-right, .zoom-in, .zoom-out');
    
    if (animatedElements.length === 0) return;
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Unobserve after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slight offset for better timing
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize floating elements with subtle animation
 */
function initializeFloatingElements() {
    // Get all elements with float class
    const floatingElements = document.querySelectorAll('.float');
    
    // Apply floating animation with different offsets
    floatingElements.forEach((element, index) => {
        // Create varied animation durations and delays
        const duration = 3 + (index % 3);
        const delay = index * 0.2;
        
        // Apply animation
        element.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
    });
}

/**
 * Create starfield parallax effect
 */
function createStarfieldEffect() {
    // Only create on larger screens for performance reasons
    if (window.innerWidth < 768) return;
    
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    
    // Add to DOM
    document.body.appendChild(starsContainer);
    
    // Create stars
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    
    for (let i = 0; i < starCount; i++) {
        createStar(starsContainer, i);
    }
    
    // Add parallax effect to stars
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        starsContainer.style.transform = `translate(${mouseX * -30}px, ${mouseY * -30}px)`;
    });
}

/**
 * Create individual star element
 */
function createStar(container, index) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    
    // Random size (0.5px to 3px)
    const size = 0.5 + Math.random() * 2.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random opacity and twinkle animation
    star.style.opacity = 0.2 + Math.random() * 0.8;
    
    const animationDuration = 1 + Math.random() * 4;
    star.style.animation = `twinkle ${animationDuration}s ease-in-out infinite ${index * 0.05}s`;
    
    // Add star to container
    container.appendChild(star);
}

/**
 * Setup hover animation effects
 */
function setupHoverAnimations() {
    // Card hover effects
    document.querySelectorAll('.card, .tech-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('btn-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover');
        });
    });
}

// Define our CSS animations if not already in stylesheet
if (!document.getElementById('animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
        
        .animate-fade-in {
            opacity: 0;
            animation: fadeIn 1s forwards;
        }
        
        .animate-slide-up {
            opacity: 0;
            transform: translateY(50px);
            animation: slideUp 1s forwards;
        }
        
        .animate-slide-down {
            opacity: 0;
            transform: translateY(-50px);
            animation: slideDown 1s forwards;
        }
        
        .animate-slide-left {
            opacity: 0;
            transform: translateX(50px);
            animation: slideLeft 1s forwards;
        }
        
        .animate-slide-right {
            opacity: 0;
            transform: translateX(-50px);
            animation: slideRight 1s forwards;
        }
        
        .animate-zoom-in {
            opacity: 0;
            transform: scale(0.8);
            animation: zoomIn 1s forwards;
        }
        
        .animate-zoom-out {
            opacity: 0;
            transform: scale(1.2);
            animation: zoomOut 1s forwards;
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideLeft {
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideRight {
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes zoomIn {
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes zoomOut {
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(styleSheet);
}
