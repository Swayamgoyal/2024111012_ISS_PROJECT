document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
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
    
    // Page transition effect
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="mailto:"]):not([href^="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if modifier keys are pressed
            if (e.metaKey || e.ctrlKey) return;
            
            const href = this.getAttribute('href');
            
            // Skip if it's not an internal link
            if (href.indexOf('http') === 0) return;
            
            e.preventDefault();
            
            // Create and animate page transition overlay
            const overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);
            
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);
            
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
    
    // Skills tab functionality
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
    
    // Check if page was loaded with a transition
    if (performance.navigation.type !== 1) { // Not a page refresh
        document.body.classList.add('page-transition-in');
        setTimeout(() => {
            document.body.classList.remove('page-transition-in');
        }, 500);
    }
});
