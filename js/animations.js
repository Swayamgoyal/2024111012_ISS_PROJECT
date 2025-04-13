document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for background stars
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        // Apply parallax to stars background
        document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
    
    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 100) {
                const width = bar.getAttribute('data-width') || '0%';
                bar.style.width = width;
            }
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        // Elements with fade-in class
        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
        
        // Elements with slide-in class
        document.querySelectorAll('.slide-in:not(.visible)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
        
        // Elements with scale-in class
        document.querySelectorAll('.scale-in:not(.visible)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
        
        // Staggered items
        const staggerContainers = document.querySelectorAll('.stagger-container');
        staggerContainers.forEach(container => {
            if (isElementInViewport(container)) {
                const items = container.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 100 * index);
                });
            }
        });
        
        // Animate skill bars
        animateSkillBars();
    }
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight - 100 &&
            rect.bottom >= 0 &&
            rect.left <= window.innerWidth &&
            rect.right >= 0
        );
    }
    
    // Initial animation check
    setTimeout(animateOnScroll, 300);
    
    // Run animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Typing animation for code elements
    const codeBlocks = document.querySelectorAll('.code-block pre code');
    codeBlocks.forEach(block => {
        const originalText = block.textContent;
        block.textContent = '';
        
        let i = 0;
        const typeCode = () => {
            if (i < originalText.length) {
                block.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeCode, Math.random() * 10 + 5);
            }
        };
        
        if (isElementInViewport(block.parentElement)) {
            setTimeout(typeCode, 500);
        } else {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeCode, 500);
                        observer.disconnect();
                    }
                });
            });
            observer.observe(block.parentElement);
        }
    });
    
    // Add floating animation to selected elements
    document.querySelectorAll('.float-element').forEach(element => {
        // Random duration between 3-6 seconds
        const duration = Math.random() * 3 + 3;
        // Random delay for more natural movement
        const delay = Math.random() * 2;
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
});
