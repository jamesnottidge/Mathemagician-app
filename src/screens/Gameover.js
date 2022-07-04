import {PropTypes} from "prop-types";
import { useEffect } from "react";
import { History } from "../components/History";

export function Gameover(props) {

    const { setRounds, setTime, setGameState, setCount, clearMemory, setStorage, state } = props;
    const { time, count, memory, storage } = state;
    const timeSpent = Date.now()-time;
    let inputVal=count; 
    const keyArray=Object.keys(storage);
    useEffect(() =>{
        setStorage(memory);
    },[memory]);
    const handleClick = (e) => {
        setCount(1);
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
            <p>You spent {timeSpent} milliseconds playing </p>
            <input type="number" defaultValue={count} 
            id="roundChanger" min='1' max='20' onChange={handleInputChange} autoFocus></input>
            <button onClick={handleClick} autoFocus>Play again?</button>
            {keyArray.map((key) => {
                    return (
                        <div>
                            <p>{key}</p>
                            {storage[key].map( (item)=> (<History { ...item } />))}
                        </div>
                    );
                })}
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