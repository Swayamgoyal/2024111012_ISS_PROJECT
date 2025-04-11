// Main script for navigation and page transitions
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const pageTransition = document.querySelector('.page-transition');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Handle navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target section
            const targetSectionId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetSectionId);
            
            // Don't do anything if already on this section
            if (link.classList.contains('active')) return;
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.toggle('active');
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            
            // Perform page transition
            performPageTransition(targetSection);
            
            // Update URL without page reload
            history.pushState(null, null, link.getAttribute('href'));
        });
    });
    
    // Page transition animation
    function performPageTransition(targetSection) {
        // Using GSAP for animations
        const tl = gsap.timeline();
        
        tl.to(pageTransition, {
            duration: 0.5,
            y: 0,
            ease: "power2.inOut"
        })
        .call(() => {
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            targetSection.classList.add('active');
        })
        .to(pageTransition, {
            duration: 0.5,
            y: "100%",
            ease: "power2.inOut"
        });
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const sectionId = window.location.hash.substring(1) || 'home';
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        
        // Update active nav link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        targetLink.classList.add('active');
        
        // Perform page transition
        performPageTransition(targetSection);
    });
});
