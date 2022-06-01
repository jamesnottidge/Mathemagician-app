export class Display {
    render(state, valA, valB) {
        switch (state) {
            case "setup":
                document.querySelector('#root').innerHTML= `<div class='container'>
                <p class='expression'>Welcome!</p>
                <button class='start-button'>START</button>
            </div>`;
            break;
            case "play":
                document.querySelector('#root').innerHTML=`<div class='container'>
                <p class='expression'>${valA} + ${valB}</p>
                <input type=text autofocus="true" id='answer-input'>
                <p id='wrong-answer'></p>
            </div>`;
            break;
            case "end":
                document.querySelector('#root').innerHTML=`
                <div class='container'>
                <p class='expression'>You spent ${valA} milliseconds</p>
                <button class='start-button'>REPLAY?</button>
                </div>`;
            break;
            case "wrongAnswer": 
                if (valA.trim()=='') {
                    document.querySelector('#wrong-answer').innerHTML=`Answer the question`;
                } else {
                    document.querySelector('#wrong-answer').innerHTML=`${valA} is not the Answer`;
                }
            break;

        }
        document.querySelector("#answer-input") ? document.querySelector("#answer-input").focus() : 
        document.querySelector(".start-button").focus();
    } 
    
}

       
