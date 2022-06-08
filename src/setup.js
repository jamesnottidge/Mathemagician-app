import {PropTypes} from "prop-types";

export function Setup(props) {

    const handleClick = () => {
        props.changeMode(2);
    };

    const handleChange=(e)=>{
        props.changeRounds(e.target.value);
    }
    return (
        <div className="display">
            <p>Hi, this is James' math game, choose your parameters and get to calculating!</p>
            <input type="number" min="1" max="20" value={props.rounds} 
            onChange = {handleChange} autoFocus></input>
            <div>
                <button onClick={handleClick}>Start</button>
            </div>
        </div>
    );
}

Setup.propTypes = {
    rounds: PropTypes.number.isRequired,
    changeMode: PropTypes.func.isRequired,
    changeRounds: PropTypes.func.isRequired
};