document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button in navbar
    const navbar = document.querySelector('.nav-container');
    if (navbar) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = `
            <i class="fas fa-sun light-icon"></i>
            <i class="fas fa-moon dark-icon"></i>
        `;
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        navbar.appendChild(themeToggle);
        
        // Update button state based on current theme
        updateThemeToggle(savedTheme);
        
        // Add toggle event
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply theme change with transition
            document.documentElement.classList.add('theme-transition');
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update toggle button
            updateThemeToggle(newTheme);
            
            // Remove transition class
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 500);
        });
    }
    
    // Function to update toggle button
    function updateThemeToggle(theme) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            if (theme === 'dark') {
                themeToggle.classList.remove('light-mode');
                themeToggle.classList.add('dark-mode');
            } else {
                themeToggle.classList.remove('dark-mode');
                themeToggle.classList.add('light-mode');
            }
        }
    }
    
    // Add CSS variables for light theme
    const style = document.createElement('style');
    style.textContent = `
        :root[data-theme="light"] {
            --space-black: #f7f9fc;
            --deep-space: #e1e7f4;
            --nebula-purple: #9d6ad8;
            --cosmic-blue: #5a7de9;
            --star-yellow: #f8c932;
            --nova-pink: #ff5e94;
            --galaxy-teal: #41e9c3;
            --meteor-orange: #ff7b29;
            --space-gray: #6e7898;
            
            --text-primary: #2d3047;
            --text-secondary: rgba(45, 48, 71, 0.7);
            --text-muted: rgba(45, 48, 71, 0.5);
            --bg-primary: rgba(247, 249, 252, 0.7);
            --bg-secondary: rgba(225, 231, 244, 0.7);
            --bg-tertiary: rgba(110, 120, 152, 0.1);
        }
        
        .theme-transition {
            transition: all 0.3s ease-in-out;
        }
        
        .theme-toggle {
            background: transparent;
            border: none;
            color: var(--text-primary);
            font-size: 20px;
            cursor: pointer;
            margin-left: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            background-color: rgba(65, 233, 195, 0.1);
        }
        
        .theme-toggle .light-icon {
            display: none;
        }
        
        .theme-toggle .dark-icon {
            display: block;
        }
        
        .theme-toggle.light-mode .light-icon {
            display: block;
        }
        
        .theme-toggle.light-mode .dark-icon {
            display: none;
        }
        
        :root[data-theme="light"] body::after {
            opacity: 0.3;
        }
    `;
    document.head.appendChild(style);
});
