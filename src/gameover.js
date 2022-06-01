import {PropTypes} from "prop-types";

export function Gameover(props) {
    const timeSpent = Date.now() - props.time;
    const handleClick = () => {
        props.start(0);
    };
    return (
        <div className="display">
            <p>You spent {timeSpent} milliseconds playing </p>
            <button onClick={handleClick} autoFocus>Play again?</button>
        </div>
    );
}


Gameover.PropTypes = {
    start: PropTypes.func.isRequired,
    time: PropTypes.func.isRequired
};