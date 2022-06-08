import {useState} from "react";
import {Gameover} from "./gameover";
import {Gameplay} from "./gameplay";
import {PropTypes} from "prop-types";

export function Game(props) {
    const [mode,setMode] =useState(1);
    const [count,setCount]=useState(1);
    const [time, setTime]=useState(Date.now());

    const changeCount=(newCount) => {
        setCount(newCount);
    };

    const changeMode=(newMode) => {
        setMode(newMode);
    }

    const reset= (rounds) => {
        if (document.querySelector('#roundChanger').value!='') {
            props.changeRounds(rounds);
        }
        changeMode(1);
        changeCount(1);
        setTime(Date.now());
    }


    switch (mode) {
        case 1:
            return <Gameplay rounds={props.rounds} count={count} changeCount={changeCount} changeMode={changeMode}/>;
        case 2:
            return <Gameover time={time} reset={reset} count={count}/>;
    }
}

Game.propTypes ={
    rounds: PropTypes.number.isRequired,
    changeRounds: PropTypes.func.isRequired
}