import { Link } from "react-router-dom";
import { useGlobalState } from "../StateContext";

export const Players = (props) => {
    const stateManager= useGlobalState();
    const { state, updateState } = stateManager;
    const keyArray=Object.keys(state.ongoing);
    return (
        <section className="display">
            {
                keyArray.map( (key) => {
                    if (key != "null") {
                        return (
                            state.ongoing[key].gameState!="end" ?
                            <p>{state.ongoing[key].name}</p>: null
                        );
                    }
                })
            }
        </section>
    );
};