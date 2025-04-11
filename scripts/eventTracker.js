// eventTracker.js - Track all click events and page views
document.addEventListener('DOMContentLoaded', () => {
    // Track page view on initial load
    logEvent('view', document.title);
    
    // Track all clicks
    document.addEventListener('click', (e) => {
        // Get the clicked element
        const target = e.target;
        
        // Determine the type of element clicked
        let objectType = determineObjectType(target);
        
        // Log the click event
        logEvent('click', objectType);
    });
    
    // Function to determine the type of clicked object
    function determineObjectType(element) {
        if (element.tagName === 'A') return 'link';
        if (element.tagName === 'BUTTON') return 'button';
        if (element.tagName === 'IMG') return 'image';
        if (element.tagName === 'INPUT') {
            return element.type === 'text' ? 'text input' : 
                   element.type === 'checkbox' ? 'checkbox' : 
                   element.type === 'radio' ? 'radio button' : 'input';
        }
        if (element.tagName === 'SELECT') return 'dropdown';
        if (element.tagName === 'TEXTAREA') return 'text area';
        
        // If it's a more complex element, try to find a parent with a role or class
        let parent = element;
        while (parent && parent !== document) {
            if (parent.getAttribute('role')) return parent.getAttribute('role');
            if (parent.classList.length > 0) return parent.classList[0];
            parent = parent.parentElement;
        }
        
        // Default
        return element.tagName.toLowerCase();
    }
    
    // Function to log events to console
    function logEvent(eventType, objectType) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, ${eventType}, ${objectType}`);
    }
});
