export function createPuzzleTemplate(puzzle) {
    const choicesList = puzzle.choices || ['Logical Fallacy', 'Bias', 'Data Manipulation', 'Sensationalism']
    
    return `
    <div class="puzzle-card">
        <h2>Daily Challenge</h2>
        <p class="headline">"${puzzle.headline}"</p>
        <div class="choices">
            ${choicesList.map(choice => `<button class="choice-btn" data-answer="${choice}">${choice}</button>`).join('')}
        </div>
        <div id="feedback" class="hidden"></div>
    </div>`;
}

export function createNewsFeedTemplate(articles) {
    return `
        <div class="news-section">
            <h2>Grow Your Wisdom: Media Literacy Feed</h2>
            <div class="news-grid"></div>
        </div>
    `;
}