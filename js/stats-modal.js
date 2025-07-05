// PartyBoard - Stats Modal Module
console.log('Loading stats-modal.js...');

class StatsModal {
    constructor() {
        this.modal = null;
        this.isInitialized = false;
        this.init();
    }
    
    init() {
        // Bezpieczna inicjalizacja
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Znajdź elementy
        this.modal = document.getElementById('stats-modal');
        this.statsButton = document.getElementById('stats-button');
        this.closeButton = this.modal?.querySelector('.close-button');
        this.resetButton = document.getElementById('reset-stats-button');
        
        // Sprawdź czy elementy istnieją
        if (!this.modal || !this.statsButton) {
            console.warn('Stats modal elements not found');
            return;
        }
        
        // Dodaj event listeners
        this.attachEventListeners();
        this.isInitialized = true;
        console.log('Stats modal initialized');
    }
    
    attachEventListeners() {
        // Otwieranie
        this.statsButton.addEventListener('click', () => this.open());
        
        // Zamykanie
        this.closeButton?.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'flex') {
                this.close();
            }
        });
        
        // Reset
        this.resetButton?.addEventListener('click', () => this.handleReset());
    }
    
    open() {
        if (!this.isInitialized) return;
        
        console.log('Opening stats modal...');
        
        // Renderuj statystyki
        this.renderStats();
        
        // Pokaż modal z animacją
        this.modal.style.display = 'flex';
        setTimeout(() => {
            this.modal.classList.add('active');
        }, 10);
        
        // Focus management dla accessibility
        this.closeButton?.focus();
        
        // Track event
        if (window.Analytics) {
            window.Analytics.track('stats_modal_opened');
        }
    }
    
    close() {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300);
        
        // Przywróć focus na przycisk
        this.statsButton?.focus();
    }
    
    renderStats() {
        const stats = window.StatsManager?.getStats();
        if (!stats) {
            console.error('StatsManager not available');
            return;
        }
        
        const statsBody = this.modal.querySelector('.stats-body');
        if (!statsBody) return;
        
        // Generuj HTML
        statsBody.innerHTML = this.generateStatsHTML(stats);
        
        // Re-initialize ikony
        if (window.lucide) {
            setTimeout(() => window.lucide.createIcons(), 10);
        }
    }
    
    generateStatsHTML(stats) {
        // Oblicz dodatkowe metryki
        const favoriteCategory = this.getFavoriteCategory(stats);
        const commonPersonality = this.getMostCommonPersonality(stats);
        const achievementProgress = this.getAchievementProgress(stats);
        const daysPlaying = this.getDaysPlaying(stats);
        
        return `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">🎮</div>
                    <div class="stat-label">Games Played</div>
                    <div class="stat-value">${stats.gamesPlayed}</div>
                    ${daysPlaying > 0 ? `<div class="stat-sublabel">Over ${daysPlaying} day${daysPlaying !== 1 ? 's' : ''}</div>` : ''}
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-label">Current Streak</div>
                    <div class="stat-value">${stats.currentStreak} day${stats.currentStreak !== 1 ? 's' : ''}</div>
                    <div class="stat-sublabel">Best: ${stats.longestStreak} days</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">❓</div>
                    <div class="stat-label">Questions Answered</div>
                    <div class="stat-value">${stats.totalQuestions.toLocaleString()}</div>
                    <div class="stat-sublabel">${this.getAverageQuestions(stats)} per game</div>
                </div>
            </div>
            
            ${favoriteCategory || commonPersonality ? `
                <div class="stats-section">
                    <h3 class="stats-section-title">📈 Your Favorites</h3>
                    ${favoriteCategory ? `
                        <div class="favorite-item">
                            <span class="favorite-label">Most Played Category:</span>
                            <span class="favorite-value">${this.formatCategoryName(favoriteCategory.category)} (${favoriteCategory.count} game${favoriteCategory.count !== 1 ? 's' : ''})</span>
                        </div>
                    ` : ''}
                    ${commonPersonality ? `
                        <div class="favorite-item">
                            <span class="favorite-label">Most Common Personality:</span>
                            <span class="favorite-value">${commonPersonality.type} (${commonPersonality.count}x)</span>
                        </div>
                    ` : ''}
                </div>
            ` : ''}
            
            <div class="stats-section">
                <h3 class="stats-section-title">🏆 Achievements (${achievementProgress.unlocked}/${achievementProgress.total})</h3>
                <div class="achievements-grid">
                    ${this.renderAchievements(stats.achievements)}
                </div>
                ${achievementProgress.unlocked < achievementProgress.total ? 
                    `<p class="achievement-hint">Keep playing to unlock more achievements!</p>` : 
                    `<p class="achievement-hint">🎉 All achievements unlocked! You're a PartyBoard master!</p>`
                }
            </div>
            
            ${stats.gamesPlayed === 0 ? `
                <div class="empty-stats-message">
                    <p>No games played yet! Start your first game to begin tracking your stats.</p>
                </div>
            ` : ''}
        `;
    }
    
    getFavoriteCategory(stats) {
        if (!stats.categoriesPlayed) return null;
        
        let maxCount = 0;
        let favorite = null;
        
        // Mapowanie nazw kategorii z kodu na czytelne
        const categoryMap = {
            'survival': 'survival_mode',
            'social': 'social_life',
            'food': 'food_fight',
            'travel': 'jet_set',
            'tech': 'future_talk',
            'random': 'grab_bag'
        };
        
        Object.entries(stats.categoriesPlayed).forEach(([category, count]) => {
            if (count > maxCount) {
                maxCount = count;
                // Sprawdź czy to skrócona nazwa
                const fullCategory = categoryMap[category] || category;
                favorite = { category: fullCategory, count };
            }
        });
        
        return maxCount > 0 ? favorite : null;
    }
    
    getMostCommonPersonality(stats) {
        if (!stats.personalityHistory || stats.personalityHistory.length === 0) return null;
        
        const counts = {};
        stats.personalityHistory.forEach(game => {
            if (game.type) {
                counts[game.type] = (counts[game.type] || 0) + 1;
            }
        });
        
        let maxCount = 0;
        let common = null;
        
        Object.entries(counts).forEach(([type, count]) => {
            if (count > maxCount) {
                maxCount = count;
                common = { type, count };
            }
        });
        
        return common;
    }
    
    getAchievementProgress(stats) {
        // Definicje wszystkich możliwych achievements
        const allAchievements = [
            'first_game', 'week_streak', 'ten_games', 'explorer',
            'question_master', 'personality_collector', 'streak_master', 'dedicated_player'
        ];
        
        const unlocked = stats.achievements ? stats.achievements.length : 0;
        return {
            unlocked,
            total: allAchievements.length
        };
    }
    
    getAverageQuestions(stats) {
        if (stats.gamesPlayed === 0) return 0;
        return Math.round(stats.totalQuestions / stats.gamesPlayed);
    }
    
    getDaysPlaying(stats) {
        if (!stats.firstPlayed) return 0;
        const days = Math.floor((Date.now() - stats.firstPlayed) / (1000 * 60 * 60 * 24));
        return days;
    }
    
    formatCategoryName(category) {
        const names = {
            survival_mode: '🏕️ Survival Mode',
            social_life: '🎉 Social Life',
            food_fight: '🍕 Food Fight',
            jet_set: '✈️ Jet Set',
            future_talk: '🚀 Future Talk',
            grab_bag: '✨ Grab Bag'
        };
        return names[category] || category;
    }
    
    renderAchievements(unlockedAchievements = []) {
        const achievements = {
            first_game: { 
                icon: '🎮', 
                name: 'Welcome to PartyBoard!', 
                description: 'Play your first game' 
            },
            week_streak: { 
                icon: '🔥', 
                name: 'Dedicated Player', 
                description: 'Achieve a 7 day streak' 
            },
            ten_games: { 
                icon: '⭐', 
                name: 'Party Regular', 
                description: 'Play 10 games' 
            },
            explorer: { 
                icon: '🗺️', 
                name: 'Category Explorer', 
                description: 'Try all 6 categories' 
            },
            question_master: { 
                icon: '🧠', 
                name: 'Question Master', 
                description: 'Answer 500 questions' 
            },
            personality_collector: { 
                icon: '🎭', 
                name: 'Personality Collector', 
                description: 'Unlock 10 different personalities' 
            },
            streak_master: { 
                icon: '💫', 
                name: 'Streak Master', 
                description: 'Achieve a 30 day streak' 
            },
            dedicated_player: { 
                icon: '🏆', 
                name: 'PartyBoard Champion', 
                description: 'Play 100 games' 
            }
        };
        
        let html = '';
        Object.entries(achievements).forEach(([id, achievement]) => {
            const isUnlocked = unlockedAchievements.some(a => a.id === id);
            html += `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}" 
                     title="${achievement.name}: ${achievement.description}"
                     data-achievement-id="${id}">
                    <span class="achievement-icon">${achievement.icon}</span>
                    ${!isUnlocked ? '<div class="achievement-lock">🔒</div>' : ''}
                </div>
            `;
        });
        
        return html;
    }
    
    handleReset() {
        // Podwójne potwierdzenie dla bezpieczeństwa
        const firstConfirm = confirm('⚠️ WARNING: Are you sure you want to reset ALL your stats?\n\nThis action cannot be undone!');
        
        if (firstConfirm) {
            const secondConfirm = confirm('🚨 FINAL WARNING: This will permanently delete:\n\n• All game history\n• All achievements\n• All streaks\n• All statistics\n\nAre you REALLY sure?');
            
            if (secondConfirm) {
                try {
                    // Resetuj wszystko
                    localStorage.removeItem('pb_player_stats');
                    localStorage.removeItem('wouldYouRatherState');
                    
                    // Reinicjalizuj StatsManager
                    if (window.StatsManager) {
                        window.StatsManager = new window.StatsManager.constructor();
                    }
                    
                    // Zamknij modal
                    this.close();
                    
                    // Feedback
                    setTimeout(() => {
                        alert('✅ All stats have been reset. You\'re starting fresh!');
                    }, 300);
                    
                    // Track event
                    if (window.Analytics) {
                        window.Analytics.track('stats_reset_complete');
                    }
                } catch (error) {
                    console.error('Error resetting stats:', error);
                    alert('❌ Error resetting stats. Please try again.');
                }
            }
        }
    }
}

// Automatyczna inicjalizacja
console.log('Initializing StatsModal...');
window.addEventListener('load', () => {
    window.statsModal = new StatsModal();
});