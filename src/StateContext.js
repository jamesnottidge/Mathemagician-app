import { createContext, useReducer, useContext } from "react";
import useReducerWithMiddleware from "./hooks/useReducerWithMiddleware";
import LoggingMiddleware from "./loggingMiddleware";
import {
    reducer, 
    changeRounds,
    changeName,
    changeGameState,
    startTime,
    endTime,
    changeMemory, 
    changeStorage,
    resetMemory,
    deleteFromOngoing as deleteOngoing, 
    resetStorage,
    initializer,
    changeSign,
    changeFirstNum,
    changeSecondNum,
    changeSkipUse,
    toggleRequest,
    createPostSucceeded,
    answerPostSucceeded,
    onOpen as open,
    onConnecting as connecting,
    onMessage as message,
    onClose as onclose,
    resetState as reset,
    updateState as updates
} from "./logicContainers/appReducer";


export const StateContext = createContext();
export const useGlobalState = () => useContext(StateContext);

export const StateProvider = ({ children}) => {
const [state, dispatch] = useReducerWithMiddleware([LoggingMiddleware], reducer, undefined, initializer);
const resetState = () => dispatch(reset());
const deleteFromOngoing = (gameId) => dispatch(deleteOngoing(gameId));
const updateState = (gameObject) => dispatch(updates(gameObject));
const setRounds = (rounds) => dispatch(changeRounds(rounds));
const setName = (name) => dispatch(changeName(name));
const setGameState = (gameState) => dispatch(changeGameState(gameState));
const getTimeSpent = () => dispatch(endTime());
const setTime = () => dispatch(startTime());
const setMemory = (memoryObject) => dispatch(changeMemory(memoryObject));
const clearMemory = () => dispatch(resetMemory());
const clearStorage = () => dispatch(resetStorage());
const setStorage = (memory) => dispatch(changeStorage(memory));
const setSign = (sign) => dispatch(changeSign(sign));
const setFirstNum = (newFirstNum) => dispatch(changeFirstNum(newFirstNum));
const setSecondNum = (newSecondNum) => dispatch(changeSecondNum(newSecondNum));
const setSkipUse = (newSkipUse) => dispatch(changeSkipUse(newSkipUse));
const setRequestState = (requestState) => dispatch(toggleRequest(requestState));
const createSucceeded = (gameObject) => dispatch(createPostSucceeded(gameObject));
const answerSucceeded = (gameObject) => dispatch(answerPostSucceeded(gameObject));
const onOpen = () => dispatch(open());
const onConnecting = (websocketconnection) => dispatch(connecting(websocketconnection));
const onMessage = (parsedMessage) => dispatch(message(parsedMessage));
const onClose = (reason) => dispatch(onclose(reason)); 

const stateManager = {
    state, 
    setRounds,
    setName,
    setGameState,
    deleteFromOngoing, 
    setTime,
    getTimeSpent,
    setMemory,
    resetState,
    updateState,
    clearMemory,
    clearStorage,
    setStorage,
    setSign,
    setFirstNum,
    setSecondNum,
    setSkipUse,
    setRequestState,
    createSucceeded,
    answerSucceeded,
    onOpen,
    onConnecting,
    onMessage,
    onClose
   
};

return (
    <StateContext.Provider value = {stateManager}>
        { children }
    </StateContext.Provider>
);

};