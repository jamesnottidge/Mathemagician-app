import {gamePlay} from './gameplay';
import {gameOver} from './gameover';
import '../css/index.css';


const fly = document.createElement("div");
fly.classList.add("stylish");
let sum = gamePlay(fly); 
document.querySelector("#answer-input").focus();
let timeNow = Date.now();
let count = 0;


const submitFunction = () => {
    if (document.querySelector("#answer-input").value == sum) {
        sum = gamePlay(fly);
        count++;
    }
};
 document.querySelector('#root').addEventListener('keyup', (e) => {
     const target = e.target;
     if (target.matches("#answer-input")) {
        submitFunction();
        document.querySelector("#answer-input").focus();
     }
     if (count >= 3) {
        gameOver(fly, Date.now() - timeNow);
    }

 });


 document.querySelector('#root').addEventListener('click', (e) => {
     const target = e.target;
     if (target.matches("#replay-button")) {
         count = 0;
         sum = gamePlay(fly);
         document.querySelector("#answer-input").focus();
         timeNow = Date.now();
     }
 });


