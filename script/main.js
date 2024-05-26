import { init } from './game.js';

const startGameButton = document.getElementById('start-game');

startGameButton.addEventListener('click', () => {
  init();
});
