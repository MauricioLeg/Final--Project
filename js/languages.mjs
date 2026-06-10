let currentTranslations = {};

export async function loadTranslations(locale) {
    try {
        const response = await fetch(`locales/${locale}.json`);
        if (!response) throw new Error('Locale layout file not found');
        currentTranslations = await response.json();
    } catch (error) {
        console.error(`Could not load translations for ${locale}, falling back to English:`, error);
        const response = await fetch('/locales/en.json');
        currentTranslations = await response.json();
    }
    return currentTranslations;
}

export function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    })
}

export function getTranslation(key) {
    return currentTranslations[key] || "";
}

export function getAllTranslations() {
    return currentTranslations;
}