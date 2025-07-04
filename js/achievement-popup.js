// PartyBoard - Achievement Popup Component
console.log('Loading achievement-popup.js...');

class AchievementPopup {
    static show(achievement) {
        // Remove any existing popups
        document.querySelectorAll('.achievement-popup').forEach(popup => {
            popup.remove();
        });
        
        // Create popup element
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon-wrapper">
                    <div class="achievement-icon">🎉</div>
                    <div class="achievement-sparkles">
                        <span class="sparkle">✨</span>
                        <span class="sparkle">✨</span>
                        <span class="sparkle">✨</span>
                    </div>
                </div>
                <div class="achievement-text">
                    <h3>ACHIEVEMENT UNLOCKED!</h3>
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(popup);
        
        // Trigger animation after a tiny delay
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            popup.classList.add('hide');
            setTimeout(() => {
                popup.remove();
            }, 500);
        }, 4000);
        
        // Allow click to dismiss
        popup.addEventListener('click', () => {
            popup.classList.add('hide');
            setTimeout(() => {
                popup.remove();
            }, 500);
        });
    }
    
    // Stack multiple achievements
    static showMultiple(achievements) {
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                this.show(achievement);
            }, index * 1000); // 1 second delay between each
        });
    }
}

// Export for use in other modules
window.AchievementPopup = AchievementPopup;