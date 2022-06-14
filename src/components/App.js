import {GameStart} from "../screens/GameStart";
import {Gameplay} from "../screens/Gameplay";
import react, {useState} from "react";
import {Gameover} from "../screens/Gameover";
import {PropTypes} from "prop-types";
import { History } from "./History";
export function App(props) {
    const [rounds, setRounds] = useState(1);
    const [count, setCount] = useState(1);
    const [gameState, setGameState] = useState("start");
    const [time, setTime] = useState(null);
    const [memory, setMemory] = useState([]);
    
    return (
        <div>
            <div class="historyDisplay">
                {memory.map((item) => (<History firstNum={item.firstNum} secondNum={item.secondNum} answer={item.answer}
                time={item.time} value={item.value} sign={item.sign} speed={item.speed}/>))
                }
            </div>
            {gameState === "start" && <GameStart rounds={rounds} setRounds={setRounds} setGameState={setGameState} setTime={setTime}/> }

            {gameState === "play" && <Gameplay rounds={rounds} count={count}
             setCount={setCount} setGameState={setGameState} memory={memory} setMemory={setMemory}/>
            }

            {gameState === "end" && <Gameover time={time} rounds={rounds} setRounds={setRounds} 
            setTime={setTime} setGameState={setGameState} count={count} setCount={setCount} setMemory={setMemory}/>}
        </div>
    );
    
}
