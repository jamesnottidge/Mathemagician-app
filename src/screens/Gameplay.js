import {useState, useEffect, useReducer, useContext} from "react";
import {PropTypes} from "prop-types";
import { signsRef, evaluate } from "../utils/signs";
import useReducerWithMiddleware from "../hooks/useReducerWithMiddleware";
import LoggingMiddleware from "../loggingMiddleware";
import {
    reducer, 
    changeSign,
    changeFirstNum,
    changeSecondNum,
    changeSkipUse,
    toggleRequest,
    createPostSucceeded,
    answerPostSucceeded,
    initializer
} from "../logicContainers/gamePlayReducer";
import { ServerContext } from "../ServerContext";

export function Gameplay(props) {
const { state, setCount, setGameState, setMemory } = props;
const {rounds} = state;

const server = useContext(ServerContext);
// const [subState, dispatchSub] = useReducer(reducer, undefined, initializer);
const [subState, dispatchSub] = useReducerWithMiddleware([LoggingMiddleware], reducer, undefined, initializer);
const time = Date.now();

const setSign = (sign) => dispatchSub(changeSign(sign));
const setFirstNum = (newFirstNum) => dispatchSub(changeFirstNum(newFirstNum));
const setSecondNum = (newSecondNum) => dispatchSub(changeSecondNum(newSecondNum));
const setSkipUse = (newSkipUse) => dispatchSub(changeSkipUse(newSkipUse));
const setRequestState = (requestState) => dispatchSub(toggleRequest(requestState));
const createSucceeded = (gameObject) => dispatchSub(createPostSucceeded(gameObject));
const answerSucceeded = (gameObject) => dispatchSub(answerPostSucceeded(gameObject));

useEffect(() => { 
    if (!subState.requestState.inFlight) {
        setRequestState({inFlight: true, error: "flyer"});
        server.createGame("mathemagician", rounds).then(
            (response) => {
                createSucceeded(response);
                setRequestState({inFlight: false, error: null});
            }
        ).catch( 
            (error) => {
                setRequestState({inFlight: false, error: error.message});
            }
        );
    }
}, []);
const handleSubmit = (e) => {
    e.preventDefault();
};

const skip = () => {
    setRequestState({inFlight: true, error: null});
            server.answerGame(subState.id, "skip").then(
            (response) => {
                answerSucceeded(response);
                setRequestState({inFlight: false, error: null});
            }
        ).catch( 
            (error) => {
                setRequestState({inFlight: false, error: error.message});
            }
        );
};

const handleInputChange=(e) => {
    if (!subState.requestState.inFlight) {
        const answer = evaluate(subState.firstNum, subState.secondNum, subState.sign);
        const input = Number.parseInt(e.target.value);
        if (subState.CAL === input.toString().length) {
            // setMemory({
            //     firstNum: subState.firstNum,
            //     secondNum: subState.secondNum,
            //     answer: answer,
            //     sign: subState.sign,
            //     value: input,
            //     time: Date.now()-time,
            //     speed: Math.floor((Date.now()-time)/1000) < 3
            // });
            e.target.value = "";
            setRequestState({inFlight: true, error: null});
            server.answerGame(subState.id, input).then(
            (response) => {
                setMemory({
                    firstNum: subState.firstNum,
                    secondNum: subState.secondNum,
                    answer: response.move.correct,
                    sign: subState.sign,
                    value: input,
                    time: response.move.timeSpentMillis,
                    speed: Math.floor(response.move.timeSpentMillis/1000) < 3
                });
                if (response.game.nextExpression === null) {
                    setGameState("end");
                    return;
                }
                answerSucceeded(response);
                setRequestState({inFlight: false, error: null});
            }
            ).catch( 
                (error) => {
                    setRequestState({inFlight: false, error: error.message});
                }
            );
        }
    }
};
        return (
        <div className="display">

           { subState.error != null ? 
            <p>ERROR!!</p> : subState.requestState.inFlight ? <p>Loading...</p> :
            <>
            <p>{subState.firstNum} {subState.sign} {subState.secondNum}</p>
            <form onSubmit={handleSubmit}>
                <input type="number" onChange={handleInputChange} autoFocus />
            </form>
           {subState.skipUse > 0 ? <button onClick={skip} >Skip</button> : null }
           </>}
 
        </div>
    );
}

Gameplay.propTypes = {
    state: PropTypes.object.isRequired,
    setCount: PropTypes.func.isRequired,
    setGameState: PropTypes.func.isRequired,
    setStorage: PropTypes.func.isRequired,
    setMemory: PropTypes.func.isRequired
};