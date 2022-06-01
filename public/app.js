(function () {
  'use strict';

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "body{\n    height: 100vh;\n}\n.expression{\n    display: flex;\n    justify-content: center;\n}\n#root{\n    font-size: 2em;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100%;\n}\n.start-button{\n    margin: 1rem auto;\n    display: block;\n}\n.container{\n    background-color: rgba(222, 165, 78, 0.501);\n    border-radius: 0.6rem;\n    padding: 1.5rem;\n}\n#wrong-answer{\n    width: fit-content;\n    margin: auto;\n    color: red;\n    font-size: 0.7rem;\n}";
  styleInject(css_248z);

  class Display {
    render(state, valA, valB) {
      switch (state) {
        case "setup":
          document.querySelector('#root').innerHTML = `<div class='container'>
                <p class='expression'>Welcome!</p>
                <button class='start-button'>START</button>
            </div>`;
          break;

        case "play":
          document.querySelector('#root').innerHTML = `<div class='container'>
                <p class='expression'>${valA} + ${valB}</p>
                <input type=text autofocus="true" id='answer-input'>
                <p id='wrong-answer'></p>
            </div>`;
          break;

        case "end":
          document.querySelector('#root').innerHTML = `
                <div class='container'>
                <p class='expression'>You spent ${valA} milliseconds</p>
                <button class='start-button'>REPLAY?</button>
                </div>`;
          break;

        case "wrongAnswer":
          if (valA.trim() == '') {
            document.querySelector('#wrong-answer').innerHTML = `Answer the question`;
          } else {
            document.querySelector('#wrong-answer').innerHTML = `${valA} is not the Answer`;
          }

          break;
      }

      document.querySelector("#answer-input") ? document.querySelector("#answer-input").focus() : document.querySelector(".start-button").focus();
    }

  }

  class Game {
    constructor() {
      this.sum = 0;
      this.gameLevel = 0;
      this.time = 0;
      this.display = new Display();
    }

    play() {
      const valA = Math.floor(Math.random() * 10);
      const valB = Math.floor(Math.random() * 10);
      this.sum = valA + valB;
      this.gameLevel++;
      this.display.render("play", valA, valB);
    }

    end() {
      this.display.render("end", Date.now() - this.time);
      this.gameLevel = 0;
      this.time = 0;
      this.sum = 0;
    }

    start() {
      this.time = Date.now();
      this.play();
    }

    validateAnswer(value) {
      if (value == this.sum && this.gameLevel < 3) {
        this.play();
      } else if (value == this.sum && this.gameLevel >= 3) {
        this.end();
      } else {
        this.display.render("wrongAnswer", value);
      }
    }

  }

  const game = new Game();
  const display = new Display();
  display.render("setup");
  document.querySelector('#root').addEventListener('keyup', e => {
    const target = e.target;

    if (target.matches("#answer-input")) {
      game.validateAnswer(document.querySelector('#answer-input').value);
    }
  });
  document.querySelector('#root').addEventListener('click', e => {
    const target = e.target;

    if (target.matches(".start-button")) {
      game.start();
    }
  });

})();
//# sourceMappingURL=app.js.map
