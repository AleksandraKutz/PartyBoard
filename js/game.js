// PartyBoard - Would You Rather Game Logic

class WouldYouRatherGame {
    constructor() {
        this.currentCategory = null;
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.questions = [];
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupCategorySelection();
        this.setupQuestionHandlers();
        this.setupNavigation();
        this.setupResults();
        
        // Check if we have saved game state
        this.loadGameState();
    }
    
    setupCategorySelection() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.startGame(category);
            });
        });
    }
    
    setupQuestionHandlers() {
        const choiceCards = document.querySelectorAll('.choice-card');
        choiceCards.forEach(card => {
            card.addEventListener('click', (e) => {
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
    
    startGame(category) {
        this.currentCategory = category;
        this.currentQuestionIndex = 0;
        this.answers = [];
        
        // Load questions for this category
        if (window.WouldYouRatherData && window.WouldYouRatherData.questions[category]) {
            this.questions = window.WouldYouRatherData.questions[category];
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
        const result = this.calculatePersonality();
        
        // Update results display
        const typeData = window.WouldYouRatherData.personalityTypes[this.currentCategory][result.type];
        
        document.getElementById('personality-icon').textContent = typeData.icon;
        document.getElementById('personality-type').textContent = typeData.name;
        document.getElementById('personality-description').textContent = typeData.description;
        
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
        
        // Show results screen
        this.showScreen('results-screen');
        
        // Clear saved state
        this.clearGameState();
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
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show requested screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }
    
    resetGame() {
        this.currentCategory = null;
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.questions = [];
        this.showScreen('category-screen');
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
        const savedState = localStorage.getItem('wouldYouRatherState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                
                // Check if state is less than 1 hour old
                if (Date.now() - state.timestamp < 3600000) {
                    if (confirm('Continue your previous game?')) {
                        this.currentCategory = state.category;
                        this.currentQuestionIndex = state.questionIndex;
                        this.answers = state.answers || [];
                        
                        if (this.currentCategory && window.WouldYouRatherData) {
                            this.questions = window.WouldYouRatherData.questions[this.currentCategory];
                            this.showScreen('question-screen');
                            this.displayQuestion();
                        }
                    } else {
                        this.clearGameState();
                    }
                } else {
                    this.clearGameState();
                }
            } catch (e) {
                console.error('Error loading game state:', e);
                this.clearGameState();
            }
        }
    }
    
    clearGameState() {
        localStorage.removeItem('wouldYouRatherState');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for all scripts to load
    setTimeout(() => {
        console.log('Initializing game...');
        console.log('Questions data available:', window.WouldYouRatherData);
        window.game = new WouldYouRatherGame();
    }, 100);
});