const statsKey = 'debunked_user_stats';
const lastPlayed = 'debunked_last_played_date';

const defaultStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0
};

export function getUserStats() {
    const stats = localStorage.getItem(statsKey);
    return stats ? JSON.parse(stats) : { ...defaultStats };
}

export function saveGameResult(isWin) {
    const stats = getUserStats();
    stats.gamesPlayed += 1;

    if (isWin) {
        stats.gamesWon += 1;
        stats.currentStreak += 1;
        if (stats.currentStreak > stats.maxStreak) {
            stats.maxStreak = stats.currentStreak;
        }
    } else {
        stats.currentStreak = 0;
    }

    localStorage.setItem(statsKey, JSON.stringify(stats));
    
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(lastPlayed, todayStr);

    return stats
}

export function hasPlayedToday() {
    const lastPlayedDate = localStorage.getItem(lastPlayed);
    const todayStr = new Date().toISOString().split('T')[0]
    return lastPlayedDate === todayStr;
}