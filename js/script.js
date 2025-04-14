document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Code syntax highlighting for display
    document.querySelectorAll('pre code').forEach(block => {
        // Basic syntax highlighting for demo
        let html = block.innerHTML;
        html = html.replace(/function\s+([a-zA-Z0-9_]+)/g, 'function <span class="function">$1</span>');
        html = html.replace(/(const|let|var|return|if|else|for|while)/g, '<span class="keyword">$1</span>');
        html = html.replace(/('.*?'|".*?")/g, '<span class="string">$1</span>');
        html = html.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
        block.innerHTML = html;
    });
    
    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in, .scale-in, .stagger-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Run animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Initial animation check
    animateOnScroll();
    
    // Add curved-card and glow-border classes
    document.querySelectorAll('.info-card, .analyzer-preview').forEach(item => {
        if (!item.classList.contains('curved-card')) {
            item.classList.add('curved-card');
        }
        if (!item.classList.contains('glow-border')) {
            item.classList.add('glow-border');
        }
    });
    
    // Add floating animation to selected elements
    document.querySelectorAll('.info-card:nth-child(odd), .profile-frame').forEach(item => {
        item.classList.add('float');
    });
    
    // Add pulse animation to accent elements
    document.querySelectorAll('.info-icon, .orbit::before').forEach(item => {
        item.classList.add('pulse');
    });
    
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll to top when page is loaded
    window.scrollTo(0, 0);
    
    // Load content after a short delay
    setTimeout(() => {
        document.querySelector('.content-container').classList.add('loaded');
    }, 100);
});
