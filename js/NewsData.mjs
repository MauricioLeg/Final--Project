const perplexity_API_Key = 'Api key here';

export async function fetchDailyHeadline() {
    // const url = 'https://api.perplexity.ai/v1/chat/completions';

    try {
        return {
            headline: "Breaking: Local study shows 100% of people who drink water eventually suffer fatal health outcomes.",
            source: "Correlation Daily",
            category: "Logical Fallacy",
            explanation: "This plays on a flawed correlation vs causation argument. While true that all humans die, water consumption is not the structural cause of mortality."
        }

    // const prompt = `You are the backend engine for 'Debunked', a media literacy game.
    // Your job is to search the web for a recent, notable, real news headline from the past week that exhibits a clear cognitive bias, logical fallacy, data manipulation, or sensationalism.
    
    // You must respond with a single, valid JSON object. Do not include markdown code blocks (\'\'\'json).
    // The JSON structure must match this exactly:
    // {
    //     "headline": "The exact news headline or tweet claim",
    //     "source": "The news outlet or platform name",
    //     "category": "Must be exactly one of: Logical Fallacy, Bias, Data Manipulation, Sensationalism",
    //     "explanation": "A short, clear 2-3 sentence breakdown explaining why this headline fits that category and what the actual cross-referenced fact is."
    // }`;
    
    // const userPrompt = "Generate today's media literacy puzzle based on real trending news.";
    
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             "Authorization": `Bearer ${perplexity_API_Key}`,
    //             'Content-Type': "application/json"
    //         },
    //         body: JSON.stringify({
    //             model: 'sonar',
    //             messages: [
    //                 { role: "system", content: prompt },
    //                 { role: "user", content: userPrompt }
    //             ],
    //             response_format: { type: "json_object" },
    //             temperature: 0.2
    //         })
    //     });

    //     if (!response.ok) {
    //         throw new Error(`API Request Failed with status: ${response.status}`);
    //     }
        
    //     const data = await response.json();

    //     const puzzleString = data.choices[0].message.content;
    //     const parsedPuzzle = JSON.parse(puzzleString);

    //     return parsedPuzzle;
    } catch (error) {
        console.error('Error fetching live data from Perplexity: ', error);

        return {
            headline: "Breaking: Local study shows 100% of people who drink water eventually suffer fatal health outcomes.",
            source: "Correlation Daily",
            category: "Logical Fallacy",
            explanation: "This plays on a flawed correlation vs causation argument. While true that all humans die, water consumption is not the structural cause of mortality."
        }
    }
}

export async function fetchEducationalNews() {
    return [
        {
            title: "How to Spot a Confirmation Bias Trap",
            snippet: "We naturally want to believe stories that prove us right. Learn the 3 questions to ask yourself whenever a headline makes you instantly angry or happy.",
            link: "#"
        },
        {
            title: "Data Manipulation: The Graph Danger Zone",
            snippet: "Y-axis scaling tricks can make tiny variations look like world-ending crises. See real-world examples of misleading corporate charts analyzed.",
            link:"#"
        }
    ];
}