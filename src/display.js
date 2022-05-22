export class Display {
        static create(valA, valB, fly) {
                fly.innerHTML = `<div id = "display-div"><p class = "display-paragraph">${valA} + ${valB}</p></div>
                <input type = "text" id = "answer-input">`;
                document.querySelector('#root').appendChild(fly);
        }
}