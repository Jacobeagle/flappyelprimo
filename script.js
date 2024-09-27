const bird = document.getElementById('bird');
const pipesContainer = document.getElementById('pipes');
const scoreDisplay = document.getElementById('score');
const jumpButton = document.getElementById('jumpButton');

let birdBottom = 300;
let gravity = 2;
let isGameOver = false;
let score = 0;

function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';

    if (birdBottom < 0) {
        endGame();
    }

    if (isGameOver) return;

    if (Math.random() < 0.02) {
        createPipe();
    }

    updateScore();
}

function jump() {
    if (isGameOver) return;
    birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
}

function createPipe() {
    const pipe = document.createElement('div');
    const pipeHeight = Math.random() * (300 - 50) + 50;
    pipe.style.height = pipeHeight + 'px';
    pipe.classList.add('pipe');
    pipesContainer.appendChild(pipe);
    
    let pipeLeft = 400;
    let timerId = setInterval(() => {
        if (pipeLeft < -50) {
            clearInterval(timerId);
            pipesContainer.removeChild(pipe);
            score++;
        } else if (pipeLeft > 50 && pipeLeft < 100 && birdBottom < pipeHeight) {
            endGame();
        }
        pipeLeft -= 5;
        pipe.style.left = pipeLeft + 'px';
    }, 20);
}

function endGame() {
    clearInterval(gameTimer);
    isGameOver = true;
    alert('Koniec gry! Twój wynik: ' + score);
}

function updateScore() {
    scoreDisplay.innerText = score;
}

// Obsługuje skakanie klawiaturą i przyciskiem
document.addEventListener('keydown', jump);
jumpButton.addEventListener('click', jump);

// Uruchomienie gry
const gameTimer = setInterval(startGame, 20);
