import {PropTypes} from "prop-types";
import { useEffect } from "react";
import { History } from "../components/History";
import { useGlobalState } from "../StateContext";

export function Gameover(props) {
    const stateManager = useGlobalState();
    const { setRounds, setTime, setGameState, setCount, clearMemory, setStorage, state, getTimeSpent } = stateManager;
    const { time, memory, storage, rounds, name } = state;
    const timeSpent = Date.now()-time;
    let inputVal = rounds;
    const keyArray=Object.keys(storage);
    useEffect(() =>{
        setStorage(memory);
    },[memory]);
    const handleClick = (e) => {
        setRounds(Number.parseInt(inputVal));
        setTime(Date.now());
        setGameState("play");
        clearMemory();
    };

    const handleInputChange = (e) => {
        inputVal = e.target.value; 
    };
    return (
        <div className="display">
            <p>{name} spent {state.ongoing[state.id].timeSpent} milliseconds playing </p>
            {/* <input type="number" defaultValue={rounds} 
            id="roundChanger" min='1' max='20' onChange={handleInputChange} autoFocus></input>
            <button onClick={handleClick} autoFocus>Play again?</button> */}
            <aside className="historyDisplay">
                {state.memory.map((item) => (<History { ...item } />))}
            </aside>
            {/* {keyArray.map((key) => {
                    return (
                        <div>
                            <p>{key}</p>
                            {storage[key].map( (item)=> (<History { ...item } />))}
                        </div>
                    );
            })} */}
        </div>
    );
}


Gameover.propTypes = {
    state: PropTypes.object.isRequired,
    setCount: PropTypes.func.isRequired,
    setGameState: PropTypes.func.isRequired,
    setStorage: PropTypes.func.isRequired,
    clearMemory: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired
};