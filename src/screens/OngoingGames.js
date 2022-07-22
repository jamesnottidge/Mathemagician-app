import { Link } from "react-router-dom";
import { useGlobalState } from "../StateContext";

export const OngoingGames = (props) => {
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
                            <Link to={`/games/${key}`}>
                                <button onClick = {() => updateState(key)}>
                                    Game {key}
                                </button> 
                            </Link> : null
                        );
                    }
                })
            }
        </section>
    );
};