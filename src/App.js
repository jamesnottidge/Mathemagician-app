import {GameStart} from "./screens/GameStart";
import {Gameplay} from "./screens/Gameplay";
import react, {useReducer, useState} from "react";
import {Gameover} from "./screens/Gameover";
import {PropTypes} from "prop-types";
import { History } from "./components/History";
import {
    reducer, 
    changeRounds,
    changeCount,
    changeGameState,
    startTime,
    changeMemory, 
    changeStorage,
    resetMemory,
    initializer
} from "./logicContainers/appReducer";
import { createServer } from "./ServerAPI";
import { ServerContext } from "./ServerContext";
export function App(props) {
    const [state, dispatch] = useReducer(reducer, undefined, initializer);
    const game = {
        start: "start",
        play: "play",
        end: "end"
    };
    const setRounds = (rounds) => dispatch(changeRounds(rounds));
    const setGameState = (gameState) => dispatch(changeGameState(gameState));
    const setTime = () => dispatch(startTime());
    const setCount = (newCount) => dispatch(changeCount(newCount));
    const setMemory = (memoryObject) => dispatch(changeMemory(memoryObject));
    const clearMemory = () => dispatch(resetMemory());
    const setStorage = (memory) => dispatch(changeStorage(memory));

    return (
        <ServerContext.Provider value={createServer()} >
            <main>
                {state.gameState === game.start &&
                <GameStart state={state} 
                setRounds={setRounds} setGameState={setGameState} setTime={setTime}/> 
            
                }

                {state.gameState === game.play && 
                <>
                    <Gameplay state={state} setCount={setCount} setGameState={setGameState} setMemory={setMemory} setStorage={setStorage} />
                    <aside className="historyDisplay">
                        {state.memory.map((item) => (<History { ...item } />))}
                    </aside>
                </>
                }

                {state.gameState === game.end && <>
                <Gameover setRounds={setRounds} setTime={setTime} setGameState={setGameState} setCount={setCount} 
                clearMemory={clearMemory} setStorage={setStorage} state={state}/>
                
                </>}
            </main>
        </ServerContext.Provider>
    );
    
}
