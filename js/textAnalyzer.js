document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const sampleBtn = document.getElementById('sample-btn');
    
    if (!textInput || !analyzeBtn) return;
    
    // Analyze button click handler
    analyzeBtn.addEventListener('click', function() {
        // Add loading state
        analyzeBtn.classList.add('loading');
        
        setTimeout(() => {
            const text = textInput.value;
            
            if (!text) {
                alert('Please enter some text to analyze.');
                analyzeBtn.classList.remove('loading');
                return;
            }
            
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
            
            // Remove loading state
            analyzeBtn.classList.remove('loading');
        }, 500);
    });
    
    // Sample text button click handler
    if (sampleBtn) {
        sampleBtn.addEventListener('click', function() {
            // Load a sample text (excerpt from a famous book or article)
            fetch('files/sample-text.txt')
                .then(response => response.text())
                .then(data => {
                    textInput.value = data;
                })
                .catch(error => {
                    // If file doesn't exist, use a fallback sample text
                    textInput.value = getSampleText();
                });
        });
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
    
    // Function to display basic statistics
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
                element.textContent = value;
                element.setAttribute('data-count', value);
                element.classList.add('animate-count');
            }
        }
    }
    
    // Function to display table results
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
        
        // Create table rows
        sortedEntries.forEach(([word, count]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${word}</td>
                <td>${count}</td>
            `;
            tbody.appendChild(row);
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

    // Function to animate counting
    function animateCount(element, targetValue) {
        let currentValue = 0;
        const duration = 1000; // 1 second
        const stepTime = 20; // Update every 20ms
        const steps = duration / stepTime;
        const increment = targetValue / steps;

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                clearInterval(timer);
                currentValue = targetValue;
            }
            element.textContent = Math.round(currentValue);
        }, stepTime);
    }

    // Function to make tables sortable
    function makeSortable(tableId) {
        const table = document.getElementById(tableId);
        if (!table) return;

        const headers = table.querySelectorAll('th');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.cellIndex;
                const rows = Array.from(table.querySelectorAll('tbody tr'));
                const isAscending = header.classList.contains('asc');

                // Sort the rows
                rows.sort((a, b) => {
                    const aValue = a.cells[column].textContent;
                    const bValue = b.cells[column].textContent;
                    return isAscending 
                        ? bValue.localeCompare(aValue, undefined, {numeric: true}) 
                        : aValue.localeCompare(bValue, undefined, {numeric: true});
                });

                // Remove existing rows
                rows.forEach(row => row.remove());

                // Append sorted rows
                rows.forEach(row => table.querySelector('tbody').appendChild(row));

                // Update header classes
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                header.classList.toggle('asc', !isAscending);
                header.classList.toggle('desc', isAscending);
            });
        });
    }

    // Make tables sortable
    makeSortable('pronouns-table');
    makeSortable('prepositions-table');
    makeSortable('articles-table');

    // Word count warning
    const wordCountWarning = document.createElement('div');
    wordCountWarning.className = 'word-count-warning';
    wordCountWarning.textContent = 'For best results, please enter at least 10,000 words.';
    textInput.parentNode.insertBefore(wordCountWarning, textInput.nextSibling);

    textInput.addEventListener('input', function() {
        const wordCount = this.value.trim().split(/\s+/).length;
        wordCountWarning.classList.toggle('show', wordCount < 10000);
    });

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = tooltipText;
            document.body.appendChild(tooltipEl);

            const rect = e.target.getBoundingClientRect();
            tooltipEl.style.top = `${rect.bottom + window.scrollY + 5}px`;
            tooltipEl.style.left = `${rect.left + window.scrollX}px`;
        });

        tooltip.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
});
