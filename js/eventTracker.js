/**
 * Event Tracker Module
 * Tracks user interactions for analytics purposes
 * Author: Swayam Goyal
 */

(function() {
    // Store events to avoid repeated logging
    const loggedEvents = new Set();
    
    // Track all clicks
    document.addEventListener('click', function(e) {
        // Find closest interactive element or use target
        const element = e.target.closest('a, button, .clickable, [role="button"]') || e.target;
        
        if (element) {
            const elementType = element.tagName.toLowerCase();
            const elementId = element.id || 'unknown';
            const elementText = element.textContent.trim().substring(0, 20) || 'empty';
            const timestamp = new Date().toISOString();
            
            // Create unique event ID to prevent duplicates
            const eventId = `click_${elementType}_${elementId}_${Date.now()}`;
            
            // Only log if not already logged in this session
            if (!loggedEvents.has(eventId)) {
                loggedEvents.add(eventId);
                console.log(`${timestamp}, click, ${elementType}#${elementId}:${elementText}`);
            }
        }
    });
    
    // Track page views
    window.addEventListener('load', function() {
        const timestamp = new Date().toISOString();
        const pagePath = window.location.pathname.split('/').pop() || 'index.html';
        console.log(`${timestamp}, pageview, ${pagePath}`);
    });
    
    // Track element visibility (when elements enter viewport)
    const observeElements = function() {
        const elements = document.querySelectorAll('.track-visibility');
        
        if (elements.length === 0) return;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const elementId = element.id || 'unknown';
                    const elementType = element.tagName.toLowerCase();
                    const timestamp = new Date().toISOString();
                    
                    // Create unique event ID
                    const eventId = `visible_${elementType}_${elementId}`;
                    
                    if (!loggedEvents.has(eventId)) {
                        loggedEvents.add(eventId);
                        console.log(`${timestamp}, visible, ${elementType}#${elementId}`);
                    }
                    
                    // Stop observing after first visibility
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Track hover events on interactive elements
    const trackHoverEvents = function() {
        const elements = document.querySelectorAll('a, button, .clickable, [role="button"]');
        
        elements.forEach(element => {
            // Use mouseenter instead of mouseover to prevent excessive logging
            element.addEventListener('mouseenter', function() {
                const elementType = this.tagName.toLowerCase();
                const elementId = this.id || 'unknown';
                const elementText = this.textContent.trim().substring(0, 20) || 'empty';
                const timestamp = new Date().toISOString();
                
                // Create unique event ID with a 2-second cooldown
                const eventId = `hover_${elementType}_${elementId}`;
                
                if (!loggedEvents.has(eventId)) {
                    loggedEvents.add(eventId);
                    console.log(`${timestamp}, hover, ${elementType}#${elementId}:${elementText}`);
                    
                    // Remove from set after 2 seconds to allow re-logging
                    setTimeout(() => {
                        loggedEvents.delete(eventId);
                    }, 2000);
                }
            });
        });
    };
    
    // Track form interactions
    const trackFormInteractions = function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Track form submissions
            form.addEventListener('submit', function(e) {
                const formId = this.id || 'unknown-form';
                const timestamp = new Date().toISOString();
                console.log(`${timestamp}, submit, form#${formId}`);
            });
            
            // Track form field focus
            const formFields = form.querySelectorAll('input, textarea, select');
            formFields.forEach(field => {
                field.addEventListener('focus', function() {
                    const fieldId = this.id || 'unknown-field';
                    const fieldType = this.type || 'text';
                    const timestamp = new Date().toISOString();
                    
                    // Create unique event ID with a 5-second cooldown
                    const eventId = `focus_${fieldId}_${fieldType}`;
                    
                    if (!loggedEvents.has(eventId)) {
                        loggedEvents.add(eventId);
                        console.log(`${timestamp}, focus, ${fieldType}#${fieldId}`);
                        
                        // Remove from set after 5 seconds
                        setTimeout(() => {
                            loggedEvents.delete(eventId);
                        }, 5000);
                    }
                });
            });
        });
    };
    
    // Initialize all tracking
    document.addEventListener('DOMContentLoaded', function() {
        observeElements();
        trackHoverEvents();
        trackFormInteractions();
    });
})();
