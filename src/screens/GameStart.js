import {PropTypes} from "prop-types";

export function GameStart(props) {

const { state, setRounds, setGameState, setTime } = props;

const { rounds } = state;

    const handleClick = () => {
        setGameState("play");
        setTime(Date.now());
    };

    const handleChange=(e)=>{
        setRounds(Number.parseInt(e.target.value));
    };
    return (
        <div className="display">
            <p>Hi, this is James' math game, choose your parameters and get to calculating!</p>
            <input type="number" min="1" max="20" value={rounds} 
            onChange = {handleChange} autoFocus></input>
            <div>
                <button onClick={handleClick}>Start</button>
            </div>
        </div>
    );
}

GameStart.propTypes = {
   state: PropTypes.object.isRequired
};