(function () {
        'use strict';

        class Display {
          static create(valA, valB, fly) {
            fly.innerHTML = `<div id = "display-div"><p class = "display-paragraph">${valA} + ${valB}</p></div>
                <input type = "text" id = "answer-input">`;
            document.querySelector('#root').appendChild(fly);
          }

        }

        const sum$1 = (a, b) => {
          return a + b;
        };

        const gamePlay = fly => {
          const valA = Math.floor(Math.random() * 10);
          const valB = Math.floor(Math.random() * 10);
          Display.create(valA, valB, fly);
          return sum$1(valA, valB);
        };

        const gameOver = (fly, timeSpent) => {
          // eslint-disable-next-line max-len
          fly.innerHTML = `<p id = "game-over">GAME OVER</p><p>You spent ${timeSpent} milliseconds playing.<br><button id = "replay-button">Replay?</button>`;
        };

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

        var css_248z = "body{\n    font-size: 16px;\n    height: 100vh;\n}\n#root{\n    font-size: 2em;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    min-height: 100%;\n}\n.display-paragraph{\n    display: flex;\n    justify-content: center;\n}\n#game-over{\n    display: flex;\n    justify-content: center;\n}\n#replay-button{\n    margin: 1rem auto;\n    display: block;\n}\n.stylish{\n    background-color: rgba(222, 165, 78, 0.501);\n    border-radius: 0.6rem;\n    padding: 1.5rem;\n}";
        styleInject(css_248z);

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

        document.querySelector('#root').addEventListener('keyup', e => {
          const target = e.target;

          if (target.matches("#answer-input")) {
            submitFunction();
            document.querySelector("#answer-input").focus();
          }

          if (count >= 3) {
            gameOver(fly, Date.now() - timeNow);
          }
        });
        document.querySelector('#root').addEventListener('click', e => {
          const target = e.target;

          if (target.matches("#replay-button")) {
            count = 0;
            sum = gamePlay(fly);
            document.querySelector("#answer-input").focus();
            timeNow = Date.now();
          }
        });

})();
//# sourceMappingURL=app.js.map
