import {Display} from "./display.js";
export default class Game {
    constructor() {
        this.sum=0;
        this.gameLevel=0;
        this.time=0;
        this.display=new Display();
    }

    play() {
        const valA=Math.floor(Math.random() * 10);
        const valB=Math.floor(Math.random() * 10);
        this.sum = valA + valB;
        this.gameLevel++;
        this.display.render("play", valA, valB);
    }

    end() {
        this.display.render("end", Date.now()-this.time);
        this.gameLevel=0;
        this.time=0;
        this.sum=0;
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
        } else {
            this.display.render("wrongAnswer",value);
        }
    
    }
}
