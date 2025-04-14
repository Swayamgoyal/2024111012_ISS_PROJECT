/**
 * Dark Mode Toggle Module
 * Enables switching between light and dark cosmic themes
 * @author Swayam Goyal
 */

(function() {
    // Constants
    const STORAGE_KEY = 'swayam-theme-preference';
    const DARK_CLASS = 'dark-mode';
    const LIGHT_CLASS = 'light-mode';
    const DEFAULT_THEME = 'dark'; // Default theme
    
    // Execute when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize dark mode
        initializeDarkMode();
        
        // Setup dark mode toggle button
        setupDarkModeToggle();
    });
    
    /**
     * Initialize dark mode based on user preference or default
     */
    function initializeDarkMode() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
        
        // Apply saved theme
        applyTheme(savedTheme);
        
        // Add theme toggle button if it doesn't exist
        if (!document.querySelector('.theme-toggle')) {
            createThemeToggleButton();
        }
        
        // Listen for system preference changes
        if (window.matchMedia) {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Set initial theme if no saved preference
            if (!localStorage.getItem(STORAGE_KEY)) {
                const initialTheme = prefersDarkScheme.matches ? 'dark' : 'light';
                applyTheme(initialTheme);
            }
            
            // Listen for system preference changes
            prefersDarkScheme.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't explicitly set a preference
                if (!localStorage.getItem(STORAGE_KEY)) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    applyTheme(newTheme);
                }
            });
        }
    }
    
    /**
     * Apply theme to document
     * @param {string} theme - 'dark' or 'light'
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.remove(LIGHT_CLASS);
            document.body.classList.add(DARK_CLASS);
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeToggleButton('dark');
        } else {
            document.body.classList.remove(DARK_CLASS);
            document.body.classList.add(LIGHT_CLASS);
            document.documentElement.setAttribute('data-theme', 'light');
            updateThemeToggleButton('light');
        }
    }
    
    /**
     * Create theme toggle button if it doesn't exist
     */
    function createThemeToggleButton() {
        const navbar = document.querySelector('.nav-container');
        
        if (navbar) {
            const themeToggle = document.createElement('button');
            themeToggle.className = 'theme-toggle';
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
            themeToggle.innerHTML = `
                <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
            
            // Add theme toggle styles if not already present
            if (!document.getElementById('theme-toggle-style')) {
                const style = document.createElement('style');
                style.id = 'theme-toggle-style';
                style.textContent = `
                    .theme-toggle {
                        background: transparent;
                        border: none;
                        color: var(--text-primary);
                        cursor: pointer;
                        padding: 5px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 40px;
                        margin-left: 15px;
                        transition: background-color 0.3s;
                    }
                    
                    .theme-toggle:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                    }
                    
                    .theme-toggle .moon-icon,
                    .theme-toggle .sun-icon {
                        position: absolute;
                        transition: transform 0.5s ease, opacity 0.5s ease;
                    }
                    
                    .dark-mode .theme-toggle .moon-icon,
                    .theme-toggle .sun-icon {
                        opacity: 0;
                        transform: scale(0);
                    }
                    
                    .dark-mode .theme-toggle .sun-icon,
                    .theme-toggle .moon-icon {
                        opacity: 1;
                        transform: scale(1);
                    }
                    
                    /* Light mode styles */
                    .light-mode {
                        --space-black: #f5f5f7;
                        --deep-space: #ffffff;
                        --text-primary: #121212;
                        --text-secondary: rgba(0, 0, 0, 0.7);
                        --text-muted: rgba(0, 0, 0, 0.5);
                        --bg-primary: rgba(255, 255, 255, 0.8);
                        --bg-secondary: rgba(240, 240, 245, 0.7);
                        --bg-tertiary: rgba(225, 225, 235, 0.5);
                        --border-light: rgba(0, 0, 0, 0.1);
                    }
                    
                    .light-mode .navbar,
                    .light-mode .footer {
                        background-color: rgba(255, 255, 255, 0.8);
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Insert before any existing buttons or the hamburger menu
            const hamburger = navbar.querySelector('.hamburger');
            if (hamburger) {
                navbar.insertBefore(themeToggle, hamburger);
            } else {
                navbar.appendChild(themeToggle);
            }
        }
    }
    
    /**
     * Setup click handler for dark mode toggle
     */
    function setupDarkModeToggle() {
        // Get all theme toggle buttons (including ones added later)
        document.addEventListener('click', function(e) {
            if (e.target.closest('.theme-toggle')) {
                toggleTheme();
            }
        });
    }
    
    /**
     * Toggle between dark and light themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Save preference
        localStorage.setItem(STORAGE_KEY, newTheme);
        
        // Apply theme
        applyTheme(newTheme);
        
        // Show theme change notification
        showThemeChangeNotification(newTheme);
    }
    
    /**
     * Update theme toggle button appearance
     * @param {string} theme - Current theme
     */
    function updateThemeToggleButton(theme) {
        const toggleButton = document.querySelector('.theme-toggle');
        if (!toggleButton) return;
        
        // Update aria label
        toggleButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    
    /**
     * Show theme change notification
     * @param {string} theme - New theme
     */
    function showThemeChangeNotification(theme) {
        // Check if showNotification function exists (defined in script.js)
        if (typeof window.showNotification === 'function') {
            const message = theme === 'dark' ? 'Dark mode activated' : 'Light mode activated';
            window.showNotification(message, 'info');
        }
    }
})();
