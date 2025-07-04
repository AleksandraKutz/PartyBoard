// PartyBoard - Would You Rather Game Logic
console.log('Loading game.js...');

class WouldYouRatherGame {
    constructor() {
        console.log('Initializing WouldYouRatherGame...');
        this.currentCategory = null;
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.questions = [];
        this.init();
    }
    
    init() {
        console.log('Initializing game...');
        
        // Show category screen by default
        this.showScreen('category-screen');
        
        // Set up event listeners AFTER showing screen
        setTimeout(() => {
            this.setupCategorySelection();
            this.setupQuestionHandlers();
            this.setupNavigation();
            this.setupResults();
            
            console.log('Event listeners set up');
        }, 100);
        
        // Check if we have saved game state
        this.loadGameState();
    }
    
    setupCategorySelection() {
        const categoryCards = document.querySelectorAll('.category-card');
        console.log('Setting up categories, found:', categoryCards.length);
        
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const category = e.currentTarget.dataset.category;
                console.log('Category clicked:', category);
                
                // Create ripple effect
                this.createRipple(e, card);
                
                // Start game after ripple
                setTimeout(() => {
                    console.log('Starting game with category:', category);
                    this.startGame(category);
                }, 200);
            });
        });
    }
    
    setupQuestionHandlers() {
        const choiceCards = document.querySelectorAll('.choice-card');
        choiceCards.forEach(card => {
            // Add ripple effect on click
            card.addEventListener('click', (e) => {
                // Create ripple effect at click position
                this.createRipple(e, card);
                
                // Handle answer selection
                const choice = e.currentTarget.dataset.choice;
                this.selectAnswer(choice);
            });
        });
        
        // Skip button
        const skipButton = document.getElementById('skip-button');
        if (skipButton) {
            skipButton.addEventListener('click', () => {
                this.skipQuestion();
            });
        }
    }
    
    createRipple(event, element) {
        try {
            // Remove any existing ripples
            const existingRipple = element.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            // Get click position relative to the element
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Add to element
            element.appendChild(ripple);
            
            // Remove after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        } catch (error) {
            console.error('Error creating ripple:', error);
        }
    }
    
    setupNavigation() {
        // Previous button
        const prevButton = document.getElementById('prev-button');
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.previousQuestion();
            });
        }
        
        // Categories button
        const categoriesButton = document.getElementById('categories-button');
        if (categoriesButton) {
            categoriesButton.addEventListener('click', () => {
                this.returnToCategories();
            });
        }
        
        // Play again button
        const playAgainButton = document.getElementById('play-again-button');
        if (playAgainButton) {
            playAgainButton.addEventListener('click', () => {
                this.resetGame();
            });
        }
    }
    
    setupResults() {
        // Share button will be handled by share.js
        const shareButton = document.getElementById('share-button');
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                if (window.ShareManager) {
                    const result = this.getPersonalityResult();
                    window.ShareManager.shareResult(result);
                }
            });
        }
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    startGame(category) {
        this.currentCategory = category;
        this.currentQuestionIndex = 0;
        this.answers = [];
        
        // Load questions for this category
        if (window.WouldYouRatherData && window.WouldYouRatherData.questions[category]) {
            const allQuestions = window.WouldYouRatherData.questions[category];
            
            // For categories with more than 10 questions, select random 10
            if (allQuestions.length > 10) {
                this.questions = this.shuffleArray(allQuestions).slice(0, 10);
                console.log(`Selected 10 random questions from ${allQuestions.length} available`);
            } else {
                this.questions = allQuestions;
            }
            
            console.log('Loaded questions for category:', category, this.questions);
        } else {
            console.error('Questions not found for category:', category);
            console.error('Available data:', window.WouldYouRatherData);
            alert('Error loading questions. Please refresh the page and try again.');
            return;
        }
        
        // Track game start
        if (window.Analytics) {
            window.Analytics.track('game_started', { 
                game: 'would_you_rather',
                category: category 
            });
        }
        
        // Switch screens
        this.showScreen('question-screen');
        
        // Display first question
        this.displayQuestion();
        
        // Save state
        this.saveGameState();
    }
    
    displayQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentQuestionIndex];
        
        // Debug log
        console.log('Displaying question:', this.currentQuestionIndex, question);
        
        // Update question number
        const questionNumber = document.getElementById('question-number');
        if (questionNumber) {
            questionNumber.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        }
        
        // Update choices
        const choiceAText = document.getElementById('choice-a-text');
        const choiceBText = document.getElementById('choice-b-text');
        
        if (choiceAText && choiceBText) {
            choiceAText.textContent = question.optionA;
            choiceBText.textContent = question.optionB;
            console.log('Updated choices:', question.optionA, question.optionB);
        } else {
            console.error('Choice text elements not found!');
        }
        
        // Update progress bar
        this.updateProgress();
        
        // Update navigation buttons
        const prevButton = document.getElementById('prev-button');
        if (prevButton) {
            prevButton.disabled = this.currentQuestionIndex === 0;
        }
        
        // Clear previous selection
        document.querySelectorAll('.choice-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Show previous answer if going back
        if (this.answers[this.currentQuestionIndex]) {
            const selectedChoice = this.answers[this.currentQuestionIndex];
            document.querySelector(`.choice-card[data-choice="${selectedChoice}"]`)?.classList.add('selected');
        }
    }
    
    selectAnswer(choice) {
        // Store answer
        this.answers[this.currentQuestionIndex] = choice;
        
        // Visual feedback
        document.querySelectorAll('.choice-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`.choice-card[data-choice="${choice}"]`)?.classList.add('selected');
        
        // Track answer
        if (window.Analytics) {
            window.Analytics.track('answer_selected', {
                category: this.currentCategory,
                question: this.currentQuestionIndex + 1,
                choice: choice
            });
        }
        
        // Move to next question after a short delay
        setTimeout(() => {
            this.nextQuestion();
        }, 300);
    }
    
    skipQuestion() {
        // Track skip
        if (window.Analytics) {
            window.Analytics.track('question_skipped', {
                category: this.currentCategory,
                question: this.currentQuestionIndex + 1
            });
        }
        
        // Don't store an answer for skipped questions
        this.answers[this.currentQuestionIndex] = null;
        this.nextQuestion();
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
        this.saveGameState();
    }
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            this.saveGameState();
        }
    }
    
    returnToCategories() {
        if (confirm('Return to categories? Your progress will be saved.')) {
            this.showScreen('category-screen');
        }
    }
    
    showResults() {
        // WAŻNE: Najpierw usuń zapisany stan gry, bo gra jest skończona
        this.clearGameState();
        
        const result = this.calculatePersonality();
        
        // Update results display
        const typeData = window.WouldYouRatherData.personalityTypes[this.currentCategory][result.type];
        
        // Update personality type text
        document.getElementById('personality-type').textContent = typeData.name;
        document.getElementById('personality-description').textContent = typeData.description;
        
        // Update icon - use emoji from personality type instead of generic category icon
        const iconElement = document.querySelector('.personality-icon');
        if (iconElement && typeData.icon) {
            // Replace the Lucide icon with the personality emoji
            iconElement.innerHTML = `<span style="font-size: 72px;">${typeData.icon}</span>`;
        }
        
        // Update stats
        document.getElementById('questions-answered').textContent = 
            this.answers.filter(a => a !== null).length;
        
        const mostCommon = this.getMostCommonChoice();
        document.getElementById('common-choice').textContent = 
            mostCommon === 'A' ? 'Option A' : 'Option B';
        
        // Track completion
        if (window.Analytics) {
            window.Analytics.track('game_completed', {
                category: this.currentCategory,
                personality_type: typeData.name,
                questions_answered: this.answers.filter(a => a !== null).length
            });
        }
        
        // Zapisz statystyki gry
        if (window.StatsManager) {
            const newAchievements = window.StatsManager.recordGameCompletion({
                category: this.currentCategory,
                personalityType: typeData.name,
                questionsAnswered: this.answers.filter(a => a !== null).length
            });
            
            // Jeśli są nowe osiągnięcia, pokaż je
            if (newAchievements.length > 0) {
                console.log('New achievements unlocked:', newAchievements);
                this.showAchievementPopup(newAchievements);
            }
        }
        
        // Show results screen
        this.showScreen('results-screen');
        
        // Re-initialize icons for results
        if (window.lucide) {
            setTimeout(() => window.lucide.createIcons(), 100);
        }
    }
    
    // Pokazywanie osiągnięć
    showAchievementPopup(achievements) {
        // Użyj nowego AchievementPopup zamiast alert
        if (window.AchievementPopup) {
            window.AchievementPopup.showMultiple(achievements);
        } else {
            // Fallback do alert jeśli popup nie jest załadowany
            achievements.forEach((achievement, index) => {
                setTimeout(() => {
                    alert(`🎉 Achievement Unlocked!\n\n${achievement.name}\n${achievement.description}`);
                }, index * 1000);
            });
        }
    }
    
    calculatePersonality() {
        const scores = {};
        
        // Initialize scores for all types in this category
        const categoryTypes = window.WouldYouRatherData.personalityTypes[this.currentCategory];
        Object.keys(categoryTypes).forEach(type => {
            scores[type] = 0;
        });
        
        // Calculate scores based on answers
        this.answers.forEach((answer, index) => {
            if (answer && this.questions[index]) {
                const question = this.questions[index];
                const points = question.typePoints;
                
                Object.keys(points).forEach(type => {
                    if (answer === 'A') {
                        scores[type] += points[type];
                    } else {
                        scores[type] -= points[type];
                    }
                });
            }
        });
        
        // Find the highest scoring type
        let maxScore = -Infinity;
        let resultType = Object.keys(scores)[0];
        
        Object.keys(scores).forEach(type => {
            if (scores[type] > maxScore) {
                maxScore = scores[type];
                resultType = type;
            }
        });
        
        return {
            type: resultType,
            scores: scores
        };
    }
    
    getMostCommonChoice() {
        const counts = { A: 0, B: 0 };
        this.answers.forEach(answer => {
            if (answer) counts[answer]++;
        });
        return counts.A > counts.B ? 'A' : 'B';
    }
    
    getPersonalityResult() {
        const result = this.calculatePersonality();
        const typeData = window.WouldYouRatherData.personalityTypes[this.currentCategory][result.type];
        
        return {
            category: this.currentCategory,
            type: typeData.name,
            icon: typeData.icon,
            description: typeData.description
        };
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }
    
    showScreen(screenId) {
        console.log('Showing screen:', screenId);
        
        try {
            // Hide all screens
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Show requested screen
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active');
            } else {
                console.error('Screen not found:', screenId);
                // Fallback to category screen
                const categoryScreen = document.getElementById('category-screen');
                if (categoryScreen) {
                    categoryScreen.classList.add('active');
                }
            }
            
            // Re-initialize Lucide icons safely
            if (window.lucide && typeof window.lucide.createIcons === 'function' && !this.iconUpdatePending) {
                this.iconUpdatePending = true;
                setTimeout(() => {
                    try {
                        window.lucide.createIcons();
                        console.log('Icons re-initialized for screen:', screenId);
                    } catch (iconError) {
                        console.error('Error initializing icons:', iconError);
                    }
                    this.iconUpdatePending = false;
                }, 100);
            }
        } catch (error) {
            console.error('Error in showScreen:', error);
        }
    }
    
    resetGame() {
        this.currentCategory = null;
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.questions = [];
        this.showScreen('category-screen');
        
        // Re-initialize icons
        if (window.lucide) {
            setTimeout(() => window.lucide.createIcons(), 100);
        }
    }
    
    saveGameState() {
        const gameState = {
            category: this.currentCategory,
            questionIndex: this.currentQuestionIndex,
            answers: this.answers,
            timestamp: Date.now()
        };
        
        localStorage.setItem('wouldYouRatherState', JSON.stringify(gameState));
    }
    
    loadGameState() {
        try {
            const savedState = localStorage.getItem('wouldYouRatherState');
            if (!savedState) {
                console.log('No saved game state found');
                return;
            }
            
            let state;
            try {
                state = JSON.parse(savedState);
            } catch (parseError) {
                console.error('Invalid saved state, clearing...', parseError);
                this.clearGameState();
                return;
            }
            
            // Validate state structure
            if (!state || typeof state !== 'object' || !state.timestamp) {
                console.warn('Invalid state structure, clearing...');
                this.clearGameState();
                return;
            }
            
            // NOWE: Sprawdź czy gra była ukończona (10 pytań lub więcej odpowiedzi)
            if (state.answers && state.answers.length >= 10) {
                console.log('Previous game was completed, clearing saved state...');
                this.clearGameState();
                return;
            }
            
            // NOWE: Sprawdź czy wszystkie pytania zostały odpowiedziane
            if (state.questionIndex && state.answers && state.questionIndex >= state.answers.length && state.answers.length > 0) {
                // Jeśli index pytania jest równy lub większy niż liczba odpowiedzi, gra mogła być ukończona
                console.log('Game might be completed, clearing saved state...');
                this.clearGameState();
                return;
            }
            
            // Check if state is less than 1 hour old
            if (Date.now() - state.timestamp < 3600000) {
                if (confirm('Continue your previous game?')) {
                    this.currentCategory = state.category;
                    this.currentQuestionIndex = state.questionIndex || 0;
                    this.answers = state.answers || [];
                    
                    if (this.currentCategory && window.WouldYouRatherData && window.WouldYouRatherData.questions[this.currentCategory]) {
                        this.questions = window.WouldYouRatherData.questions[this.currentCategory];
                        this.showScreen('question-screen');
                        this.displayQuestion();
                    } else {
                        console.warn('Invalid category or missing data, returning to categories');
                        this.clearGameState();
                    }
                } else {
                    this.clearGameState();
                }
            } else {
                console.log('Saved state too old, clearing...');
                this.clearGameState();
            }
        } catch (error) {
            console.error('Error in loadGameState:', error);
            this.clearGameState();
        }
    }
    
    clearGameState() {
        localStorage.removeItem('wouldYouRatherState');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, waiting for scripts...');
    
    // Wait for all resources
    window.addEventListener('load', () => {
        console.log('All resources loaded');
        
        // Extra safety delay
        setTimeout(() => {
            try {
                console.log('Initializing game...');
                
                // Check if questions data exists
                if (!window.WouldYouRatherData) {
                    console.error('Questions data not loaded!');
                    alert('Error: Game data not loaded. Please refresh the page.');
                    return;
                }
                
                console.log('Questions data available:', window.WouldYouRatherData);
                
                // Create game instance
                window.game = new WouldYouRatherGame();
                
                // Initialize Lucide icons safely
                if (window.lucide && typeof window.lucide.createIcons === 'function') {
                    try {
                        console.log('Initializing Lucide icons...');
                        window.lucide.createIcons();
                    } catch (iconError) {
                        console.error('Error with Lucide icons:', iconError);
                        // Continue without icons
                    }
                } else {
                    console.warn('Lucide not available, continuing without icons');
                }
                
                console.log('Game initialization complete');
            } catch (error) {
                console.error('Error initializing game:', error);
                alert('Error loading game: ' + error.message + '\nPlease refresh the page.');
            }
        }, 200);
    });
});