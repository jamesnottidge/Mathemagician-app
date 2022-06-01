import {sum} from "./sum";
import {useState} from "react";
import {PropTypes} from "prop-types";

export function Gameplay(props) {
const [count, setCount] = useState(1);
const valA = Math.floor(Math.random() * 10);
const valB = Math.floor(Math.random() * 10);   
let sign;
const expression = () => {
    const choice = Math.floor(Math.random() * 2);
    if (choice == 0) {
        sign = '+';
        return sum(valA,valB);
    } else {
        sign = '*';
        return valA * valB;
    }
};
const answer = expression();
const handleInputChange=(e) => {
    if (answer == e.target.value && count < props.rounds) {
        e.target.value = "";
        setCount(count + 1);
    } else if (answer == e.target.value && count == props.rounds) {
        props.start(2);
    }
};

    return (
        <div className="display">
            <p>{valA} {sign} {valB}</p>
            <input type="number" onChange={handleInputChange} autoFocus></input>
        </div>
    );
}

Gameplay.propTypes = {
    rounds: PropTypes.number.isRequired,
    start: PropTypes.func.isRequired
};