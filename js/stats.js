// PartyBoard - Player Statistics Manager
console.log('Loading stats.js...');

class StatsManager {
    constructor() {
        this.STORAGE_KEY = 'pb_player_stats';
        this.stats = this.loadStats();
        this.checkStreakStatus();
    }
    
    loadStats() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate structure
                if (this.isValidStats(parsed)) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Stats corrupted, creating new:', e);
        }
        
        return this.createDefaultStats();
    }
    
    createDefaultStats() {
        // Reuse userId from Analytics if exists
        const userId = localStorage.getItem('pb_anonymous_id') || 
                      this.generateUserId();
        
        if (!localStorage.getItem('pb_anonymous_id')) {
            localStorage.setItem('pb_anonymous_id', userId);
        }
        
        return {
            userId: userId,
            gamesPlayed: 0,
            totalQuestions: 0,
            categoriesPlayed: {
                survival: 0,
                social: 0,
                food: 0,
                travel: 0,
                tech: 0,
                random: 0
            },
            personalityHistory: [], // Array of {date, category, type}
            achievements: [],
            currentStreak: 0,
            longestStreak: 0,
            lastPlayedDate: null, // YYYY-MM-DD format
            firstPlayed: Date.now(),
            version: 1 // For future migrations
        };
    }
    
    generateUserId() {
        // Match Analytics pattern
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    isValidStats(stats) {
        return stats && 
               typeof stats.gamesPlayed === 'number' &&
               stats.categoriesPlayed &&
               stats.version;
    }
    
    recordGameCompletion(gameData) {
        // Update basic stats
        this.stats.gamesPlayed++;
        this.stats.totalQuestions += gameData.questionsAnswered || 0;
        this.stats.categoriesPlayed[gameData.category]++;
        
        // Track personality history
        this.stats.personalityHistory.push({
            date: new Date().toISOString(),
            category: gameData.category,
            type: gameData.personalityType,
            questionsAnswered: gameData.questionsAnswered
        });
        
        // Keep only last 50 games in history
        if (this.stats.personalityHistory.length > 50) {
            this.stats.personalityHistory = this.stats.personalityHistory.slice(-50);
        }
        
        // Update streak
        this.updateDailyStreak();
        
        // Save
        this.saveStats();
        
        // Track with Analytics
        if (window.Analytics && window.Analytics.trackGameEvent) {
            window.Analytics.trackGameEvent('completed', gameData);
        }
        
        // Check and return new achievements
        return this.checkForNewAchievements();
    }
    
    updateDailyStreak() {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const lastPlayed = this.stats.lastPlayedDate;
        
        if (!lastPlayed) {
            // First game ever
            this.stats.currentStreak = 1;
        } else if (lastPlayed === today) {
            // Already played today, no change
            return;
        } else {
            // Check if yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (lastPlayed === yesterdayStr) {
                // Consecutive day!
                this.stats.currentStreak++;
            } else {
                // Streak broken
                this.stats.currentStreak = 1;
            }
        }
        
        this.stats.lastPlayedDate = today;
        this.stats.longestStreak = Math.max(
            this.stats.longestStreak, 
            this.stats.currentStreak
        );
    }
    
    checkStreakStatus() {
        // Called on init to see if streak is still valid
        if (!this.stats.lastPlayedDate) return;
        
        const lastDate = new Date(this.stats.lastPlayedDate);
        const today = new Date();
        const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff > 1) {
            // Streak broken
            this.stats.currentStreak = 0;
            this.saveStats();
        }
    }
    
    checkForNewAchievements() {
        // This will be expanded later
        const newAchievements = [];
        
        // Check if this is the first game EVER (gamesPlayed jest już zinkrementowane, więc pierwsza gra = 1)
        if (this.stats.gamesPlayed === 1 && !this.hasAchievement('first_game')) {
            newAchievements.push({
                id: 'first_game',
                name: 'Welcome to PartyBoard!',
                description: 'Play your first game'
            });
        }
        
        // Check for week streak
        if (this.stats.currentStreak === 7 && !this.hasAchievement('week_streak')) {
            newAchievements.push({
                id: 'week_streak',
                name: 'Party Week!',
                description: '7 day streak achieved'
            });
        }
        
        // Check for 10 games milestone
        if (this.stats.gamesPlayed === 10 && !this.hasAchievement('ten_games')) {
            newAchievements.push({
                id: 'ten_games',
                name: 'Party Regular!',
                description: 'Play 10 games'
            });
        }
        
        // Check for trying all categories
        const categoriesPlayed = Object.values(this.stats.categoriesPlayed).filter(count => count > 0).length;
        if (categoriesPlayed === 6 && !this.hasAchievement('explorer')) {
            newAchievements.push({
                id: 'explorer',
                name: 'Category Explorer!',
                description: 'Try all 6 categories'
            });
        }

        // Question Master - 500 questions
        if (this.stats.totalQuestions >= 500 && !this.hasAchievement('question_master')) {
            newAchievements.push({
                id: 'question_master',
                name: 'Question Master',
                description: 'Answer 500 questions'
            });
        }

        // Personality Collector - 10 different personalities
        const uniquePersonalities = new Set(this.stats.personalityHistory.map(p => p.type)).size;
        if (uniquePersonalities >= 10 && !this.hasAchievement('personality_collector')) {
            newAchievements.push({
                id: 'personality_collector',
                name: 'Personality Collector',
                description: 'Unlock 10 different personalities'
            });
        }

        // Streak Master - 30 days
        if (this.stats.longestStreak >= 30 && !this.hasAchievement('streak_master')) {
            newAchievements.push({
                id: 'streak_master',
                name: 'Streak Master',
                description: 'Achieve a 30 day streak'
            });
        }

        // Champion - 100 games
        if (this.stats.gamesPlayed >= 100 && !this.hasAchievement('dedicated_player')) {
            newAchievements.push({
                id: 'dedicated_player',
                name: 'PartyBoard Champion',
                description: 'Play 100 games'
            });
        }
        
        // Save new achievements
        newAchievements.forEach(ach => {
            if (!this.stats.achievements.find(a => a.id === ach.id)) {
                this.stats.achievements.push({
                    id: ach.id,
                    unlockedAt: Date.now()
                });
            }
        });
        
        if (newAchievements.length > 0) {
            this.saveStats();
        }
        
        return newAchievements;
    }
    
    hasAchievement(achievementId) {
        return this.stats.achievements.some(a => a.id === achievementId);
    }
    
    saveStats() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.stats));
        } catch (e) {
            console.error('Failed to save stats:', e);
        }
    }
    
    getStats() {
        return { ...this.stats };
    }
    
    getFavoriteCategory() {
        const counts = this.stats.categoriesPlayed;
        let max = 0;
        let favorite = null;
        
        Object.entries(counts).forEach(([category, count]) => {
            if (count > max) {
                max = count;
                favorite = category;
            }
        });
        
        return favorite;
    }
    
    getMostCommonPersonality() {
        const types = {};
        this.stats.personalityHistory.forEach(game => {
            const key = game.type;
            types[key] = (types[key] || 0) + 1;
        });
        
        let max = 0;
        let common = null;
        
        Object.entries(types).forEach(([type, count]) => {
            if (count > max) {
                max = count;
                common = type;
            }
        });
        
        return common;
    }
}

// Create global instance
window.StatsManager = new StatsManager();