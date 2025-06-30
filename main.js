document.addEventListener('DOMContentLoaded', function() {
    const wouldYouRatherBtn = document.getElementById('would-you-rather-btn');
    const gameContainer = document.getElementById('game-container');

    wouldYouRatherBtn.addEventListener('click', function() {
        loadWouldYouRather();
    });

    function loadWouldYouRather() {
        // Wyczyść kontener
        gameContainer.innerHTML = '';
        // Dynamicznie załaduj skrypt gry
        import('./games/would_you_rather.js')
            .then(module => {
                module.initWouldYouRather(gameContainer);
            })
            .catch(err => {
                gameContainer.innerHTML = '<p>Failed to load the game.</p>';
            });
    }
}); 