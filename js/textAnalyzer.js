document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const sampleBtn = document.getElementById('sample-btn');
    
    if (!textInput || !analyzeBtn) return;
    
    // Add cosmic glow effect to text area on focus
    textInput.addEventListener('focus', function() {
        this.parentElement.classList.add('cosmic-glow');
    });
    
    textInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('cosmic-glow');
    });
    
    // Tab navigation
    const tabBtns = document.querySelectorAll('.results-tabs .tab-btn');
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
    
    // Word count check
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
        const warningEl = document.getElementById('word-count-warning');
        if (warningEl) {
            warningEl.classList.remove('hidden');
        } else {
            // Create warning if it doesn't exist
            const warning = document.createElement('div');
            warning.id = 'word-count-warning';
            warning.className = 'word-count-warning';
            warning.innerHTML = '<i class="fas fa-exclamation-triangle"></i> For best results, please enter at least 10,000 words.';
            textInput.parentElement.parentElement.appendChild(warning);
        }
    }
    
    function hideWordCountWarning() {
        const warningEl = document.getElementById('word-count-warning');
        if (warningEl) {
            warningEl.classList.add('hidden');
        }
    }
    
    // Check word count on input
    textInput.addEventListener('input', checkWordCount);
    
    // Analyze button click handler with loading animation
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
        
        // Use setTimeout to allow UI to update
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
        }, 500); // Simulate processing delay for better UX
    });
    
    // Sample text button click handler
    sampleBtn.addEventListener('click', function() {
        // Load a sample text (excerpt from a famous book or article)
        fetch('files/sample-text.txt')
            .then(response => response.text())
            .then(data => {
                textInput.value = data;
                checkWordCount();
            })
            .catch(error => {
                // If file doesn't exist, use a fallback sample text
                textInput.value = getSampleText();
                checkWordCount();
            });
    });
    
    // Function to show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on notification type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Add close button event
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
    
    // Function to analyze basic statistics
    function analyzeBasicStats(text) {
        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        const words = text.split(/\s+/).filter(word => word.length > 0).length;
        const spaces = (text.match(/\s/g) || []).length;
        const newlines = (text.match(/\n/g) || []).length;
        const specialSymbols = (text.match(/[^\w\s]/g) || []).length;
        
        return { letters, words, spaces, newlines, specialSymbols };
    }
    
    // Function to count pronouns
    function countPronouns(text) {
        const pronounList = [
            'i', 'me', 'my', 'mine', 'myself',
            'you', 'your', 'yours', 'yourself', 'yourselves',
            'he', 'him', 'his', 'himself',
            'she', 'her', 'hers', 'herself',
            'it', 'its', 'itself',
            'we', 'us', 'our', 'ours', 'ourselves',
            'they', 'them', 'their', 'theirs', 'themselves',
            'who', 'whom', 'whose', 'which', 'what', 'that',
            'this', 'these', 'those'
        ];
        
        return countWordsByCategory(text, pronounList);
    }
    
    // Function to count prepositions
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
        
        return countWordsByCategory(text, prepositionList);
    }
    
    // Function to count indefinite articles
    function countArticles(text) {
        const articleList = ['a', 'an', 'the'];
        
        return countWordsByCategory(text, articleList);
    }
    
    // Helper function to count words by category
    function countWordsByCategory(text, wordList) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const counts = {};
        
        words.forEach(word => {
            if (wordList.includes(word)) {
                counts[word] = (counts[word] || 0) + 1;
            }
        });
        
        return counts;
    }
    
    // Function to display basic statistics with animation
    function displayBasicStats(stats) {
        Object.entries(stats).forEach(([key, value]) => {
            const element = document.getElementById(`${key}-count`);
            if (element) {
                // Animate the counter
                animateCounter(element, value);
            }
        });
    }
    
    // Animate counter function
    function animateCounter(element, target) {
        const duration = 1000;
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const animate = () => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if ((increment > 0 && current < target) || (increment < 0 && current > target)) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Function to display table results
    function displayTableResults(counts, tableId) {
        const table = document.getElementById(tableId);
        const tbody = table.querySelector('tbody');
        
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
        
        // Create table rows with staggered animation
        sortedEntries.forEach(([word, count], index) => {
            const row = document.createElement('tr');
            row.className = 'stagger-item';
            row.innerHTML = `
                <td>${word}</td>
                <td>${count}</td>
            `;
            tbody.appendChild(row);
            
            // Staggered animation
            setTimeout(() => {
                row.classList.add('visible');
            }, 50 * index);
        });
    }
    
    // Function to provide a fallback sample text
    function getSampleText() {
        return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood?

I believe that we can achieve great things if we work together. You should always strive to do your best in everything that you do. He went to the store to buy some groceries, but she had already purchased them. We are planning a trip to the mountains this weekend. They said that they would join us if the weather is good.

This is a sample text that includes various pronouns, prepositions, and articles for analysis purposes. The text analyzer will count these elements and display the results in a structured format. A comprehensive analysis will show you the distribution of different word types within your text.

In the beginning, God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. And God said, Let there be light: and there was light. And God saw the light, that it was good: and God divided the light from the darkness.

To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles And by opposing end them. To die—to sleep, No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to: 'tis a consummation Devoutly to be wish'd. To die, to sleep; To sleep, perchance to dream—ay, there's the rub: For in that sleep of death what dreams may come, When we have shuffled off this mortal coil, Must give us pause—there's the respect That makes calamity of so long life.

Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.`;
    }
    
    // Word count warning
    const wordCountWarning = document.createElement('div');
    wordCountWarning.className = 'word-count-warning';
    wordCountWarning.innerHTML = '<i class="fas fa-exclamation-triangle"></i> For best results, please enter at least 10,000 words.';
    
    if (textInput) {
        textInput.parentNode.insertBefore(wordCountWarning, textInput.nextSibling);
        
        textInput.addEventListener('input', function() {
            const wordCount = this.value.trim().split(/\s+/).filter(word => word.length > 0).length;
            wordCountWarning.classList.toggle('show', wordCount > 0 && wordCount < 10000);
        });
    }
});
