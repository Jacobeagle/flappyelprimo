const bird = document.getElementById('bird');
const pipesContainer = document.getElementById('pipes');
const scoreDisplay = document.getElementById('score');
const jumpButton = document.getElementById('jumpButton');
const gameOverDisplay = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');

let birdBottom = 300;
let gravity = 2;
let isGameOver = false;
let score = 0;
let jumpHeight = 50;
let pipeInterval;
let pipeSpeed = 5;

function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';

    if (birdBottom < 0) {
        endGame();
    }

    if (!isGameOver) {
        if (Math.random() < 0.02) {
            createPipe();
        }
        updateScore();
    }
}

function jump() {
    if (isGameOver) return;
    birdBottom += jumpHeight;
    bird.style.bottom = birdBottom + 'px';
}

function createPipe() {
    const pipe = document.createElement('div');
    const pipeHeight = Math.random() * (300 - 50) + 50;
    const gap = 150; // Przerwa między rurami
    const bottomPipeHeight = 600 - pipeHeight - gap;
    
    pipe.classList.add('pipe');
    pipe.style.height = pipeHeight + 'px';
    pipe.style.left = '400px';
    pipesContainer.appendChild(pipe);

    const bottomPipe = document.createElement('div');
    bottomPipe.classList.add('pipe');
    bottomPipe.style.height = bottomPipeHeight + 'px';
    bottomPipe.style.left = '400px';
    bottomPipe.style.bottom = '0';
    pipesContainer.appendChild(bottomPipe);
    
    let pipeLeft = 400;
    const timerId = setInterval(() => {
        pipeLeft -= pipeSpeed;
        pipe.style.left = pipeLeft + 'px';
        bottomPipe.style.left = pipeLeft + 'px';

        if (pipeLeft < -50) {
            clearInterval(timerId);
            pipesContainer.removeChild(pipe);
            pipesContainer.removeChild(bottomPipe);
            score++;
        } else if (pipeLeft > 50 && pipeLeft < 100 && (birdBottom < pipeHeight || birdBottom > (600 - bottomPipeHeight))) {
            endGame();
        }
    }, 20);
}

function endGame() {
    clearInterval(pipeInterval);
    isGameOver = true;
    finalScore.innerText = score;
    gameOverDisplay.classList.remove('hidden');
    alert('Koniec gry! Twój wynik: ' + score);
}

function updateScore() {
    scoreDisplay.innerText = score;
}

// Obsługuje skakanie klawiaturą i przyciskiem
document.addEventListener('keydown', jump);
jumpButton.addEventListener('click', jump);

// Uruchomienie gry
pipeInterval = setInterval(startGame, 20);
