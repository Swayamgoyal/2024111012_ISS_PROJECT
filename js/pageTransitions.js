/**
 * Page Transitions Module
 * Adds smooth page transition effects between pages
 * @author Swayam Goyal
 */

(function() {
    // Variables
    const transitionDuration = 600; // ms
    let isTransitioning = false;
    
    // Execute when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Create transition overlay if it doesn't exist
        createTransitionOverlay();
        
        // Add transition-in effect when page loads
        addPageLoadTransition();
        
        // Setup click handlers for internal links
        setupLinkTransitions();
    });
    
    /**
     * Create page transition overlay element
     */
    function createTransitionOverlay() {
        if (document.querySelector('.page-transition-overlay')) return;
        
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        
        // Create warp effect element inside overlay
        const warpEffect = document.createElement('div');
        warpEffect.className = 'cosmic-warp';
        overlay.appendChild(warpEffect);
        
        // Add to DOM
        document.body.appendChild(overlay);
        
        // Add necessary styles if not already in stylesheet
        if (!document.getElementById('page-transition-styles')) {
            const style = document.createElement('style');
            style.id = 'page-transition-styles';
            style.textContent = `
                .page-transition-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--space-black);
                    z-index: 9999;
                    pointer-events: none;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity ${transitionDuration}ms ease, visibility ${transitionDuration}ms ease;
                }
                
                .page-transition-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .cosmic-warp {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 0;
                    height: 0;
                    background: radial-gradient(circle, var(--galaxy-teal) 0%, transparent 70%);
                    border-radius: 50%;
                    opacity: 0;
                    transition: width ${transitionDuration}ms ease-out, 
                                height ${transitionDuration}ms ease-out, 
                                opacity ${transitionDuration}ms ease;
                }
                
                .page-transition-overlay.active .cosmic-warp {
                    width: 300vw;
                    height: 300vw;
                    opacity: 0.3;
                }
                
                .page-transition-in {
                    animation: fadePageIn ${transitionDuration}ms ease-out forwards;
                }
                
                @keyframes fadePageIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                /* Optional: Add this to prevent scroll during transition */
                body.transitioning {
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Add page load transition effect
     */
    function addPageLoadTransition() {
        // Add transition class to body for incoming animation
        document.body.classList.add('page-transition-in');
        
        // Remove class after animation completes
        setTimeout(() => {
            document.body.classList.remove('page-transition-in');
        }, transitionDuration);
    }
    
    /**
     * Setup click handlers for internal links
     */
    function setupLinkTransitions() {
        // Get all internal links
        const internalLinks = document.querySelectorAll('a[href^="/"]:not([target]), a[href^="./"]:not([target]), a[href^="../"]:not([target]), a[href^="#"]:not([target]), a[href*=".html"]:not([target])');
        
        internalLinks.forEach(link => {
            // Skip anchor links (they don't cause page reloads)
            if (link.getAttribute('href').startsWith('#')) return;
            
            link.addEventListener('click', function(e) {
                // Skip if modifier keys are pressed (for opening in new tabs)
                if (e.ctrlKey || e.metaKey || e.shiftKey) return;
                
                // Skip if already transitioning
                if (isTransitioning) {
                    e.preventDefault();
                    return;
                }
                
                const target = this.getAttribute('href');
                
                // Prevent default navigation
                e.preventDefault();
                
                // Start transition
                performPageTransition(target);
            });
        });
    }
    
    /**
     * Perform page transition animation and navigation
     * @param {string} targetUrl - URL to navigate to
     */
    function performPageTransition(targetUrl) {
        // Set transitioning state
        isTransitioning = true;
        document.body.classList.add('transitioning');
        
        // Get transition overlay
        const overlay = document.querySelector('.page-transition-overlay');
        
        // Show overlay
        overlay.classList.add('active');
        
        // Navigate after transition completes
        setTimeout(() => {
            window.location.href = targetUrl;
        }, transitionDuration);
    }
    
    // Add transition handling for browser back/forward navigation
    window.addEventListener('pageshow', function(event) {
        // Check if navigating via back/forward buttons
        if (event.persisted) {
            // Add fade-in effect
            document.body.classList.add('page-transition-in');
            
            setTimeout(() => {
                document.body.classList.remove('page-transition-in');
            }, transitionDuration);
        }
    });
    
    // Export functions for public use
    window.pageTransitions = {
        navigateTo: performPageTransition
    };
})();
