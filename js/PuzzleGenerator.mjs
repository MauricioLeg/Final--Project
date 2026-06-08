export function generatePuzzle(liveNewsData) {
    return {
        headline: liveNewsData.headline,
        correctAnswer: liveNewsData.category || liveNewsData.correctAnswer,
        choices: ["Logical Fallacy", "Bias", "Data Manipulation", "Sensationalism"],
        explanation: liveNewsData.explanation
    }
}