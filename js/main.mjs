import { fetchDailyHeadline, fetchEducationalNews } from "./NewsData.mjs";
import { generatePuzzle } from "./PuzzleGenerator.mjs";
import { createPuzzleTemplate, createNewsFeedTemplate } from "./templates.mjs";
import { verifyAnswer } from "./CompareText.mjs";
import { getUserStats, saveGameResult, hasPlayedToday } from "./Storage.mjs";

let currentTranslations = {};

async function loadTranslation(locale) {
    try {
        const response = await fetch(`/locales/${locale}.json`);
        if (!response) throw new Error('Locale layout file not found');
        currentTranslations = await response.json();
    } catch {
        console.error(`Could not load translations for ${locale}, falling back to English:`, error);
        const response = await fetch('/locales/en.json');
        currentTranslations = await response.json();
    }
}

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const year = document.querySelector("#currentyear")
    const today = new Date();
    year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;    
    document.getElementById("lastModified").innerHTML = `Last modification: ${document.lastModified}`;
    
    const gamesContainer = document.querySelector('.games');
    const newsContainer = document.querySelector('.news');
    
    try {
        const rawData = await fetchDailyHeadline();
        const activePuzzle = generatePuzzle(rawData);

        gamesContainer.innerHTML = createPuzzleTemplate(activePuzzle)
        const articles = await fetchEducationalNews();
        newsContainer.innerHTML = createNewsFeedTemplate(articles);
        const feedbackDiv = document.getElementById('feedback');

        if (hasPlayedToday()) {
            disableGameButtons();
            const stats = getUserStats();
            feedbackDiv.classList.remove('hidden');
            feedbackDiv.classList.add('feedback-success');
            feedbackDiv.innerHTML = `
            <p><strong>You already completed today's challenge!</strong> Comeback tomorrow for a new headline.</p>
            <hr style="border-color: rgba(0, 0, 0, 0.1)">
            <p>📊 Your stats - Played: ${stats.gamesPlayed} | Won: ${stats.gamesWon} | Current streak: ${stats.currentStreak}🔥</p>
            `;

            return;
        }

        gamesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('choice-btn')) {
                const selected = e.target.getAttribute('data-answer');
                const isCorrect = verifyAnswer(selected, activePuzzle.correctAnswer);

                const updatedStats = saveGameResult(isCorrect);
                disableGameButtons();
                
                feedbackDiv.classList.remove('hidden');
                feedbackDiv.className = '';

                if (isCorrect) {
                    feedbackDiv.classList.add('feedback-success');
                    feedbackDiv.innerHTML = `<p style="color: green;">🎉 Correct! ${activePuzzle.explanation}</p>`;
                } else {
                    feedbackDiv.classList.add('feedback-error');
                    feedbackDiv.innerHTML = `<p style="color: red;">❌ Incorrect. Try again to spot the trick!</p>`;
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