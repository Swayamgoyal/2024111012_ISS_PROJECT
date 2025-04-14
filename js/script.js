/**
 * Cosmic Portfolio - Main JavaScript File
 * Created by: Swayam Goyal
 * Last updated: April 14, 2025
 */

// Execute as soon as HTML is parsed but before full page load
document.addEventListener('DOMContentLoaded', function() {
    // Fix navigation bar issue immediately
    fixNavigationBarIssue();
    
    // Initialize all other functionality
    initializeSite();
});

/**
 * Fix navigation bar issue - CRITICAL FUNCTION
 * This solves the content shift problem by properly spacing content below navbar
 */
function fixNavigationBarIssue() {
    // Get navbar and measure its actual height
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Get the exact height of the navbar including any borders
    const navbarHeight = navbar.offsetHeight;
    
    // Apply padding to body element to prevent content from appearing under navbar
    document.body.style.paddingTop = navbarHeight + 'px';
    
    // Fix for Safari and some mobile browsers
    document.documentElement.style.setProperty('--navbar-height', navbarHeight + 'px');
    
    // Apply some additional padding for spacing
    const pageHeaders = document.querySelectorAll('.page-header');
    pageHeaders.forEach(header => {
        header.style.paddingTop = '30px';
    });
    
    // Make sure content is immediately visible with proper spacing
    document.body.style.visibility = 'visible';
}

/**
 * Initialize all site functionality
 */
function initializeSite() {
    // Track page view for analytics
    logPageView();
    
    // Setup main navigation functionality
    setupNavigation();
    
    // Initialize space theme effects
    initializeSpaceEffects();
    
    // Setup interactive elements
    setupInteractiveElements();
    
    // Initialize page-specific functionality
    initializePageSpecificFunctions();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Update copyright year
    updateCopyrightYear();
    
    // Setup window resize handler to maintain navbar spacing
    setupResizeHandler();
}

/**
 * Log page view to console (assignment requirement)
 */
function logPageView() {
    const timestamp = new Date().toISOString();
    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    console.log(`${timestamp}, view, page:${pageName}`);
}

/**
 * Setup navigation functionality
 */
function setupNavigation() {
    // Mobile menu toggle functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Log click event
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, hamburger-menu-toggle`);
        });
    }
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === './') ||
            (linkHref && linkHref.includes(currentPage.split('.')[0]))) {
            link.classList.add('active');
        }
        
        // Add click event tracking
        link.addEventListener('click', function(e) {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, nav-link:${this.textContent.trim()}`);
        });
    });
}

/**
 * Initialize space theme effects
 */
function initializeSpaceEffects() {
    // Create stars background
    createStarsEffect();
    
    // Add occasional shooting stars
    setInterval(createShootingStar, 8000);
    
    // Add subtle parallax effect on mouse move
    addParallaxEffect();
}

/**
 * Create stars background effect
 */
function createStarsEffect() {
    // Only execute this on larger screens for performance
    if (window.innerWidth < 768) return;
    
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars-container');
    document.body.appendChild(starsContainer);
    
    // Create stars based on screen size
    const starsCount = Math.floor((window.innerWidth * window.innerHeight) / 1000);
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = 0.5 + Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle effect
        const duration = 2 + Math.random() * 4;
        const delay = Math.random() * 5;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

/**
 * Create shooting star effect
 */
function createShootingStar() {
    // Only execute this on larger screens for performance
    if (window.innerWidth < 768) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    
    // Position the shooting star at a random location at the top of the screen
    const startPositionX = Math.random() * window.innerWidth;
    const startPositionY = Math.random() * (window.innerHeight * 0.3);
    
    shootingStar.style.left = `${startPositionX}px`;
    shootingStar.style.top = `${startPositionY}px`;
    
    document.body.appendChild(shootingStar);
    
    // Remove after animation completes
    setTimeout(() => {
        if (document.body.contains(shootingStar)) {
            shootingStar.remove();
        }
    }, 2000);
}

/**
 * Add parallax effect to background
 */
function addParallaxEffect() {
    // Only execute this on larger screens for performance
    if (window.innerWidth < 768) return;
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const moveX = (mouseX / windowWidth - 0.5) * 20;
        const moveY = (mouseY / windowHeight - 0.5) * 20;
        
        document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
}

/**
 * Setup interactive elements
 */
function setupInteractiveElements() {
    // Setup all buttons with click tracking
    const buttons = document.querySelectorAll('button, .btn, [role="button"]');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const timestamp = new Date().toISOString();
            const buttonText = this.textContent.trim();
            console.log(`${timestamp}, click, button:${buttonText}`);
        });
    });
    
    // Setup download CV button functionality
    setupCVDownload();
    
    // Setup any tabbed interfaces
    setupTabbedInterfaces();
    
    // Setup hover effects for tech stack items
    setupTechStackHoverEffects();
    
    // Animate skill bars if on skills page
    animateSkillBars();
}

/**
 * Setup CV download functionality
 */
