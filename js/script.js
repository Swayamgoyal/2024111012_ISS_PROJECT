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
    
    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 100) {
                const width = bar.getAttribute('data-width') || '0%';
                bar.style.width = width;
            }
        });
    }
    
    // Run on page load and scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
    
    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Run on page load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add tech-panel and tech-border classes to appropriate elements
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('tech-panel');
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('tech-border');
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
});
