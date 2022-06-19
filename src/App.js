import {GameStart} from "./screens/GameStart";
import {Gameplay} from "./screens/Gameplay";
import react, {useState} from "react";
import {Gameover} from "./screens/Gameover";
import {PropTypes} from "prop-types";
import { History } from "./components/History";
export function App(props) {
    const [rounds, setRounds] = useState(1);
    const [count, setCount] = useState(1);
    const [gameState, setGameState] = useState(game.start);
    const [time, setTime] = useState(null);
    const [memory, setMemory] = useState([]);

    const game = {
        start: "start",
        play: "play",
        end: "end"
    };
    
    return (
        <div>
            <ul class="historyDisplay">
                {memory.map((item) => (<History { ...item } />))
                }
            </ul>
            {gameState === game.start && <GameStart rounds={rounds} setRounds={setRounds} setGameState={setGameState} setTime={setTime}/> }

            {gameState === game.play && <Gameplay rounds={rounds} count={count}
             setCount={setCount} setGameState={setGameState} memory={memory} setMemory={setMemory}/>
            }

            {gameState === game.end && <Gameover time={time} rounds={rounds} setRounds={setRounds} 
            setTime={setTime} setGameState={setGameState} count={count} setCount={setCount} setMemory={setMemory}/>}
        </div>
    );
    
}
