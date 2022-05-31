 import '../css/index.css';

import Game from "./game.js";
const game = new Game();
game.setup();

document.querySelector('#root').addEventListener('keyup', (e) => {
    const target = e.target;
    if (target.matches("#answer-input")) {
        game.validateAnswer(document.querySelector('#answer-input').value);
    }
});

document.querySelector('#root').addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches(".start-button")) {
        game.start();
    }
});