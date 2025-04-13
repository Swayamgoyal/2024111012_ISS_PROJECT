document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const sampleBtn = document.getElementById('sample-btn');
    
    if (!textInput || !analyzeBtn) return;
    
    // Add cosmic glow effect to text area on focus
    textInput.addEventListener('focus', function() {
        this.classList.add('cosmic-glow');
    });
    
    textInput.addEventListener('blur', function() {
        this.classList.remove('cosmic-glow');
    });
    
    // Analyze button click handler with loading animation
    analyzeBtn.addEventListener('click', function() {
        // Add loading state
        this.classList.add('loading');
        this.innerHTML = '<span class="loading-text">Analyzing</span>';
        
        // Simulate processing delay for better UX
        setTimeout(() => {
            const text = textInput.value;
            
            if (!text) {
                showNotification('Please enter some text to analyze', 'warning');
                analyzeBtn.classList.remove('loading');
                analyzeBtn.innerHTML = '<i class="fas fa-code"></i> Analyze Text';
                return;
            }
            
            // Perform analysis
            const basicStats = analyzeBasicStats(text);
            const pronouns = countPronouns(text);
            const prepositions = countPrepositions(text);
            const articles = countArticles(text);
            
            // Display results with animation
            displayBasicStats(basicStats);
            displayTableResults(pronouns, 'pronouns-table');
            displayTableResults(prepositions, 'prepositions-table');
            displayTableResults(articles, 'articles-table');
            
            // Show success notification
            showNotification('Analysis complete!', 'success');
            
            // Remove loading state
            analyzeBtn.classList.remove('loading');
            analyzeBtn.innerHTML = '<i class="fas fa-code"></i> Analyze Text';
            
            // Switch to results tab if on mobile
            if (window.innerWidth < 768) {
                document.querySelector('.tab-btn[data-target="basic-stats"]').click();
            }
        }, 800);
    });
    
    // Sample text button click handler
    if (sampleBtn) {
        sampleBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            
            // Load a sample text (excerpt from a famous book or article)
            fetch('files/sample-text.txt')
                .then(response => response.text())
                .then(data => {
                    textInput.value = data;
                    
                    // Create typing effect
                    typeText(textInput, data);
                    
                    // Show notification
                    showNotification('Sample text loaded!', 'info');
                    
                    // Remove loading state
                    this.classList.remove('loading');
                })
                .catch(error => {
                    // If file doesn't exist, use a fallback sample text
                    const sampleText = getSampleText();
                    textInput.value = sampleText;
                    
                    // Create typing effect
                    typeText(textInput, sampleText);
                    
                    // Show notification
                    showNotification('Sample text loaded!', 'info');
                    
                    // Remove loading state
                    this.classList.remove('loading');
                });
        });
    }
    
    // Function to create a typing effect
    function typeText(element, text) {
        // Store the full text
        const fullText = text;
        
        // Clear the element
        element.value = '';
        
        // Set cursor to end
        element.scrollTop = element.scrollHeight;
        
        // Skip animation for very long texts
        if (text.length > 5000) {
            element.value = fullText;
            return;
        }
        
        // Type with increasing speed
        let i = 0;
        const initialSpeed = 1; // ms per character
        
        function typeCharacter() {
            if (i < fullText.length) {
                element.value += fullText.charAt(i);
                i++;
                
                // Scroll to bottom as we type
                element.scrollTop = element.scrollHeight;
                
                // Increase speed as we go
                const speed = Math.max(initialSpeed * (1 - i/fullText.length * 0.9), 0.1);
                setTimeout(typeCharacter, speed);
            }
        }
        
        typeCharacter();
    }
    
    // Function to show notification
    function showNotification(message, type = 'info') {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                               type === 'warning' ? 'fa-exclamation-triangle' : 
                               'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Add active class after a small delay (for animation)
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // Add close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('active');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
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
        const elements = {
            'letters-count': stats.letters,
            'words-count': stats.words,
            'spaces-count': stats.spaces,
            'newlines-count': stats.newlines,
            'special-count': stats.specialSymbols
        };
        
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                // Animate the counting
                animateCount(element, value);
            }
        }
    }
    
    // Function to animate counting
    function animateCount(element, targetValue) {
        // Get current value
        const startValue = parseInt(element.textContent) || 0;
        const duration = 1500; // ms
        const frameRate = 60;
        const totalFrames = duration / (1000 / frameRate);
        const valueIncrement = (targetValue - startValue) / totalFrames;
        
        let currentFrame = 0;
        let currentValue = startValue;
        
        const animate = () => {
            currentFrame++;
            currentValue += valueIncrement;
            
            if (currentFrame <= totalFrames) {
                element.textContent = Math.round(currentValue);
                requestAnimationFrame(animate);
            } else {
                element.textContent = targetValue;
                
                // Add a pulse effect when done
                element.classList.add('pulse-once');
                setTimeout(() => {
                    element.classList.remove('pulse-once');
                }, 1000);
            }
        };
        
        animate();
    }
    
    // Function to display table results with animation
    function displayTableResults(counts, tableId) {
        const table = document.getElementById(tableId);
        if (!table) return;
        
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
        
        // Make table sortable
        makeTableSortable(table);
    }
    
    // Function to make tables sortable
    function makeTableSortable(table) {
        const headers = table.querySelectorAll('th');
        
        headers.forEach(header => {
            // Add sortable class and cursor
            header.classList.add('sortable');
            
            header.addEventListener('click', () => {
                const isAscending = header.classList.contains('asc');
                
                // Reset all headers
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                
                // Set new sort direction
                header.classList.add(isAscending ? 'desc' : 'asc');
                
                // Get the index of the clicked header
                const columnIndex = Array.from(header.parentNode.children).indexOf(header);
                
                // Get all rows except the header
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                // Sort the rows
                rows.sort((rowA, rowB) => {
                    const cellA = rowA.cells[columnIndex].textContent.trim();
                    const cellB = rowB.cells[columnIndex].textContent.trim();
                    
                    // Check if the content is numeric
                    const numA = parseFloat(cellA);
                    const numB = parseFloat(cellB);
                    
                    if (!isNaN(numA) && !isNaN(numB)) {
                        return isAscending ? numA - numB : numB - numA;
                    } else {
                        return isAscending 
                            ? cellA.localeCompare(cellB) 
                            : cellB.localeCompare(cellA);
                    }
                });
                
                // Remove all rows from the table
                rows.forEach(row => row.remove());
                
                // Add the sorted rows back to the table
                rows.forEach(row => tbody.appendChild(row));
            });
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
    
    // Initialize tabs
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
