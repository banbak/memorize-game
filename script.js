document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');
    const customAlert = document.getElementById('custom-alert');
    const overlay = document.getElementById('overlay'); 

    const cardsArray = [
        '🤯', '🤯', '🔋', '🔋', '🧟‍♂️', '🧟‍♂️', '🕹️', '🕹️',
        '📱', '📱', '👽', '👽', '🤖', '🤖', '🦄', '🦄'
    ];
    
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;

    function initializeBoard() {
        matchedPairs = 0;
        const shuffledCards = shuffle(cardsArray);
        board.innerHTML = '';

        shuffledCards.forEach(symbol => {
            const card = createCard(symbol);
            board.appendChild(card);
        });
    }

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${symbol}</div>
                <div class="card-back">?</div>
            </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        return card;
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function flipCard(card) {
        if (lockBoard || card === firstCard) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkForMatch();
        }
    }
    function checkForMatch() {
        if (firstCard.innerHTML === secondCard.innerHTML) {
            disableCards();
            matchedPairs++;
            if (matchedPairs === cardsArray.length / 2) {
                showCustomAlert(); 
            }
        } else {
            unflipCards();
        }
    }

    function showCustomAlert() {
        customAlert.style.display = 'block';
        
        overlay.style.display = 'block';
        
        setTimeout(() => {
            customAlert.style.display = 'none';

            overlay.style.display = 'none';

            initializeBoard(); 
        }, 3000); 
    }

    function disableCards() {
        firstCard.removeEventListener('click', () => flipCard(firstCard));
        secondCard.removeEventListener('click', () => flipCard(secondCard));
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    restartBtn.addEventListener('click', () => {
        matchedPairs = 0;
        initializeBoard();
    });

    initializeBoard();
});
