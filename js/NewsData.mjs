export async function fetchDailyHeadline(locale = 'en') {
    try {
        const response = await fetch(`./data/puzzles_${locale}.json`);

        if (!response.ok) {
            throw new Error(`Failed to load data for locale: ${locale}`);
        }

        const data = await response.json();
        return data.dailyHeadLine;
    } catch (error) {
        console.error('Error fetching local puzzle data:', error);

        return {
            headline: "Error loading puzzle.",
            source: "System",
            category: "Error",
            explanation: "Could not retrieve the puzzle for the selected language."
        };
    }
}

export async function fetchEducationalNews(locale = 'en') {
    try {
        const response = await fetch(`./data/puzzles_${locale}/.json`);

        if (!response.ok) {
            throw new Error(`Failed to load data for locale: ${locale}`);
        }

        const data = await response.json();
        return data.educationalNews;
    } catch {
        console.error('Error fetching local news data:', error);   
        return [];
    }
}
