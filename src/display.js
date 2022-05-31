export class Display {
    // constructor() {

    // }
    render(state, valA, valB) {
        switch(state){
            case 1:
                document.querySelector('#root').innerHTML= `<div class='container'>
                <p class='expression'>Welcome!</p>
                <button class='start-button'>START</button>
            </div>`;
            break;
            case 2:
                document.querySelector('#root').innerHTML=`<div class='container'>
                <p class='expression'>${valA} + ${valB}</p>
                <input type=text autofocus="true" id='answer-input'>
                <p id='wrong-answer'></p>
            </div>`
            break;
            case 3:
                document.querySelector('#root').innerHTML=`
                <div class='container'>
                <p class='expression'>You spent ${valA} milliseconds</p>
                <button class='start-button'>REPLAY?</button>
                </div>`
            break;
            case 4: 
                if(valA.trim()==''){
                    document.querySelector('#wrong-answer').innerHTML=`Answer the question`;
                }else{ggg
                document.querySelector('#wrong-answer').innerHTML=`${valA} is not the Answer`;
                }
            break;

        
        
    }
    document.querySelector("#answer-input") ? document.querySelector("#answer-input").focus() : document.querySelector(".start-button").focus();
    } 
    
}

       


       

       
