import {PropTypes} from "prop-types";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetState } from "../logicContainers/appReducer";
import { ServerContext } from "../ServerContext";
import { useGlobalState } from "../StateContext";

export function GameStart(props) {
    const stateManager = useGlobalState();
    const server = useContext(ServerContext);
    const { state, setRounds, setGameState, setName, setTime, setRequestState, createSucceeded, resetState } = stateManager;
    const { rounds, name } = state;

    const navigate = useNavigate();
    const handleClick = () => {
        setRequestState({inFlight: true, error: "flyer"});
        server.createGame("mathemagician", state.rounds).then(
            (response) => {
                setRequestState({inFlight: false, error: null});
                createSucceeded(response);
                navigate(`/games/${response.id}`);
                setGameState("play");
            }).catch( 
            (error) => {
                setRequestState({inFlight: false, error: error.message});
            }
        );
        setTime(Date.now());
    };
    const handleInputChange=(e)=>{
        setRounds(Number.parseInt(e.target.value));
    };

    const handleNameChange=(e) =>{
        setName(e.target.value);
    };
    
    return (
        <div className="display">
            <label for="nameInput">Name: </label>
            <input type="text" id="nameInput" value={name} onChange={handleNameChange}></input>
            <label for="roundsInput">Rounds:</label>
            <input id = "roundsInput" type="number" min="1" max="20" value={rounds}
            onChange = {handleInputChange} autoFocus></input>
            <div>
                <button onClick={handleClick}>Start</button>
            </div>
        </div>
    );
}

GameStart.propTypes = {
   state: PropTypes.object.isRequired
};