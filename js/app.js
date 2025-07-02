// PartyBoard - Main Application JavaScript

// App Configuration
const APP_CONFIG = {
    name: 'PartyBoard',
    version: '1.0.0',
    disclaimerAccepted: 'partyboard_disclaimer_accepted',
    analyticsEnabled: true
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    try {
        console.log('Initializing app...');
        
        // Check if disclaimer has been accepted
        const disclaimerAccepted = localStorage.getItem(APP_CONFIG.disclaimerAccepted);
        
        if (!disclaimerAccepted) {
            showDisclaimer();
        } else {
            showApp();
            initializeFeatures();
        }
        
        // Register service worker for PWA
        registerServiceWorker();
    } catch (error) {
        console.error('Error during initialization:', error);
        // Still try to show the app even if there's an error
        showDisclaimer();
    }
}

// Show disclaimer modal
function showDisclaimer() {
    console.log('Showing disclaimer modal');
    const modal = document.getElementById('disclaimer-modal');
    const checkbox = document.getElementById('disclaimer-accept');
    const continueBtn = document.getElementById('disclaimer-continue');
    
    console.log('Elements found:', {modal, checkbox, continueBtn});
    
    // Enable continue button when checkbox is checked
    checkbox.addEventListener('change', (e) => {
        console.log('Checkbox changed:', e.target.checked);
        continueBtn.disabled = !e.target.checked;
    });
    
    // Handle continue button click
    continueBtn.addEventListener('click', () => {
        console.log('Continue button clicked');
        if (checkbox.checked) {
            localStorage.setItem(APP_CONFIG.disclaimerAccepted, 'true');
            modal.style.display = 'none';
            showApp();
            initializeFeatures();
            
            // Track acceptance
            if (window.Analytics) {
                window.Analytics.track('disclaimer_accepted');
            }
        }
    });
}

// Show main app
function showApp() {
    const app = document.getElementById('app');
    app.classList.remove('hidden');
}

// Initialize app features
function initializeFeatures() {
    console.log('Initializing features...');
    
    // Animate player count
    animatePlayerCount();
    
    // Add hover effects to game cards
    addGameCardEffects();
    
    // Initialize analytics only if it exists
    if (window.Analytics && typeof window.Analytics.init === 'function') {
        console.log('Initializing analytics...');
        window.Analytics.init();
    } else {
        console.warn('Analytics not available');
    }
    
    // Check for updates
    checkForUpdates();
}

// Animate live player count
function animatePlayerCount() {
    const playerCount = document.getElementById('player-count');
    if (!playerCount) return;
    
    // Simulate live player count updates
    setInterval(() => {
        const currentCount = parseInt(playerCount.textContent.replace(',', ''));
        const change = Math.floor(Math.random() * 10) - 3; // Random change between -3 and +6
        const newCount = Math.max(2000, currentCount + change); // Never go below 2000
        playerCount.textContent = newCount.toLocaleString();
    }, 5000); // Update every 5 seconds
}

// Add interactive effects to game cards
function addGameCardEffects() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Add mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
        
        // Track game selection
        card.addEventListener('click', () => {
            const gameName = card.dataset.game;
            if (gameName && typeof Analytics !== 'undefined') {
                Analytics.track('game_selected', { game: gameName });
            }
        });
    });
}

// Register service worker for offline functionality
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            // Commented out until we create sw.js
            // const registration = await navigator.serviceWorker.register('/sw.js');
            // console.log('Service Worker registered:', registration);
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

// Check for app updates
function checkForUpdates() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // New service worker has taken control, refresh the page
            window.location.reload();
        });
    }
}

// Utility functions
const Utils = {
    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Get URL parameters
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },
    
    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for use in other modules
window.PartyBoard = {
    config: APP_CONFIG,
    utils: Utils
};