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
    
    // Add curved-card and glow-border classes to appropriate elements
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('curved-card');
    });
    
    document.querySelectorAll('.skill-item, .terminal-window').forEach(item => {
        item.classList.add('glow-border');
    });
    
    // Add floating animation to selected cards
    document.querySelectorAll('.skill-item:nth-child(odd), .gallery-item:nth-child(even)').forEach(item => {
        item.classList.add('float');
    });
    
    // Add pulse animation to accent elements
    document.querySelectorAll('.btn-primary, .timeline-item::before').forEach(item => {
        item.classList.add('pulse');
    });
    
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab content
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // Parallax effect for background stars
    window.addEventListener('mousemove', function(e) {
        const stars = document.querySelector('body::after');
        if (stars) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            stars.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
    });
});
