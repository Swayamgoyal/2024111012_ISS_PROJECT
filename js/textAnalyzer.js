/**
 * Text Analyzer Module
 * Analyzes text content with various metrics
 * Author: Swayam Goyal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const sampleBtn = document.getElementById('sample-btn');
    const wordCountWarning = document.getElementById('word-count-warning');
    
    if (!textInput || !analyzeBtn) return;
    
    // Initialize tab functionality
    initTabs();
    
    // Add cosmic glow effect to text area on focus
    textInput.addEventListener('focus', function() {
        this.parentElement.classList.add('cosmic-glow');
    });
    
    textInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('cosmic-glow');
    });
    
    // Check word count on input
    textInput.addEventListener('input', checkWordCount);
    
    // Analyze button click handler
    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value;
        
        if (!text) {
            showNotification('Please enter some text to analyze', 'warning');
            return;
        }
        
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        this.disabled = true;
        
        // Use setTimeout to allow UI to update before heavy processing
        setTimeout(() => {
            // Perform analysis
            const basicStats = analyzeBasicStats(text);
            const pronouns = countPronouns(text);
            const prepositions = countPrepositions(text);
            const articles = countArticles(text);
            
            // Display results
            displayBasicStats(basicStats);
            displayTableResults(pronouns, 'pronouns-table');
            displayTableResults(prepositions, 'prepositions-table');
            displayTableResults(articles, 'articles-table');
            
            // Reset button state
            this.innerHTML = originalText;
            this.disabled = false;
            
            // Show success notification
            showNotification('Analysis complete!', 'success');
            
            // Log event
            console.log(`${new Date().toISOString()}, complete, text-analysis`);
        }, 500);
    });
    
    // Sample text button click handler
    if (sampleBtn) {
        sampleBtn.addEventListener('click', function() {
            // Load sample text from file
            fetch('files/sample-text.txt')
                .then(response => response.text())
                .then(data => {
                    textInput.value = data;
                    checkWordCount();
                })
                .catch(error => {
                    // If file doesn't exist, use fallback sample text
                    textInput.value = getSampleText();
                    checkWordCount();
                });
        });
    }
    
    // Initialize tabs
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab content
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // Check word count and show warning if needed
    function checkWordCount() {
        if (!textInput.value.trim()) {
            hideWordCountWarning();
            return;
        }
        
        const words = textInput.value.trim().split(/\s+/).length;
        if (words < 10000) {
            showWordCountWarning();
        } else {
            hideWordCountWarning();
        }
    }
    
    function showWordCountWarning() {
        if (!wordCountWarning) return;
        wordCountWarning.classList.remove('hidden');
    }
    
    function hideWordCountWarning() {
        if (!wordCountWarning) return;
        wordCountWarning.classList.add('hidden');
    }
});

/**
 * Analyze basic text statistics
 * @param {string} text - Text to analyze
 * @returns {object} Basic statistics
 */
function analyzeBasicStats(text) {
    // Count letters (a-z, A-Z)
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    
    // Count words (sequences of characters separated by whitespace)
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    
    // Count spaces (whitespace characters)
    const spaces = (text.match(/\s/g) || []).length;
    
    // Count newlines
    const newlines = (text.match(/\n/g) || []).length;
    
    // Count special characters (punctuation, symbols, etc.)
    const specialSymbols = (text.match(/[^\w\s]|[_]/g) || []).length;
    
    // Count digits
    const digits = (text.match(/\d/g) || []).length;
    
    // Count sentences (ending with ., !, or ?)
    const sentences = (text.match(/[.!?]+(?=\s+|$)/g) || []).length;
    
    // Count paragraphs (blocks of text separated by empty lines)
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    
    return {
        letters,
        words,
        spaces,
        newlines,
        specialSymbols,
        digits,
        sentences,
        paragraphs
    };
}

/**
 * Count pronouns in text with categories
 * @param {string} text - Text to analyze
 * @returns {object} Pronouns and their counts
 */
function countPronouns(text) {
    const pronounCategories = {
        'personal': ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'yourselves', 
                    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 
                    'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves'],
        'relative': ['who', 'whom', 'whose', 'which', 'that'],
        'demonstrative': ['this', 'these', 'that', 'those'],
        'interrogative': ['who', 'whom', 'whose', 'which', 'what'],
        'indefinite': ['anybody', 'anyone', 'anything', 'each', 'either', 'everybody', 'everyone', 
                      'everything', 'neither', 'nobody', 'nothing', 'one', 'somebody', 'someone', 'something']
    };
    
    // Flatten all pronouns for counting
    const allPronouns = Object.values(pronounCategories).flat();
    const counts = countWordsByCategory(text, allPronouns);
    
    // Add category information to the results
    const categorizedCounts = {};
    
    for (const [pronoun, count] of Object.entries(counts)) {
        // Find which category this pronoun belongs to
        let category = 'other';
        for (const [cat, pronounList] of Object.entries(pronounCategories)) {
            if (pronounList.includes(pronoun)) {
                category = cat;
                break;
            }
        }
        
        // Add to categorized counts with category prefix
        categorizedCounts[`${pronoun} (${category})`] = count;
    }
    
    return categorizedCounts;
}

/**
 * Count prepositions in text
 * @param {string} text - Text to analyze
 * @returns {object} Prepositions and their counts
 */
