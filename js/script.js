/**
 * Space Portfolio - Main JavaScript
 * Author: Swayam Goyal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fix navigation bar issue immediately (CRITICAL)
    fixNavigationBarIssue();
    
    // Setup navigation functionality
    setupNavigation();
    
    // Initialize cosmic effects
    initializeCosmicEffects();
    
    // Setup interactive elements
    setupInteractiveElements();
    
    // Initialize page-specific functionality
    initializePageSpecificFunctions();
    
    // Update copyright year
    updateCopyrightYear();
    
    // Initialize event tracking (assignment requirement)
    initializeEventTracking();
  });
  
  /**
   * Fix navigation bar issue - CRITICAL FUNCTION
   * This solves the content shift problem by properly spacing content below navbar
   */
  function fixNavigationBarIssue() {
    // Get navbar and measure its actual height
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Get the exact height of the navbar including any borders
    const navbarHeight = navbar.offsetHeight;
    
    // Apply proper padding to body element
    document.body.style.paddingTop = navbarHeight + 'px';
    
    // Set CSS variable for responsive adjustments
    document.documentElement.style.setProperty('--navbar-height', navbarHeight + 'px');
    
    // Set up a resize observer to maintain proper spacing on window resize
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === navbar) {
          const updatedHeight = navbar.offsetHeight;
          document.body.style.paddingTop = updatedHeight + 'px';
          document.documentElement.style.setProperty('--navbar-height', updatedHeight + 'px');
        }
      }
    });
    
    resizeObserver.observe(navbar);
  }
  
  /**
   * Setup navigation functionality
   */
  function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle mobile menu
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Log event
        console.log(`${new Date().toISOString()}, click, mobile-menu-toggle`);
      });
      
      // Close mobile menu when clicking a link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
    
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || 
          (currentPage === 'index.html' && href === './') ||
          (href && currentPage.includes(href.split('.')[0]))) {
        link.classList.add('active');
      }
    });
  }
  
  /**
   * Initialize cosmic space effects
   */
  function initializeCosmicEffects() {
    // Create floating stars
    createFloatingStars();
    
    // Create occasional shooting stars
    setInterval(createShootingStar, 8000);
    
    // Add subtle parallax effect
    if (window.innerWidth > 768) {
      addParallaxEffect();
    }
  }
  
  /**
   * Create floating star elements
   */
  function createFloatingStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    starsContainer.style.position = 'fixed';
    starsContainer.style.top = '0';
    starsContainer.style.left = '0';
    starsContainer.style.width = '100%';
    starsContainer.style.height = '100%';
    starsContainer.style.pointerEvents = 'none';
    starsContainer.style.zIndex = '-1';
    document.body.appendChild(starsContainer);
    
    // Create stars based on screen size (fewer on mobile for performance)
    const starCount = window.innerWidth > 768 ? 100 : 50;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      
      // Random size between 1px and 3px
      const size = 1 + Math.random() * 2;
      
      // Set star styles
      star.style.position = 'absolute';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = 0.7;
      star.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.8)';
      
      // Add twinkle animation
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 5;
      star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
      
      starsContainer.appendChild(star);
    }
    
    // Add @keyframes rule for twinkling effect if not already present
    if (!document.getElementById('twinkle-animation')) {
      const style = document.createElement('style');
      style.id = 'twinkle-animation';
      style.textContent = `
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  /**
   * Create shooting star effect
   */
  function createShootingStar() {
    // Only on desktop for performance
    if (window.innerWidth < 768) return;
    
    const shootingStar = document.createElement('div');
    
    // Set shooting star styles
    shootingStar.style.position = 'fixed';
    shootingStar.style.width = '2px';
    shootingStar.style.height = '100px';
    shootingStar.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff 20%, rgba(255, 255, 255, 0))';
    shootingStar.style.transform = 'rotate(135deg)';
    shootingStar.style.pointerEvents = 'none';
    shootingStar.style.zIndex = '-1';
    
    // Random position at top portion of screen
    shootingStar.style.left = `${Math.random() * 100}%`;
    shootingStar.style.top = `${Math.random() * 50}%`;
    
    // Add shooting animation
    shootingStar.style.animation = 'shooting-star 1s linear forwards';
    
    document.body.appendChild(shootingStar);
    
    // Remove shooting star after animation completes
    setTimeout(() => {
      shootingStar.remove();
    }, 1000);
    
    // Add @keyframes rule for shooting star if not already present
    if (!document.getElementById('shooting-star-animation')) {
      const style = document.createElement('style');
      style.id = 'shooting-star-animation';
      style.textContent = `
        @keyframes shooting-star {
          0% {
            transform: rotate(135deg) translateX(0);
            opacity: 1;
          }
          100% {
            transform: rotate(135deg) translateX(300px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  /**
   * Add parallax effect to background
   */
  function addParallaxEffect() {
    document.addEventListener('mousemove', function(e) {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
      
      // Apply slight movement to the background
      document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
  }
  
  /**
   * Setup interactive elements
   */
  function setupInteractiveElements() {
    // Setup CV download button
    setupCVDownload();
    
    // Setup any tab interfaces
    setupTabs();
    
    // Add floating animation to elements with float class
    document.querySelectorAll('.float').forEach((element, index) => {
      element.style.animation = `float ${3 + index % 3}s ease-in-out infinite ${index * 0.2}s`;
    });
    
    // Animate skill bars if present
    animateSkillBars();
  }
  
  /**
   * Setup CV download functionality
   */
  function setupCVDownload() {
    const downloadBtn = document.querySelector('.download-btn, .download-pdf');
    
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing PDF...';
        this.disabled = true;
        
        // Log event
        console.log(`${new Date().toISOString()}, click, download-cv`);
        
        // Simulate server processing time for better UX
        setTimeout(() => {
          // Reset button
          this.innerHTML = originalText;
          this.disabled = false;
          
          // Start download
          const downloadURL = this.getAttribute('href') || 'files/swayam-goyal-cv.pdf';
          window.location.href = downloadURL;
          
          // Show success notification
          showNotification('Your CV is downloading!', 'success');
        }, 1200);
      });
    }
  }
  
  /**
   * Setup tab interfaces
   */
  function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (tabButtons.length) {
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          const target = this.getAttribute('data-target');
          
          // Remove active class from all buttons
          tabButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Hide all tab panes
          document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
          });
          
          // Show the target pane
          document.getElementById(target).classList.add('active');
          
          // Log event
          console.log(`${new Date().toISOString()}, click, tab-change:${target}`);
        });
      });
    }
  }
  
  /**
   * Animate skill bars on scroll
   */
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width') || '0%';
            
            // Small delay for better visual effect
            setTimeout(() => {
              bar.style.width = width;
            }, 200);
            
            // Unobserve after animation
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.1 });
      
      skillBars.forEach(bar => {
        observer.observe(bar);
      });
    }
  }
  
  /**
   * Initialize page-specific functions
   */
  function initializePageSpecificFunctions() {
    // Text analyzer page
    if (document.getElementById('text-input')) {
      initializeTextAnalyzer();
    }
    
    // Add fade-in animations to elements
    addScrollAnimations();
    
    // Handle CV page technologies grid
    if (document.querySelector('.tech-icons')) {
      animateTechIcons();
    }
  }
  
  /**
   * Add scroll animations to elements
   */
  function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
    
    if (animatedElements.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(element => {
        observer.observe(element);
      });
    }
  }
  
  /**
   * Animate technology icons
   */
  function animateTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
      // Add floating animation with different delays
      icon.style.animation = `float ${3 + index % 3}s ease-in-out infinite ${index * 0.2}s`;
      
      // Add hover effect
      icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
      });
      
      icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
  }
  
  /**
   * Initialize text analyzer functionality
   */
  function initializeTextAnalyzer() {
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const sampleBtn = document.getElementById('sample-btn');
    
    if (!textInput || !analyzeBtn) return;
    
    // Add cosmic glow effect to text area on focus
    textInput.addEventListener('focus', function() {
      this.style.borderColor = 'var(--galaxy-teal)';
      this.style.boxShadow = '0 0 15px rgba(65, 233, 195, 0.3)';
    });
    
    textInput.addEventListener('blur', function() {
      this.style.borderColor = 'var(--border-light)';
      this.style.boxShadow = 'none';
    });
    
    // Analyze button click handler
    analyzeBtn.addEventListener('click', function() {
      const text = textInput.value.trim();
      
      if (!text) {
        showNotification('Please enter some text to analyze', 'error');
        return;
      }
      
      // Show loading state
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
      this.disabled = true;
      
      // Log event
      console.log(`${new Date().toISOString()}, click, analyze-text`);
      
      // Use setTimeout to allow UI to update (prevents browser freeze on large text)
      setTimeout(() => {
        // The actual analysis would happen in textAnalyzer.js
        // This is just a placeholder
        
        // Reset button state
        this.innerHTML = originalText;
        this.disabled = false;
        
        // Show success notification
        showNotification('Analysis complete!', 'success');
      }, 800);
    });
    
    // Sample text button
    if (sampleBtn) {
      sampleBtn.addEventListener('click', function() {
        // Try to load sample text from file
        fetch('files/sample-text.txt')
          .then(response => response.text())
          .then(data => {
            textInput.value = data;
          })
          .catch(() => {
            // Fallback sample text
            textInput.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
          });
        
        // Log event
        console.log(`${new Date().toISOString()}, click, load-sample-text`);
      });
    }
  }
  
  /**
   * Update copyright year in footer
   */
  function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.current-year, #current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }
  
  /**
   * Initialize event tracking for assignment requirement
   */
  function initializeEventTracking() {
    // Track all clicks
    document.addEventListener('click', function(e) {
      const target = e.target.closest('button, a, .card, .nav-link') || e.target;
      const timestamp = new Date().toISOString();
      const elementType = target.tagName.toLowerCase();
      const elementId = target.id || 'unnamed';
      const elementClass = Array.from(target.classList).join(' ') || 'no-class';
      
      console.log(`${timestamp}, click, ${elementType}#${elementId}.${elementClass}`);
    });
    
    // Track page load
    console.log(`${new Date().toISOString()}, view, page:${window.location.pathname.split('/').pop() || 'index.html'}`);
  }
  
  /**
   * Show notification message
   * @param {string} message - The message to display
   * @param {string} type - Type of notification (success, error, info)
   */
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
      notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Determine icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          max-width: 350px;
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius-md);
          padding: 15px 20px;
          box-shadow: var(--box-shadow-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 1000;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .notification.show {
          opacity: 1;
          transform: translateY(0);
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .notification-content i {
          font-size: 20px;
        }
        
        .notification-success i {
          color: var(--galaxy-teal);
        }
        
        .notification-error i {
          color: var(--nova-pink);
        }
        
        .notification-close {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 14px;
          padding: 5px;
        }
        
        .notification-close:hover {
          color: var(--text-primary);
        }
        
        @media (max-width: 480px) {
          .notification {
            left: 20px;
            right: 20px;
            max-width: none;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show with slight delay for animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.remove('show');
        setTimeout(() => {
          if (document.body.contains(notification)) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }
  
  // Execute the navigation bar fix immediately
  (function() {
    // This ensures the fix runs even before DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fixNavigationBarIssue);
    } else {
      fixNavigationBarIssue();
    }
  })();
  