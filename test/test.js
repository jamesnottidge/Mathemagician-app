// eslint-disable-next-line no-undef
const assert = require('chai').assert;
import {gameOver} from "../src/gameover.js";
import {sum} from "../src/sum.js";
import {Game} from "../src/game";
import {useState} from "react";
import { Setup } from "../src/setup.js";
describe("sum", () => {
    it("adds numbers", () => {
        assert.strictEqual(sum(6,3),9, "works I guess");
    });
});


// describe("gameOver", () => {
//     it("changes display", () => {
//         const timeSpent = 0;
//         const fly = {innerHTML: ""};
//         gameOver(fly, timeSpent);
//         // eslint-disable-next-line max-len
//         assert.equal(fly.innerHTML, `<p id = "game-over">GAME OVER</p><p>You spent 0 milliseconds playing.<br><button id = "replay-button">Replay?</button>`, "works I guess");
//     });
// });

describe("setup", () => {
    it("returns setup", () => {
        const output = Setup({rounds, setrounds});
        assert.equal(output, <div className="display">
        <p>Hi, this is James' math game, choose your parameters and get to calculating!</p>
        <input type="number" min="1" max="20" value={props.rounds} onChange = {props.setrounds}></input>
        <div>
            <button onClick={handleClick}>Start</button>
        </div>
    </div>, "ok?");
    });
});