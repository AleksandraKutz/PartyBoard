export function initWouldYouRather(container) {
    // Ukryj przycisk w menu
    const btn = document.getElementById('would-you-rather-btn');
    const titleContainer = document.getElementById('game-title-container');
    if (btn) btn.style.display = 'none';
    if (titleContainer) titleContainer.innerHTML = '<h2 id="summary-title" style="margin:0;">Would you rather?</h2>';

    container.innerHTML = '<div id="wyr-question"></div><div id="wyr-buttons"></div><div id="wyr-progress"></div><div id="wyr-nav"></div>';
    fetch('./data/would_you_rather.json')
        .then(response => response.json())
        .then(data => {
            let questions = shuffle([...data.questions]);
            let current = 0;
            let answers = [];
            let stats = { optionA: 0, optionB: 0 };
            let categoryPoints = {};
            const personalityDescriptions = {
                adventurer: "You're always ready to turn a trip to the kitchen into an epic quest. If there's a conga line, you're leading it!",
                homebody: "You believe the best party is the one where you can wear pajamas. Couch? Best seat in the house!",
                creative: "You see a napkin and immediately want to make origami. Karaoke? You're already on stage!",
                thinker: "You're the one who reads the game rules out loud. Twice. And then wins anyway."
            };

            function shuffle(arr) {
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
                return arr;
            }

            function showQuestion() {
                if (current >= questions.length) {
                    showSummary();
                    return;
                }
                const qDiv = document.getElementById('wyr-question');
                qDiv.textContent = questions[current].question;
                qDiv.classList.remove('fade-in');
                void qDiv.offsetWidth;
                qDiv.classList.add('fade-in');
                const btns = document.getElementById('wyr-buttons');
                btns.innerHTML = '';
                ['optionA', 'optionB'].forEach((opt, idx) => {
                    const btn = document.createElement('button');
                    btn.textContent = questions[current][opt];
                    btn.className = idx === 0 ? 'option-a' : 'option-b';
                    btn.onclick = () => selectOption(opt);
                    btns.appendChild(btn);
                });
                btns.classList.remove('fade-in');
                void btns.offsetWidth;
                btns.classList.add('fade-in');
                const progress = document.getElementById('wyr-progress');
                progress.textContent = `Question ${current + 1} of ${questions.length}`;
                progress.className = 'fade-in';
                const nav = document.getElementById('wyr-nav');
                nav.innerHTML = '';
                if (current > 0) {
                    const backBtn = document.createElement('button');
                    backBtn.textContent = 'Back';
                    backBtn.className = 'option-a';
                    backBtn.onclick = goBack;
                    nav.appendChild(backBtn);
                }
            }

            function selectOption(opt) {
                answers[current] = opt;
                if (current === answers.length - 1) {
                    stats[opt]++;
                } else {
                    const prev = answers[current];
                    if (prev) stats[prev]--;
                    stats[opt]++;
                }
                // Liczenie punktów dla kategorii
                const catKey = opt === 'optionA' ? 'categoryA' : 'categoryB';
                const cat = questions[current][catKey];
                if (cat) {
                    categoryPoints[cat] = (categoryPoints[cat] || 0) + 1;
                }
                current++;
                showQuestion();
            }

            function goBack() {
                if (current > 0) {
                    const prevOpt = answers[current - 1];
                    if (prevOpt) stats[prevOpt]--;
                    // Cofnij punkt z kategorii
                    const catKey = prevOpt === 'optionA' ? 'categoryA' : 'categoryB';
                    const cat = questions[current - 1][catKey];
                    if (cat && categoryPoints[cat]) categoryPoints[cat]--;
                    current--;
                    showQuestion();
                }
            }

            function showSummary() {
                // Zmień tytuł w menu na 'Summary'
                if (titleContainer) titleContainer.innerHTML = '<h2 id="summary-title" style="margin:0;">Summary</h2>';
                // Znajdź kategorię z największą liczbą punktów
                let topCategory = null;
                let maxPoints = -1;
                for (const cat in categoryPoints) {
                    if (categoryPoints[cat] > maxPoints) {
                        maxPoints = categoryPoints[cat];
                        topCategory = cat;
                    }
                }
                const personality = topCategory ? personalityDescriptions[topCategory] : '';
                const typeLabel = topCategory ? topCategory.charAt(0).toUpperCase() + topCategory.slice(1) : '';
                container.innerHTML = `
                    <div id="wyr-summary" class="fade-in" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:250px;">
                        <ul style="list-style:none;padding:0;margin:0 0 1.5em 0;text-align:center;">
                            <li style="margin-bottom:0.5em;"><span style="color:#3b82f6;font-weight:bold;">Option A</span>: ${stats.optionA}</li>
                            <li><span style="color:#ef4444;font-weight:bold;">Option B</span>: ${stats.optionB}</li>
                        </ul>
                        <div style="margin-bottom:0.5em;font-size:1.2em;"><strong>Your type: ${typeLabel}</strong></div>
                        <div style="margin-bottom:1.2em;font-size:1.1em;text-align:center;max-width:350px;">${personality}</div>
                        <button id="wyr-share" class="option-a" style="margin-bottom:0.7em;">Share your result</button>
                        <button id="wyr-restart" class="option-b">Play again</button>
                    </div>
                `;
                document.getElementById('wyr-share').onclick = shareResult;
                document.getElementById('wyr-restart').onclick = () => {
                    if (btn) btn.style.display = '';
                    if (titleContainer) titleContainer.innerHTML = '<button id="would-you-rather-btn">Would you rather?</button>';
                    const newBtn = document.getElementById('would-you-rather-btn');
                    if (newBtn) newBtn.onclick = () => initWouldYouRather(container);
                    container.innerHTML = '';
                };
            }

            function shareResult() {
                let topCategory = null;
                let maxPoints = -1;
                for (const cat in categoryPoints) {
                    if (categoryPoints[cat] > maxPoints) {
                        maxPoints = categoryPoints[cat];
                        topCategory = cat;
                    }
                }
                const personality = topCategory ? personalityDescriptions[topCategory] : '';
                const text = `I played Would You Rather! My party personality: ${personality}\nOption A: ${stats.optionA}, Option B: ${stats.optionB}. Try it yourself!`;
                if (navigator.share) {
                    navigator.share({ title: 'Would You Rather', text });
                } else {
                    navigator.clipboard.writeText(text);
                    alert('Result copied to clipboard!');
                }
            }

            showQuestion();
        })
        .catch(() => {
            container.innerHTML = '<p>Could not load questions.</p>';
        });
} 