const GNewsAPI = '0240067b62161fbab6eb08215c721c8a'

export async function fetchDailyHeadline(locale = 'en') {
    try {
        const response = await fetch(`./data/puzzles_${locale}.json`);

        if (!response.ok) {
            throw new Error(`Failed to load data for locale: ${locale}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching local puzzle data:', error);

        return {
            id:0,
            headline: "Error loading puzzle.",
            source: "System",
            category: "Error",
            explanation: "Could not retrieve the puzzle for the selected language.",
            correctAnswer: 'Error'
        };
    }
}

export async function fetchLiveNews(locale = 'en') {
    const cache_key = `news_cache_${locale}`;
    const cache_time_key = `news_timestamp_${locale}`;
    const one_hour = 60 * 60 * 1000;

    const cachedData = localStorage.getItem(cache_key);
    const lastFetch = localStorage.getItem(cache_time_key);

    if (cachedData && lastFetch && (Date.now() - parseInt(lastFetch) < one_hour)) {
        console.log('Serving news from cache for locale:', locale);
        return JSON.parse(cachedData);
    }

    console.log('Fetching fresh news from GNews API...')
    const langMap = {
        'en': 'en',
        'es-419': 'es',
        'es-ES': 'es',
        'pt': 'pt',
        'ja': 'ja',
        'ko': 'ko'
    };

    const lang = langMap[locale] || 'en';
    const url = `https://gnews.io/api/v4/search?q=media+literacy&lang=${lang}&max=3&apikey=${GNewsAPI}`;
    const proxyURL = 'https://corsproxy.io/?';

    try {
        const response = await fetch(proxyURL + encodeURIComponent(url));

        if (!response.ok) {
            throw new Error('GNews API request failed');
        }

        const data = await response.json();
        if (!data.articles || data.articles.length === 0) {
            console.warn(`No news found for locale: ${locale}. Using fallback.`);
            return [{ title: 'News not available in this language', snippet: '...', link: '#'}];
        }

        const articles = data.articles.map(article => ({
            title: article.title,
            snippet: article.description,
            link: article.url
        }));


        localStorage.setItem(cache_key, JSON.stringify(articles));
        localStorage.setItem(cache_time_key, Date.now().toString());
        
        return articles;
    } catch (error) {
        console.error('GNews fetch failed, using fallback:', error);

        return [
            { title: 'Media Literacy Matters', snippet: 'Stay critical and informed.', link: '#' }
        ];
    }
}
