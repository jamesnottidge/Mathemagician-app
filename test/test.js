// eslint-disable-next-line no-undef
const assert = require('chai').assert;
import {gameOver} from "../src/gameover.js";
import {sum} from "../src/sum.js";

describe("sum", () => {
    it("adds numbers", () => {
        assert.strictEqual(sum(6,3),9, "works I guess");
    });
});


describe("gameOver", () => {
    it("changes display", () => {
        const timeSpent = 0;
        const fly = {innerHTML: ""};
        gameOver(fly, timeSpent);
        // eslint-disable-next-line max-len
        assert.equal(fly.innerHTML, `<p id = "game-over">GAME OVER</p><p>You spent 0 milliseconds playing.<br><button id = "replay-button">Replay?</button>`, "works I guess");
    });
});