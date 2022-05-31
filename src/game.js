import { Display } from "./display.js";
const display = new Display();
export default class Game {
    constructor() {
        this.sum=0;
        this.gameLevel=0;
        this.time=0;
    }

    setup() {
        display.render(1);
    }

    play() {
        const valA=Math.floor(Math.random() * 10);
        const valB=Math.floor(Math.random() * 10);
        this.sum = valA + valB;
        this.gameLevel++;
        display.render(2, valA, valB);
    }

    end() {
        display.render(3, Date.now()-this.time);
        this.gameLevel=0;
    }

    start() {
        this.time=Date.now();
        this.play();
    }

    validateAnswer(value) {
        if (value == this.sum && this.gameLevel < 3) {
            this.play();
        } else if (value == this.sum && this.gameLevel>=3) {
            this.end();
        }
        else{
            display.render(4,value);
        }
    
    }
}
