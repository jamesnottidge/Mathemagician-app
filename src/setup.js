import {PropTypes} from "prop-types";

export function Setup(props) {

    const handleClick = () => {
        props.start(1);
        props.time();
    };

    return (
        <div className="display">
            <p>Hi, this is James' math game, choose your parameters and get to calculating!</p>
            <input type="number" min="1" max="20" value={props.rounds} onChange = {props.setrounds} autoFocus></input>
            <div>
                <button onClick={handleClick}>Start</button>
            </div>
        </div>
    );
}

Setup.propTypes = {
    rounds: PropTypes.string.isRequired,
    setrounds: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    time: PropTypes.func.isRequired
};