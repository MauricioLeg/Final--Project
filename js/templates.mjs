export function createPuzzleTemplate(puzzle, translations = {}) {
    const choicesList = puzzle.choices || ['Logical Fallacy', 'Bias', 'Data Manipulation', 'Sensationalism']
    const titleText = translations.game_title || 'Daily Challenge';

    return `
    <div class="puzzle-card">
        <h2>${titleText}</h2>
        <p class="headline">"${puzzle.headline}"</p>
        <div class="choices">
            ${choicesList.map(choice => `<button class="choice-btn" data-answer="${choice}">${choice}</button>`).join('')}
        </div>
        <div id="feedback" class="hidden"></div>
    </div>`;
}

export function createNewsFeedTemplate(articles, translations = {}) {
    const sectionTitle = translations.news_title || 'Grow Your Wisdom: Media Literacy Feed';
    const readMoreText = translations.news_read_mode || 'Read Deep Dive →';

    return `
        <div class="news-section">
            <h2 class="section-title">${sectionTitle}</h2>
            <div class="news-grid">
                ${articles.map(article => `
                    <div>
                        <h3>${article.title}</h3>
                        <p class="news-snippet">${article.snippet}</p>
                        <a href="${article.link}" target="_blank" class="read-more-btn">${readMoreText}</a>
                    </div>
                    `).join('')}
            </div>
        </div>
    `;
}