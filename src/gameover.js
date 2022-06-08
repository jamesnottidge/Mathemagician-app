import {PropTypes} from "prop-types";

export function Gameover(props) {
    const timeSpent = Date.now() - props.time;

    const handleInputChange = (e) => {
        
    };

    const handleClick=(e) => {
        props.reset(document.querySelector('#roundChanger').value);
    };
    return (
        <div className="display">
            <p>You spent {timeSpent} milliseconds playing </p>
            <input type="number" defaultValue={props.count} 
            id="roundChanger" min='1' max='20' onChange={handleInputChange} autoFocus></input>
            <button onClick={handleClick} autoFocus>Play again?</button>
        </div>
    );
}


Gameover.propTypes = {
    reset: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    
};