// textAnalyzer.js - Analyze text input
document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const textInput = document.getElementById('text-input');
    const resultsDiv = document.getElementById('analysis-results');
    
    if (!analyzeBtn || !textInput || !resultsDiv) return;
    
    analyzeBtn.addEventListener('click', () => {
        const text = textInput.value;
        
        if (!text) {
            resultsDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
            return;
        }
        
        // Perform analysis
        const basicStats = analyzeBasicStats(text);
        const pronouns = countPronouns(text);
        const prepositions = countPrepositions(text);
        const articles = countArticles(text);
        
        // Display results
        displayResults(basicStats, pronouns, prepositions, articles);
    });
    
    // Count letters, words, spaces, newlines, and special symbols
    function analyzeBasicStats(text) {
        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        const words = text.split(/\s+/).filter(word => word.length > 0).length;
        const spaces = (text.match(/\s/g) || []).length;
        const newlines = (text.match(/\n/g) || []).length;
        const specialSymbols = (text.match(/[^\w\s]/g) || []).length;
        
        return { letters, words, spaces, newlines, specialSymbols };
    }
    
    // Count pronouns
    function countPronouns(text) {
        const pronounList = [
            'i', 'me', 'my', 'mine', 'myself',
            'you', 'your', 'yours', 'yourself',
            'he', 'him', 'his', 'himself',
            'she', 'her', 'hers', 'herself',
            'it', 'its', 'itself',
            'we', 'us', 'our', 'ours', 'ourselves',
            'they', 'them', 'their', 'theirs', 'themselves',
            'who', 'whom', 'whose', 'which', 'that'
        ];
        
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const pronounCounts = {};
        
        words.forEach(word => {
            if (pronounList.includes(word)) {
                pronounCounts[word] = (pronounCounts[word] || 0) + 1;
            }
        });
        
        return pronounCounts;
    }
    
    // Count prepositions
    function countPrepositions(text) {
        const prepositionList = [
            'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
            'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
            'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
            'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of',
            'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding',
            'round', 'since', 'through', 'throughout', 'to', 'toward', 'under',
            'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'
        ];
        
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const prepositionCounts = {};
        
        words.forEach(word => {
            if (prepositionList.includes(word)) {
                prepositionCounts[word] = (prepositionCounts[word] || 0) + 1;
            }
        });
        
        return prepositionCounts;
    }
    
    // Count indefinite articles
    function countArticles(text) {
        const articleList = ['a', 'an', 'the'];
        
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const articleCounts = {};
        
        words.forEach(word => {
            if (articleList.includes(word)) {
                articleCounts[word] = (articleCounts[word] || 0) + 1;
            }
        });
        
        return articleCounts;
    }
    
    // Display results in a formatted way
    function displayResults(basicStats, pronouns, prepositions, articles) {
        let resultsHTML = `
            <div class="analysis-section">
                <h3>Basic Statistics</h3>
                <ul>
                    <li>Letters: ${basicStats.letters}</li>
                    <li>Words: ${basicStats.words}</li>
                    <li>Spaces: ${basicStats.spaces}</li>
                    <li>Newlines: ${basicStats.newlines}</li>
                    <li>Special Symbols: ${basicStats.specialSymbols}</li>
                </ul>
            </div>
        `;
        
        // Format pronouns
        resultsHTML += `
            <div class="analysis-section">
                <h3>Pronouns</h3>
                <table>
                    <tr>
                        <th>Pronoun</th>
                        <th>Count</th>
                    </tr>
                    ${formatCountsAsTableRows(pronouns)}
                </table>
            </div>
        `;
        
        // Format prepositions
        resultsHTML += `
            <div class="analysis-section">
                <h3>Prepositions</h3>
                <table>
                    <tr>
                        <th>Preposition</th>
                        <th>Count</th>
                    </tr>
                    ${formatCountsAsTableRows(prepositions)}
                </table>
            </div>
        `;
        
        // Format articles
        resultsHTML += `
            <div class="analysis-section">
                <h3>Articles</h3>
                <table>
                    <tr>
                        <th>Article</th>
                        <th>Count</th>
                    </tr>
                    ${formatCountsAsTableRows(articles)}
                </table>
            </div>
        `;
        
        resultsDiv.innerHTML = resultsHTML;
    }
    
    // Helper function to format counts as table rows
    function formatCountsAsTableRows(countsObj) {
        let rows = '';
        const sortedEntries = Object.entries(countsObj).sort((a, b) => b[1] - a[1]);
        
        if (sortedEntries.length === 0) {
            return '<tr><td colspan="2">None found</td></tr>';
        }
        
        sortedEntries.forEach(([item, count]) => {
            rows += `
                <tr>
                    <td>${item}</td>
                    <td>${count}</td>
                </tr>
            `;
        });
        
        return rows;
    }
});