function countPrepositions(text) {
    const prepositionList = [
        'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
        'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
        'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
        'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of',
        'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding',
        'round', 'since', 'through', 'throughout', 'to', 'toward', 'towards', 'under',
        'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'
    ];
    
    const counts = countWordsByCategory(text, prepositionList);
    
    // Add frequency indicators for better analysis
    const enhancedCounts = {};
    for (const [prep, count] of Object.entries(counts)) {
        let frequencyLabel;
        if (count > 50) frequencyLabel = "very common";
        else if (count > 20) frequencyLabel = "common";
        else if (count > 10) frequencyLabel = "moderate";
        else frequencyLabel = "rare";
        
        enhancedCounts[`${prep} (${frequencyLabel})`] = count;
    }
    
    return enhancedCounts;
}

/**
 * Count articles in text
 * @param {string} text - Text to analyze
 * @returns {object} Articles and their counts
 */
function countArticles(text) {
    const articleList = ['a', 'an', 'the'];
    const counts = countWordsByCategory(text, articleList);
    
    // Add article type information
    const enhancedCounts = {};
    if (counts['a']) enhancedCounts['a (indefinite)'] = counts['a'];
    if (counts['an']) enhancedCounts['an (indefinite)'] = counts['an'];
    if (counts['the']) enhancedCounts['the (definite)'] = counts['the'];
    
    return enhancedCounts;
}

/**
 * Count words by category (helper function)
 * @param {string} text - Text to analyze
 * @param {array} wordList - List of words to count
 * @returns {object} Words and their counts
 */
function countWordsByCategory(text, wordList) {
    // Convert text to lowercase and extract words
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const counts = {};
    
    // Count occurrences of words in the word list
    words.forEach(word => {
        if (wordList.includes(word)) {
            counts[word] = (counts[word] || 0) + 1;
        }
    });
    
    return counts;
}

/**
 * Display basic statistics
 * @param {object} stats - Statistics to display
 */
function displayBasicStats(stats) {
    // Update HTML elements with statistics
    document.getElementById('letters-count').textContent = stats.letters.toLocaleString();
    document.getElementById('words-count').textContent = stats.words.toLocaleString();
    document.getElementById('spaces-count').textContent = stats.spaces.toLocaleString();
    document.getElementById('newlines-count').textContent = stats.newlines.toLocaleString();
    document.getElementById('special-count').textContent = stats.specialSymbols.toLocaleString();
    
    // Update optional stats if elements exist
    if (document.getElementById('digits-count')) {
        document.getElementById('digits-count').textContent = stats.digits.toLocaleString();
    }
    
    if (document.getElementById('sentences-count')) {
        document.getElementById('sentences-count').textContent = stats.sentences.toLocaleString();
    }
    
    if (document.getElementById('paragraphs-count')) {
        document.getElementById('paragraphs-count').textContent = stats.paragraphs.toLocaleString();
    }
    
    // Add animation to numbers
    document.querySelectorAll('.stat-count').forEach(element => {
        element.classList.add('number-changed');
        setTimeout(() => {
            element.classList.remove('number-changed');
        }, 1000);
    });
}

/**
 * Display table results with sorting and formatting
 * @param {object} counts - Data to display
 * @param {string} tableId - ID of target table
 */
function displayTableResults(counts, tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    // Clear previous results
    tbody.innerHTML = '';
    
    // Sort by count (descending)
    const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    
    if (sortedEntries.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="2">No data available</td>';
        tbody.appendChild(row);
        return;
    }
    
    // Calculate total for percentage
    const total = sortedEntries.reduce((sum, [, count]) => sum + count, 0);
    
    // Create table rows with staggered animation
    sortedEntries.forEach(([word, count], index) => {
        const percentage = ((count / total) * 100).toFixed(1);
        const row = document.createElement('tr');
        row.className = 'stagger-item';
        
        // Extract word and category information if available
        let wordDisplay = word;
        let typeInfo = '';
        
        const typeMatch = word.match(/\((.*?)\)$/);
        if (typeMatch) {
            wordDisplay = word.split(' (')[0];
            typeInfo = typeMatch[1];
        }
        
        row.innerHTML = `
            <td>
                <span class="word-text">${wordDisplay}</span>
                ${typeInfo ? `<span class="word-type">${typeInfo}</span>` : ''}
            </td>
            <td>${count} <span class="percentage">(${percentage}%)</span></td>
        `;
        
        tbody.appendChild(row);
        
        // Staggered animation
        setTimeout(() => {
            row.classList.add('visible');
        }, 50 * index);
    });
}

/**
 * Get a sample text for demonstration
 * @returns {string} Sample text
 */
function getSampleText() {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood?

I believe that we can achieve great things if we work together. You should always strive to do your best in everything that you do. He went to the store to buy some groceries, but she had already purchased them. We are planning a trip to the mountains this weekend. They said that they would join us if the weather is good.

This is a sample text that includes various pronouns, prepositions, and articles for analysis purposes. The text analyzer will count these elements and display the results in a structured format. A comprehensive analysis will show you the distribution of different word types within your text.`;
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification
 */
function showNotification(message, type = 'info') {
    // Check if function exists in global scope
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
        return;
    }
    
    // Otherwise implement locally
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles if not already in document
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--bg-secondary);
                color: var(--text-primary);
                border-radius: 8px;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 450px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s, transform 0.3s;
            }
            
            .notification.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .notification-content i {
                font-size: 24px;
            }
            
            .notification-success i {
                color: var(--galaxy-teal);
            }
            
            .notification-error i {
                color: var(--nova-pink);
            }
            
            .notification-warning i {
                color: var(--star-yellow);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                font-size: 16px;
                transition: color 0.3s;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            @media (max-width: 768px) {
                .notification {
                    min-width: 0;
                    max-width: 90%;
                    left: 50%;
                    transform: translateX(-50%) translateY(20px);
                }
                
                .notification.show {
                    transform: translateX(-50%) translateY(0);
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
    
    // Auto-close after 5 seconds
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
