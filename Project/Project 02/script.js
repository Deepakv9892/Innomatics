const categories = {
    flags: [
        'images/flags/india.png',
        'images/flags/United States.png',
        'images/flags/Canada.png',
        'images/flags/United Kingdom.png',
        'images/flags/Germany.png',
        'images/flags/South Africa.png',
        'images/flags/Ireland.png',
        'images/flags/Norway.png'
    ],
    dragonball: [
        'images/dragonball/Gohan.jpg',
        'images/dragonball/Vegeta.jpg',
        'images/dragonball/Frieza.jpg',
        'images/dragonball/Krillin.png',
        'images/dragonball/Goten.jpg',
        'images/dragonball/Zarbon.png',
        'images/dragonball/Majinboo.jpg',
        'images/dragonball/Picolo.jpg'
    ],
    cars: [
        'images/cars/Chevysilverado.jpg',
        'images/cars/Fordf150.jpg',
        'images/cars/GMCSierra.avif',
        'images/cars/HondaCR-V.webp',
        'images/cars/Ram.jpg',
        'images/cars/TeslaModel.jpg',
        'images/cars/ToyotaRAV4.jpg',
        'images/cars/ToyotaCamry.avif'
    ],
    emojis: [
        'images/emojis/beaming.jpg',
        'images/emojis/Grinningface.png',
        'images/emojis/meltingface.jpg',
        'images/emojis/Roolinglaugh.png',
        'images/emojis/Slightlysmilingface.png',
        'images/emojis/upsidedownface.jpg',
        'images/emojis/winkingface.png',
        'images/emojis/smilingfacehalo.png'
    ],
    animals: [
        'images/animals/Cat.png',
        'images/animals/Fennecfox.webp',
        'images/animals/Fox.png',
        'images/animals/minipig.avif',
        'images/animals/panda.jpg',
        'images/animals/Quokka.png',
        'images/animals/redpanda.png',
        'images/animals/Penguins.png'
    ],
    sports: [
        'images/sports/badminton.png',
        'images/sports/baseball.jpg',
        'images/sports/basketball.png',
        'images/sports/boxing.png',
        'images/sports/cricket.png',
        'images/sports/golf.png',
        'images/sports/soccer.png',
        'images/sports/tabletenis.jpg'
    ]
};

let gameState = {
    cards: [],
    flippedCards: [],
    matches: 0,
    score: 0,
    timer: 60,
    timerInterval: null,
    gameActive: false
};

function shuffleArray(array) {
    const newArray = [...array, ...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startGame(category) {
    gameState = {
        cards: shuffleArray(categories[category]),
        flippedCards: [],
        matches: 0,
        score: 0,
        timer: 60,
        timerInterval: null,
        gameActive: true
    };

    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = '60';

    const cardsGrid = document.getElementById('cardsGrid');
    cardsGrid.innerHTML = '';
    
    gameState.cards.forEach((card, index) => {
        cardsGrid.innerHTML += `
            <div class="card" data-index="${index}">
                <div class="card-front">?</div>
                <div class="card-back">
                    <img src="${card}" alt="card">
                </div>
            </div>
        `;
    });

    startTimer();

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
}

function handleCardClick(event) {
    if (!gameState.gameActive) return;

    const card = event.currentTarget;
    const index = card.dataset.index;

    if (card.classList.contains('matched') || 
        card.classList.contains('flipped') || 
        gameState.flippedCards.length >= 2) {
        return;
    }

    card.classList.add('flipped');
    gameState.flippedCards.push({ index, card });

    if (gameState.flippedCards.length === 2) {
        const [card1, card2] = gameState.flippedCards;
        
        if (gameState.cards[card1.index] === gameState.cards[card2.index]) {
            setTimeout(() => {
                card1.card.classList.add('matched');
                card2.card.classList.add('matched');
                gameState.matches++;
                gameState.score += 10;
                document.getElementById('score').textContent = gameState.score;
                
                if (gameState.matches === gameState.cards.length / 2) {
                    endGame(true);
                }
            }, 500);
        } else {
            setTimeout(() => {
                card1.card.classList.remove('flipped');
                card2.card.classList.remove('flipped');
            }, 1000);
        }

        gameState.flippedCards = [];
    }
}

function startTimer() {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
        gameState.timer--;
        document.getElementById('timer').textContent = gameState.timer;
        
        if (gameState.timer <= 0) {
            endGame(false);
        }
    }, 1000);
}

function endGame(won) {
    gameState.gameActive = false;
    clearInterval(gameState.timerInterval);

    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    gameOver.innerHTML = `
        <h2>${won ? 'Congratulations!' : 'Game Over!'}</h2>
        <p>Final Score: ${gameState.score}</p>
        <button class="play-again-button" onclick="location.reload()">Play Again</button>
    `;
    document.body.appendChild(gameOver);
}