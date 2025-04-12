document.addEventListener('DOMContentLoaded', function() {
    // Track initial page view
    logEvent('view', 'page', document.title);
    
    // Track all click events
    document.addEventListener('click', function(e) {
        const target = e.target;
        const eventObject = determineEventObject(target);
        logEvent('click', eventObject.type, eventObject.name);
    });
    
    // Function to determine the type of clicked object
    function determineEventObject(element) {
        // Default values
        let type = 'unknown';
        let name = 'unknown';
        
        // Check element and its parents to find the most meaningful description
        let currentElement = element;
        
        // Try to get the most specific element
        while (currentElement && type === 'unknown') {
            // Check for common elements
            if (currentElement.tagName === 'A') {
                type = 'link';
                name = currentElement.textContent.trim() || currentElement.getAttribute('href') || 'unnamed link';
            } else if (currentElement.tagName === 'BUTTON') {
                type = 'button';
                name = currentElement.textContent.trim() || 'unnamed button';
            } else if (currentElement.tagName === 'IMG') {
                type = 'image';
                name = currentElement.getAttribute('alt') || 'unnamed image';
            } else if (currentElement.tagName === 'INPUT') {
                if (currentElement.type === 'text' || currentElement.type === 'email' || currentElement.type === 'password') {
                    type = 'text input';
                    name = currentElement.getAttribute('placeholder') || currentElement.getAttribute('name') || 'unnamed input';
                } else if (currentElement.type === 'checkbox') {
                    type = 'checkbox';
                    name = currentElement.getAttribute('name') || 'unnamed checkbox';
                } else if (currentElement.type === 'radio') {
                    type = 'radio button';
                    name = currentElement.getAttribute('name') || 'unnamed radio';
                } else if (currentElement.type === 'submit') {
                    type = 'submit button';
                    name = currentElement.value || 'submit';
                } else {
                    type = 'input';
                    name = currentElement.getAttribute('name') || 'unnamed input';
                }
            } else if (currentElement.tagName === 'TEXTAREA') {
                type = 'text area';
                name = currentElement.getAttribute('placeholder') || currentElement.getAttribute('name') || 'unnamed textarea';
            } else if (currentElement.tagName === 'SELECT') {
                type = 'dropdown';
                name = currentElement.getAttribute('name') || 'unnamed dropdown';
            } else if (currentElement.tagName === 'LABEL') {
                type = 'label';
                name = currentElement.textContent.trim() || 'unnamed label';
            } else if (currentElement.tagName === 'LI') {
                type = 'list item';
                name = currentElement.textContent.trim() || 'unnamed list item';
            } else if (currentElement.tagName === 'DIV' || currentElement.tagName === 'SECTION') {
                // Check for common class names that might indicate the purpose
                if (currentElement.classList.contains('card') || currentElement.classList.contains('skill-card')) {
                    type = 'card';
                    // Try to find a heading inside the card
                    const heading = currentElement.querySelector('h2, h3, h4, h5, h6');
                    name = heading ? heading.textContent.trim() : 'unnamed card';
                } else if (currentElement.classList.contains('btn') || currentElement.classList.contains('button')) {
                    type = 'button';
                    name = currentElement.textContent.trim() || 'unnamed button';
                }
            }
            
            // Move up to parent if we haven't identified the element type
            currentElement = type === 'unknown' ? currentElement.parentElement : null;
        }
        
        return { type, name };
    }

    // Function to log events to console
    function logEvent(eventType, objectType, objectName) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, ${eventType}, ${objectType}: ${objectName}`);
    }
});
