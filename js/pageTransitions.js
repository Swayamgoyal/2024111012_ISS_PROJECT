document.addEventListener('DOMContentLoaded', function() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    // Get all internal links
    const internalLinks = document.querySelectorAll('a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target]), a[href^="#"]:not([target]), a[href*=".html"]:not([target])');
    
    // Preload function for smoother transitions
    function preloadPage(url) {
        if (!url || url.startsWith('#')) return;
        
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }
    
    // Add click event to all internal links
    internalLinks.forEach(link => {
        // Skip anchor links (they don't cause page reloads)
        if (link.getAttribute('href').startsWith('#')) return;
        
        // Add preload on hover
        link.addEventListener('mouseenter', function() {
            preloadPage(this.getAttribute('href'));
        });
        
        // Add click transition
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            
            // Don't intercept if modifier keys are pressed
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;
            
            e.preventDefault();
            
            // Start transition out
            overlay.classList.add('active');
            document.body.classList.add('transitioning');
            
            // Navigate after transition completes
            setTimeout(() => {
                window.location.href = target;
            }, 500); // Match this timing to your CSS transition
        });
    });
    
    // Handle page load transition
    window.addEventListener('load', function() {
        // Add a small delay to ensure DOM is fully ready
        setTimeout(() => {
            overlay.classList.remove('active');
            document.body.classList.remove('transitioning');
        }, 100);
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page was loaded from cache (back/forward navigation)
            setTimeout(() => {
                overlay.classList.remove('active');
                document.body.classList.remove('transitioning');
            }, 100);
        }
    });
    
    // Preload pages linked from the current navigation menu
    // This makes navigation feel even more responsive
    function preloadCurrentNavLinks() {
        const activeNavLink = document.querySelector('.nav-link.active');
        if (!activeNavLink) return;
        
        // Find siblings (other nav links)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link !== activeNavLink) {
                preloadPage(link.getAttribute('href'));
            }
        });
    }
    
    // Preload nav links after a short delay
    setTimeout(preloadCurrentNavLinks, 1000);
});