function setupCVDownload() {
    const downloadButtons = document.querySelectorAll('.download-pdf, [download]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing PDF...';
            this.classList.add('downloading');
            
            // Log download event
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, download-cv`);
            
            // Simulate server processing time for better UX
            setTimeout(() => {
                // Restore button
                this.innerHTML = originalContent;
                this.classList.remove('downloading');
                
                // Trigger download
                const downloadLink = this.getAttribute('href') || 'files/swayam-goyal-cv.pdf';
                window.location.href = downloadLink;
                
                // Show success message
                showNotification('Your CV is downloading...', 'success');
            }, 1200);
        });
    });
}

/**
 * Setup tabbed interfaces
 */
function setupTabbedInterfaces() {
    const tabButtons = document.querySelectorAll('[data-tab-target]');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab-target');
            const targetTab = document.querySelector(targetId);
            
            if (!targetTab) return;
            
            // Deactivate all tabs and buttons
            const tabContainer = this.closest('.tabs-container');
            if (!tabContainer) return;
            
            const allButtons = tabContainer.querySelectorAll('[data-tab-target]');
            const allTabs = document.querySelectorAll('.tab-content');
            
            allButtons.forEach(btn => btn.classList.remove('active'));
            allTabs.forEach(tab => tab.classList.remove('active'));
            
            // Activate clicked tab and button
            this.classList.add('active');
            targetTab.classList.add('active');
            
            // Log tab change
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, tab-change:${targetId}`);
        });
    });
}

/**
 * Setup tech stack hover effects
 */
function setupTechStackHoverEffects() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('tech-hover');
            
            // Log hover event
            const timestamp = new Date().toISOString();
            const techName = this.getAttribute('data-tech') || this.textContent.trim();
            console.log(`${timestamp}, hover, tech:${techName}`);
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('tech-hover');
        });
    });
}

/**
 * Animate skill bars on skills page
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;
    
    // Use Intersection Observer to trigger animations when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '0%';
                
                // Slight delay for better effect
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                
                // Unobserve after animation
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * Initialize page-specific functionality
 */
function initializePageSpecificFunctions() {
    // Text analyzer page functionality
    if (document.getElementById('text-input')) {
        initializeTextAnalyzer();
    }
    
    // CV page specific enhancements
    if (document.querySelector('.cv-container, .curriculum-vitae')) {
        enhanceCVPage();
    }
    
    // Education page timeline
    if (document.querySelector('.timeline')) {
        enhanceTimeline();
    }
}

/**
 * Initialize text analyzer functionality
 */
function initializeTextAnalyzer() {
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const sampleBtn = document.getElementById('sample-btn');
    
    if (!textInput || !analyzeBtn) return;
    
    // Analyze button click handler
    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (!text) {
            showNotification('Please enter some text to analyze', 'error');
            return;
        }
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        this.disabled = true;
        
        // Log analysis event
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, click, analyze-text`);
        
        // Use setTimeout to allow UI to update (prevents browser freeze on large text)
        setTimeout(() => {
            // TODO: Implement text analysis logic here
            // This would be the code that analyzes the text and displays results
            
            // Reset button state
            this.innerHTML = originalText;
            this.disabled = false;
            
            // Show success notification
            showNotification('Analysis complete!', 'success');
        }, 800);
    });
    
    // Sample text button click handler
    if (sampleBtn) {
        sampleBtn.addEventListener('click', function() {
            // Try to load sample text from file
            fetch('files/sample-text.txt')
                .then(response => response.text())
                .then(data => {
                    textInput.value = data;
                })
                .catch(() => {
                    // If file doesn't exist, use hardcoded sample
                    textInput.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
                });
            
            // Log event
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, load-sample-text`);
        });
    }
}

/**
 * Enhance CV page with additional effects
 */
function enhanceCVPage() {
    // Add floating animation to tech icons
    const techIcons = document.querySelectorAll('.tech-item img');
    
    techIcons.forEach((icon, index) => {
        // Add floating animation with different delays
        icon.style.animation = `float ${3 + index % 3}s ease-in-out infinite ${index * 0.2}s`;
    });
    
    // Add subtle glow effects to CV download button
    const downloadBtn = document.querySelector('.download-pdf');
    if (downloadBtn) {
        downloadBtn.classList.add('glow-effect');
    }
}

/**
 * Enhance timeline on education page
 */
function enhanceTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Use Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * Initialize smooth scrolling
 */
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            // Log scroll event
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, smooth-scroll:${targetId}`);
            
            // Calculate scroll position accounting for fixed navbar
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Update copyright year in footer
 */
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.current-year, #current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

/**
 * Setup window resize handler to maintain navbar spacing
 */
function setupResizeHandler() {
    // Throttle function to limit execution frequency
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Update navbar spacing on resize
    const handleResize = throttle(function() {
        fixNavigationBarIssue();
    }, 100);
    
    window.addEventListener('resize', handleResize);
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on notification type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add close button event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Execute the navigation bar fix immediately before DOMContentLoaded
// This prevents any visible content shift
(function() {
    document.body.style.visibility = 'hidden';
    
    // This will run as soon as the script is loaded
    window.addEventListener('load', function() {
        // Ensure the navbar fix runs immediately
        fixNavigationBarIssue();
        
        // Make body visible after fix is applied
        document.body.style.visibility = 'visible';
    });
})();
