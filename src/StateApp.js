import {Welcome} from "./screens/Welcome";
import {GameStart} from "./screens/GameStart";
import {Gameplay} from "./screens/Gameplay";
import react, {useContext, useReducer, useState} from "react";
import {Gameover} from "./screens/Gameover";
import { History } from "./components/History";
import { createServer } from "./ServerAPI.js";
import { ServerContext } from "./ServerContext";
import { useGlobalState } from "./StateContext";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OngoingGames } from "./screens/OngoingGames";
import { FinishedGames } from "./screens/FinishedGames";
import { Game } from "./components/Game";
import { Players } from "./screens/Players";
export function StateApp(props) {
 
    return (
            <ServerContext.Provider value={createServer()} >
                <main>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Welcome />}/>
                        <Route path="/createGame" element={<GameStart/>} />
                        <Route path="*" element={<main className="display"><p>There's nothing here!</p></main>} />
                        <Route path="/ongoingGames" element={<OngoingGames/>}/> 
                        <Route path="/finishedGames" element={<FinishedGames />}/> 
                        <Route path = "/players" element = {<Players />} />
                        <Route path="/games/:gameId" element={
                            <>
                           <Game />
                        </>
                        } />
                    </Routes>
                </main>
            </ServerContext.Provider>
    );
    
}
