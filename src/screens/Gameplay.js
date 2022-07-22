import {useState, useEffect, useReducer, useContext} from "react";
import {PropTypes} from "prop-types";
import { evaluate } from "../utils/signs";
import { connect as defaultConnectWebSocket} from "../WebSocket";
import { ServerContext } from "../ServerContext";
import { useGlobalState } from "../StateContext";
import { useNavigate, useParams } from "react-router-dom";

export function Gameplay(props) {
    const server = useContext(ServerContext);
    const navigate = useNavigate();
    const stateManager = useGlobalState();
    const { setRequestState, createSucceeded, answerSucceeded, onOpen, onConnecting, updateState, getTimeSpent,
        onMessage, onClose, state, setGameState, resetState, setMemory, clearStorage, clearMemory, deleteFromOngoing } = stateManager;


    useEffect(() => {
        const websocketconnection = 
        (props.connectWebSocket || defaultConnectWebSocket)({onOpen, onClose, onMessage, parameters: {playerName: state.name}});
        onConnecting(websocketconnection);
        return () => websocketconnection.close();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const skip = () => {
        setRequestState({inFlight: true, error: null});
                server.answerGame(state.id, "skip").then(
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
        if (!state.requestState.inFlight) {
            const answer = evaluate(state.firstNum, state.secondNum, state.sign);
            const input = Number.parseInt(e.target.value);
            if (state.CAL === input.toString().length) {
                e.target.value = "";
                setRequestState({inFlight: true, error: null});
                server.answerGame(state.id, input).then(
                (response) => {
                    setMemory({
                        firstNum: state.firstNum,
                        secondNum: state.secondNum,
                        answer: response.move.correct,
                        sign: state.sign,
                        value: input,
                        time: response.move.timeSpentMillis,
                        speed: Math.floor(response.move.timeSpentMillis/1000) < 3
                    });
                    if (response.game.nextExpression === null) {
                        setRequestState({inFlight: false, error: null});
                        setGameState("end");
                        getTimeSpent();
                        return;
                    }
                    setRequestState({inFlight: false, error: null});
                    answerSucceeded(response);
                    
                }
                ).catch( 
                    (error) => {
                        setRequestState({inFlight: false, error: error.message});
                    }
                );
            }
        }
    };

    const handleDisconnect = async () => {  
        resetState();
        state.webSocketConnection.close();
        navigate(`/createGame`);
        deleteFromOngoing(state.id);
    };
    return (
        <div className="display">

        { state.error != null ? 
            <p> ERROR!!</p> : state.requestState.inFlight ? <p>Loading...</p> :
            <>
        {!state.connectionError ? <button onClick = {handleDisconnect}>
                { state.connecting ? <span>connecting...</span> : <span>disconnect</span> }
            </button> : state.connectionError.reason === 'player-name-taken'? <span>Player Name Taken</span> : null}
            {state.data.map((key) => {
                    return (
                        <p>
                            <span>{key.name}</span>
                            { key.id === state.playerId ? <span>(you)</span> : null}
                        </p>


                    );
                })}
            <p>{state.firstNum} {state.sign} {state.secondNum}</p>
            <form onSubmit={handleSubmit}>
                <input type="number" onChange={handleInputChange} autoFocus />
            </form>
        {state.skipUse > 0 ? <button onClick={skip} >Skip</button> : null }
        </>}

        </div>
    );
}

// Gameplay.propTypes = {
//     state: PropTypes.object.isRequired,
//     setCount: PropTypes.func.isRequired,
//     setGameState: PropTypes.func.isRequired,
//     setStorage: PropTypes.func.isRequired,
//     setMemory: PropTypes.func.isRequired
// };