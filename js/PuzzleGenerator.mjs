export function generatePuzzle(liveNewsData) {
    if (!liveNewsData) {
        console.error("generatePuzzle received undefined data!");
        return {
            headline: "No data available",
            correctAnswer: "Error",
            choices: ["Error", "Error", "Error", "Error"],
            explanation: "The puzzle data failed to load correctly."
        };
    }
    return {
        headline: liveNewsData.headline,
        correctAnswer: liveNewsData.category || liveNewsData.correctAnswer,
        choices: ["Logical Fallacy", "Bias", "Data Manipulation", "Sensationalism"],
        explanation: liveNewsData.explanation
    }
}