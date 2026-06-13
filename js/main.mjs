import { fetchDailyHeadline, fetchLiveNews } from "./NewsData.mjs";
import { generatePuzzle } from "./PuzzleGenerator.mjs";
import { createPuzzleTemplate, createNewsFeedTemplate } from "./templates.mjs";
import { verifyAnswer } from "./CompareText.mjs";
import { getUserStats, saveGameResult, hasPlayedToday } from "./Storage.mjs";
import { loadTranslations, applyTranslations, getAllTranslations, getTranslation } from "./languages.mjs";
import { displayContactModal } from "./contact-us.mjs";
import { setupAuth } from "./login.mjs";

document.addEventListener('DOMContentLoaded', async () => {
    const year = document.querySelector("#currentyear")
    const today = new Date();
    year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;    
    document.getElementById("lastModified").innerHTML = `Last modification: ${document.lastModified}`;
    
    const gamesContainer = document.querySelector('.games');
    const newsContainer = document.querySelector('.news');
    const langSelector = document.getElementById('language-selector');

    if (!gamesContainer || !newsContainer) {
        console.log("Not on the homepage. Skipping game initialization.");
        return; 
    }

    let preferredLocale = localStorage.getItem('debunked_locale') || 'en';
    langSelector.value = preferredLocale;

    await loadTranslations(preferredLocale);
    applyTranslations()
    
    try {
        let activePuzzle;
        
        async function renderPageContent() {
            gamesContainer.innerHTML = `<p>${getTranslation('loading_text')}</p>`
            const translations = getAllTranslations();
            const liveArticles = await fetchLiveNews(preferredLocale);

            let rawData = await fetchDailyHeadline(preferredLocale);
            activePuzzle = generatePuzzle(rawData);

            gamesContainer.innerHTML = createPuzzleTemplate(activePuzzle, translations)
            newsContainer.innerHTML = createNewsFeedTemplate(liveArticles, translations);
            
            const feedbackDiv = document.getElementById('feedback');
            if (hasPlayedToday()) {
                disableGameButtons();
                renderStatsDisplay(feedbackDiv);
            }
        }

        renderPageContent();

        langSelector.addEventListener('change', async (e) => {
            preferredLocale = e.target.value;
            localStorage.setItem('debunked_locale', preferredLocale);

            await loadTranslations(preferredLocale);
            applyTranslations();

            renderPageContent();
        })

        displayContactModal();
        setupAuth();

        gamesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('choice-btn')) {
                const selected = e.target.getAttribute('data-answer');
                const isCorrect = verifyAnswer(selected, activePuzzle.correctAnswer);

                const updatedStats = saveGameResult(isCorrect);
                disableGameButtons();
                
                const feedbackDiv = document.getElementById('feedback');
                if (!feedbackDiv) return;

                feedbackDiv.classList.remove('hidden');
                feedbackDiv.className = '';

                if (isCorrect) {
                    feedbackDiv.classList.add('feedback-success');
                    feedbackDiv.innerHTML = `<p style="color: green;">${getTranslation('feedback_correct')}</p>
                                            <p>${activePuzzle.explanation}</p>`;
                } else {
                    feedbackDiv.classList.add('feedback-error');
                    feedbackDiv.innerHTML = `
                        <p style="color: red;">${getTranslation('feedback_incorrect')}</p>
                        <p>${activePuzzle.explanation}</p>
                    `;
                }
            }
        });
    } catch (error) {
        console.error('Error setting up the game: ', error);
        gamesContainer.innerHTML = `<p>Failed to load today's challenge. Please try again later.</p>`;
    }
});

function disableGameButtons() {
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
    });
}

function renderStatsDisplay(container) {
    const stats = getUserStats();
    container.classList.remove('hidden');
    container.classList.add('feedback-success');

    let statsString = getTranslation('game_stats');
    statsString = statsString.replace("{played}", stats.gamesPlayed)
                            .replace("{won}", stats.gamesWon)
                            .replace("{streak}", stats.currentStreak);

    container.innerHTML = `
        <p><strong>${getTranslation('game_already_played')}</strong></p>
        <hr style="border-color: rgba(0, 0, 0, 0.1)">
        <p>📊${statsString}🔥</p>
    `;
}