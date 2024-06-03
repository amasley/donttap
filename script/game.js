const squares = document.querySelectorAll('.game-square');
let score = document.getElementById('game-score');
let highScore = localStorage.getItem('high-score');

\
export function init() {
  initialSquares();
  gameStart();
}

function initialSquares() {
  const randomSquares = [];
  clearSquares();
  while (randomSquares.length < 3) {
    const randomIndex = Math.floor(Math.random() * squares.length);
    if (!randomSquares.includes(randomIndex)) {
      randomSquares.push(randomIndex);
    }
  }

  randomSquares.forEach(index => {
    setSquareState(squares[index], false);
  });
}

function gameStart() {
  getHighScore();
  squares.forEach(square => {
    square.addEventListener('click', () => {
      if (!getSquareState(square)) {

        console.log('Game Over!');
        gameEnd();
        return;
      }
      setSquareState(square, true);
      incrementScore();
    });
  });
}

function gameEnd() {
  setHighScore();
  alert(`Game Over! Your score is ${score.innerText}. High score is ${highScore}`);
  score.innerText = 0;
  clearSquares();
}
function incrementScore() {
  score.innerText = parseInt(score.innerText) + 1;
}

function setHighScore(){
  if (parseInt(score.innerText) > highScore) {
    highScore = score.innerText;
    localStorage.setItem('high-score', highScore);
  }
}
function getHighScore(){
  if(!highScore){
      localStorage.setItem('high-score', 0);
    }
}


function clearSquares() {
  squares.forEach(square => {
    setSquareState(square, true);
  });
}




function setSquareState(square, remove) {
  if (remove) {
    square.removeAttribute('data-active');
    return;
  }
  square.setAttribute('data-active', "");
}

function getSquareState(square) {
  if (square.hasAttribute('data-active')) {
    return true;
  }
  return false; 
}