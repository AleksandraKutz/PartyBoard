document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const categoryContainer = document.getElementById('category-container');
    if (!gameContainer || !categoryContainer) {
        alert('Brakuje wymaganych elementów w HTML! Upewnij się, że index.html zawiera <section id="game-container"></section> i <section id="category-container"></section>');
        return;
    }
    let categories = [];

    // Wczytaj kategorie z JSON i wyrenderuj przyciski od razu po załadowaniu strony
    fetch('./data/would_you_rather.json')
        .then(response => {
            if (!response.ok) throw new Error('HTTP error ' + response.status);
            return response.json();
        })
        .then(data => {
            if (!data.categories) throw new Error('Brak kategorii w pliku JSON!');
            categories = data.categories;
            renderCategoryButtons(categories);
        })
        .catch(err => {
            console.error('Fetch error:', err);
            categoryContainer.innerHTML = '<p style="color:red;">Could not load categories. Check the console for errors.<br>' + err + '</p>';
        });

    function renderCategoryButtons(categories) {
        categoryContainer.innerHTML = '';
        if (!categories || categories.length === 0) {
            categoryContainer.innerHTML = '<p style="color:red;">Brak kategorii do wyświetlenia.</p>';
            return;
        }
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = cat.name;
            btn.style.background = cat.color;
            btn.onclick = () => loadCategoryGame(cat.id);
            categoryContainer.appendChild(btn);
        });
    }

    function loadCategoryGame(categoryId) {
        categoryContainer.style.display = 'none';
        // Dynamiczny import gry
        import('./games/would_you_rather.js')
            .then(module => {
                if (typeof module.initWouldYouRather === 'function') {
                    module.initWouldYouRather(gameContainer, categoryId);
                } else {
                    gameContainer.innerHTML = '<p>Game module loaded, but init function not found.</p>';
                }
            })
            .catch(err => {
                console.error('Import error:', err);
                gameContainer.innerHTML = '<p>Failed to load the game.<br>' + err + '</p>';
            });
    }

    // Funkcja do ponownego pokazania kategorii (np. po zakończeniu gry)
    window.showCategories = function() {
        categoryContainer.style.display = '';
        gameContainer.innerHTML = '';
    };
}); 