export const gameOver = (fly,timeSpent) => {
    // eslint-disable-next-line max-len
    fly.innerHTML = `<p id = "game-over">GAME OVER</p><p>You spent ${timeSpent} milliseconds playing.<br><button id = "replay-button">Replay?</button>`;

};