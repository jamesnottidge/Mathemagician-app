import {PropTypes} from "prop-types";
import { useState } from "react";

export function Gameover(props) {

    const { time, rounds, setRounds, setTime, setGameState, setCount, count, setMemory } = props;
    const timeSpent = Date.now()-time;
    let inputVal=count;
    const handleClick = (e) => {
        setCount(1);
        setRounds(Number.parseInt(inputVal));
        setTime(Date.now());
        setGameState("play");
        setMemory([]);
    };

    const handleInputChange = (e) => {
        inputVal = e.target.value; 
    }
    return (
        <div className="display">
            <p>You spent {timeSpent} milliseconds playing </p>
            <input type="number" defaultValue={count} 
            id="roundChanger" min='1' max='20' onChange={handleInputChange} autoFocus></input>
            <button onClick={handleClick} autoFocus>Play again?</button>
        </div>
    );
}


Gameover.propTypes = {
    reset: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    
};