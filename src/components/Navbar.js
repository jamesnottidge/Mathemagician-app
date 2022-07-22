import { Link } from "react-router-dom";
import { useGlobalState } from "../StateContext";

export const Navbar = (props) => {
    const stateManager = useGlobalState();
    return (
        <navbar>
            <Link to="/">
                <button onClick={() => stateManager.resetState()}>
                    Home
                </button> 
            </Link>
            <Link to="/createGame">
                <button onClick={() => stateManager.resetState() }>
                    Create Game
                </button>
            </Link>
            <Link to="/players">
                <button onClick={() => stateManager.resetState()}>
                    Players
                </button>
            </Link>
            <Link to="/ongoingGames">
                <button onClick={() => stateManager.resetState()}>
                    Ongoing Games
                </button>
            </Link>
            <Link to="/finishedGames">
                <button onClick={() => stateManager.resetState()}>
                    Finished Games
                </button>
            </Link>
        </navbar>
    );
};