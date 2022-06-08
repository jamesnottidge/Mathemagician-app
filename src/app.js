import {Setup} from "./setup";
import {Gameplay} from "./gameplay";
import react, {useState} from "react";
import {Gameover} from "./gameover";
import {PropTypes} from "prop-types";
import {Game} from "./game";

export function App(props) {
    const [rounds, setRounds] = useState(1);
    const [mode, setMode] = useState(1);
    // const [time, setTime] = useState(0);
    
    const changeMode=(newMode) => {
        setMode(newMode);
    };
    
    const changeRounds=(newNumberOfRounds) => {
        setRounds(newNumberOfRounds);
    };

    switch (mode) {
        case 1:
            return <Setup changeMode={changeMode} changeRounds={changeRounds} rounds={rounds}/>;
        case 2:
            return <Game rounds={rounds} changeRounds={changeRounds}/>;
    }
    
    }


App.propTypes = {

};
