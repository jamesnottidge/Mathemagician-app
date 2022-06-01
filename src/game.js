import {Setup} from "./setup";
import {Gameplay} from "./gameplay";
import react, {useState} from "react";
import {Gameover} from "./gameover";
import {PropTypes} from "prop-types";

export function Game(props) {
    const [rounds, setRounds] = useState(1);
    const [mode, setMode] = useState(0);
    const [time, setTime] = useState(0);
    
    const onChange = (e) => {
        setRounds(e.target.value);
    };

    const start = (count) => {
        setMode(count);
    };
    
    const timer = () => {
        setTime(Date.now());
    };
    if (mode===0) {
        return (
            <Setup rounds = {rounds} setrounds = {onChange} start = {start} time = {timer}/>
        );
    } else if (mode===1) {
        return (
            <Gameplay rounds = {rounds} start = {start}/>
        );
    } else if (mode===2) {
        return (
            <Gameover start = {start} time = {time}/>
        );
    }
}

Game.PropTypes = {

};
