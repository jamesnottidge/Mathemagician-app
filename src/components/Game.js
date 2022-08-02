import { useGlobalState } from "../StateContext";
import { History } from "./History";
import { Gameplay } from "../screens/Gameplay";
import { Gameover } from "../screens/Gameover";

export const Game = (props) => {
    const stateManager = useGlobalState();
    const game = {
        start: "start",
        play: "play",
        end: "end"
    };
    const { state } = stateManager;
    return (
        <section>
            {
                state.gameState === game.play && 
                    <>
                        <Gameplay connectWebSocket = {props.connectWebSocket} />
                        <aside className="historyDisplay">
                            {state.memory.map((item) => (<History { ...item } />))}
                        </aside>
                    </>
            } 

            {state.gameState === game.end && <>
                <Gameover />
                
                </>}
        </section>
    );
};