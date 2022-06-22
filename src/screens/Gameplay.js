import {useState, useEffect} from "react";
import {PropTypes} from "prop-types";
import { signsRef, evaluate } from "../utils/signs";

export function Gameplay(props) {
const { count, rounds, setCount, setGameState, memory, setMemory, setStorage} = props;

const [sign, setSign] = useState(null);
const [firstNum, setFirstNum] = useState(null);
const [secondNum, setSecondNum] = useState(null);
const [skipUse, setSkipUse] = useState(0);
const time = Date.now();
useEffect(() => {
    generateExpression(); 
}, []);
const generateExpression = () => {
    setSign(signsRef[Math.floor(Math.random() * signsRef.length)]);
    setFirstNum(Math.floor(Math.random() * 20));
    setSecondNum(Math.floor(Math.random() * 20));
};

const handleSubmit = (e) => {
    e.preventDefault();
}

const skip = () => {
    setSkipUse(skipUse + 1);
    setCount(count + 1);
    generateExpression();
};

const handleInputChange=(e) => {
    const answer = evaluate(firstNum, secondNum, sign);
    const input = Number.parseInt(e.target.value);
    if (answer.toString().length === input.toString().length && count < rounds) {
        setMemory({
            firstNum: firstNum,
            secondNum: secondNum,
            answer: answer,
            sign: sign,
            value: input,
            time: Date.now()-time,
            speed: Math.floor((Date.now()-time)/1000) < 3
        });
        e.target.value = "";
        setCount(count + 1);
        generateExpression();
    } else if (answer.toString().length === input.toString().length && count == rounds) {
        setMemory({
            firstNum: firstNum,
            secondNum: secondNum,
            answer: answer,
            sign: sign,
            value: input,
            time: Date.now()-time,
            speed: Math.floor((Date.now()-time)/1000) < 3
        });
        setSkipUse(0);
        setGameState("end");
    }
};

    return (
        <div className="display">
            <p>{firstNum} {sign} {secondNum}</p>
            <form onSubmit={handleSubmit}>
                <input type="number" onChange={handleInputChange} autoFocus />
            </form>
           {skipUse < Math.floor(rounds/3) ? <button onClick={skip} >Skip</button> : null}
        </div>
    );
}

Gameplay.propTypes = {
    rounds: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    setCount: PropTypes.func.isRequired,
    setGameState: PropTypes.func.isRequired
};