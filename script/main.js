const gameArea = document.querySelector('#game-area');
const squares = document.querySelectorAll('.square');
const startButton = document.querySelector('#start-game');
const gameOverBox = document.querySelector('#game-over');
const gameEnd = true;
let score = document.querySelector('#game-score');
let highScore = localStorage.getItem('high-score');
let gameTimer = document.querySelector('#game-timer');
const highScoreDisplay = document.querySelector('#high-score');


let timer;

function startTimer(duration) {
  let time = duration;
  gameTimer.innerText = time;
  timer = setInterval(() => {
    time--;
    gameTimer.innerText = time;
    if (time <= 0) {
      
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  resetGame();
  console.log('Game Over!');
}

startButton.addEventListener('click', () => {
  initializeSquares();
  gameOverBox.style.display = 'none';
  score.innerText = 0;
  startTimer(10); // Change the duration as needed
});

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      checkSquare(square);
    });
    
  });


function resetGame() {
  setHighScore();
  clearSquares();
  gameOverBox.style.display = 'flex';
  score.innerText = 0;
  gameTimer.innerText = '';
}
function initializeSquares() {
  const randomSquares = [];
  clearSquares();
  while (randomSquares.length < 3) {
    const randomIndex = Math.floor(Math.random() * squares.length);
    if (!randomSquares.includes(squares[randomIndex])) {
      randomSquares.push(squares[randomIndex]);
    }
  }

  randomSquares.forEach(square => {
    setSquareActive(square);
  });
}
function checkSquare(square) {
  if (square.dataset.active === 'true') {
    console.log('Square is active!');
    addNewSquare();
    setSquareInactive(square);
    incrementScore();
    
  } else {
    console.log('Game Over!');
    endGame();
  }
}

function clearSquares() {
  squares.forEach(square => {
    setSquareInactive(square);
  });
}

function addNewSquare() {
  let randomIndex = Math.floor(Math.random() * squares.length);
  while (squares[randomIndex].dataset.active === 'true') {
    randomIndex = Math.floor(Math.random() * squares.length);
  }
  setSquareActive(squares[randomIndex]);
}

function incrementScore() {
  score.innerText = parseInt(score.innerText) + 1;
}
function setHighScore(){
  if(!highScore){
    localStorage.setItem('high-score', score.innerText);
    return;
  }
  if (parseInt(score.innerText) > highScore) {
    highScoreDisplay.innerText = score.innerText;
    localStorage.setItem('high-score', score.innerText);
  }

}

function setSquareActive(square) {
  square.dataset.active = "true"; 
}

function setSquareInactive(square) {
  square.dataset.active = "false";
}
function randomIndexOfSquares() {
  
}