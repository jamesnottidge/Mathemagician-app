let count = 0;
export const changeRounds = (newRounds) => ({
    type: "changeRounds",
    payload: newRounds
});

export const changeName = (name) => ({
    type: "changeName",
    payload: name
});

export const changeCount = (newCount) => ({
    type: "changeCount",
    payload: newCount
});

export const changeGameState = (newGameState) => ({
    type: "changeGameState",
    payload: newGameState
});

export const startTime = () => ({
    type: "startTime"
});

export const endTime = () => ({
    type: "endTime"
});
export const changeMemory = (memoryObject) => ({
    type: "changeMemory",
    payload: memoryObject
});

export const changeStorage = (newArray) => ({
    type: "changeStorage",
    payload: newArray
});

export const resetMemory = () => ({
    type: "resetMemory"
});

export const resetStorage = () => ({
    type: "resetStorage"
});

export const resetState = () => ({
    type: "resetState"
});

export const deleteFromOngoing = (gameId) => ({
    type: "deleteFromOngoing",
    payload: gameId
});

export const updateState = (gameId) => ({
    type: "updateState",
    payload: gameId
}); 
export const firstRender = (abool) => ({
    type: "firstRender",
    payload: abool
}); 

export const initializer = () => ({
    rounds: 3,
    name: "",
    id: null,
    playerId: null,
    count: 1,
    gameState: "start",
    firstRender: true,
    time: null,
    memory: [],
    storage: {},
    ongoing: {},
    sign: null,
    firstNum: null,
    secondNum: null,
    skipUse: 0,
    CAL: 0,
    requestState: {
        inFlight: false,
        error: null
    },
    connecting: false,
    connected: false,
    connectionError: null,
    webSocketConnection: null,
    data: []
});

export const toggleRequest = (requestState) => ({
    type: "toggleRequest",
    payload: requestState
});

export const createPostSucceeded = (gameObject) => ({
    type: "createPostSucceeded",
    payload: gameObject
});

export const answerPostSucceeded = (gameObject) => ({
    type: "answerPostSucceeded",
    payload: gameObject
});

export const changeSign = (newSign) => ({
    type: "changeSign",
    payload: newSign
});

export const changeFirstNum = (newFirstNum) => ({
    type: "changeFirstNum",
    payload: newFirstNum
});

export const changeSecondNum = (newSecondNum) => ({
    type: "changeSecondNum",
    payload: newSecondNum
});

export const changeSkipUse = (newSkipuse) => ({
    type: "changeSkipUse",
    payload: newSkipuse
});

export const onOpen = () => ({
    type: "CONNECTED",
    payload: null
});

export const onConnecting = (websocketConnection) => ({
    type: "CONNECTING",
    payload: websocketConnection
});

export const onMessage = (parsedMessage) => ({
    type: "MESSAGE_RECEIVED",
    payload: parsedMessage
});
// note that reason is an object of format {reason: string}
export const onClose = (reason) => ({
    type: "DISCONNECTED",
    payload: reason
});

const setRequestState = (state, requestState) => {
   return {...state,
    requestState: requestState};
};

const timeSpent = (state) => ({
    ...state,
    ongoing: {
        ...state.ongoing,
        [state.id]: {
            ...state.ongoing[state.id],
           timeSpent: Date.now() - state.ongoing[state.id].time
        }
    }
});

const createGame = (state, gameObject) => ({
    ...state,
    id: gameObject.id,
    sign: gameObject.nextExpression.operator,
    firstNum: gameObject.nextExpression.lhs,
    secondNum: gameObject.nextExpression.rhs,
    skipUse: gameObject.skipsRemaining,
    CAL: gameObject.nextExpression.correctAnswerLength,
    ongoing: {
        ...state.ongoing,
        [gameObject.id]: {
            name: state.name,
            id: gameObject.id,
            firstNum: gameObject.nextExpression.lhs,
            secondNum: gameObject.nextExpression.rhs,
            sign: gameObject.nextExpression.operator,
            skipUse: gameObject.skipUse,
            CAL: gameObject.nextExpression.correctAnswerLength,
            memory: [],
            time: Date.now()
        },
    },
});
const answerGame = (state, gameObject) => ({
    ...state,
    firstNum: gameObject.game.nextExpression.lhs,
    secondNum: gameObject.game.nextExpression.rhs,
    sign: gameObject.game.nextExpression.operator,
    skipUse: gameObject.game.skipsRemaining,
    CAL: gameObject.game.nextExpression.correctAnswerLength,
    ongoing: {
        ...state.ongoing,
        [gameObject.game.id]: {
            ...state.ongoing[gameObject.game.id], 
            firstNum: gameObject.game.nextExpression.lhs,
            secondNum: gameObject.game.nextExpression.rhs,
            sign: gameObject.game.nextExpression.operator,
            skipUse: gameObject.game.skipUse,
            CAL: gameObject.game.nextExpression.correctAnswerLength
        },
    },
});

const updater = (state, gameId) => {
    return {
    ...state,
    id: state.ongoing[gameId].id,
    name: state.ongoing[gameId].name,
    firstNum: state.ongoing[gameId].firstNum, 
    secondNum: state.ongoing[gameId].secondNum,
    sign: state.ongoing[gameId].sign,
    skipUse: state.ongoing[gameId].skipUse,
    CAL: state.ongoing[gameId].CAL,
    gameState: state.ongoing[gameId].gameState,
    memory: state.ongoing[gameId].memory
    };
};

const deleteOngoing = (state, gameId) => {
    const current = state.ongoing;
    delete current[gameId];
    return {
        ...state, 
        ongoing: current
    };
};
const messageReceived = (state, parsedMessage) => {
    // parsed message is an object of the format {eventName: String, payload: Object}
    if (parsedMessage.eventName === 'online-players') {
        return {
            ...state,
            data: parsedMessage.payload
        };
    } else {
        return {
            ...state,
            playerId: parsedMessage.payload.playerId
        };
    }
};

const setSign = (state, newSign) => ({
    ...state,
    sign: newSign
});

const setFirstNum = (state, newFirstNum) => ({
    ...state,
    firstNum: newFirstNum
});

const setSecondNum = (state, newSecondNum) => ({
    ...state,
    secondNum: newSecondNum
});

const setSkipuse = (state, newSkipuse) => ({
    ...state,
    skipUse: newSkipuse
});


const setRounds = (state, newRounds) => ({
    ...state, 
    rounds: newRounds
});

const setCount = (state, newCount) => {
    return {
        ...state,
        count: newCount
    };
};

const setGameState = (state, newGameState) => ({
    ...state,
    gameState: newGameState,
    ongoing: {
        ...state.ongoing,
        [state.id]: {
            ...state.ongoing[state.id],
           gameState: newGameState
        }
    }
});

const setTime = (state) => ({
    ...state,
    time: Date.now()
});

const updateMemory = (state, memoryObject) => ({
    ...state,
    memory: state.memory.concat([{...memoryObject}]),
    ongoing: {
        ...state.ongoing,
        [state.id]: {
            ...state.ongoing[state.id],
            memory: state.ongoing[state.id].memory.concat([{...memoryObject}])
        }
    }
});

const clearMemory = (state) => ({
    ...state,
    memory: []
});

const updateStorage = (state, newArray) => {
    count++;
    const key = `game${count}`;
    return {
    ...state,
    storage: {
        ...state.storage,
        [key]: newArray
    }
    };
};

const clearStorage = (state) => ({
    ...state,
    storage: {}
});

export const reducer = (state, action) => {
    switch (action.type) {
        case "changeRounds":
            return setRounds(state, action.payload);
        case "changeName":
            return {...state, name: action.payload};
        case "changeCount":
            return setCount(state, action.payload);
        case "changeGameState":
            return setGameState(state, action.payload);
        case "firstRender":
            return {...state, firstRender: action.payload};
        case "startTime":
            return setTime(state);
        case "endTime": 
            return timeSpent(state);
        case "changeMemory": 
            return updateMemory(state, action.payload);
        case "changeStorage":
            return updateStorage(state, action.payload);
        case "resetState":
            return {...state, rounds: 3, name: "", id: null, playerId: null, firstNum: null,secondNum: null,
            skipUse: 0,CAL: 0,requestState: {inFlight: false,error: null}, gameState: null, memory: [], storage: {}};
        case "deleteFromOngoing":
            return deleteOngoing(state, action.payload);
        case "updateState":
            return updater(state, action.payload);
        case "resetMemory":
            return clearMemory(state);
        case "resetStorage":
            return clearStorage(state);
        case "changeSign": 
            return setSign(state, action.payload);
        case "changeFirstNum":
            return setFirstNum(state, action.payload);
        case "changeSecondNum":
            return setSecondNum(state, action.payload);
        case "changeSkipUse":
            return setSkipuse(state, action.payload);
        case "createPostSucceeded":
            return createGame(state, action.payload);
        case "toggleRequest":
            return setRequestState(state, action.payload);
        case "answerPostSucceeded":
            return answerGame(state, action.payload);
        case "CONNECTED":
            return {...state, connected: true, connecting: false, connectionError: null};
        case "CONNECTING":
            return {...state, connected: false, connecting: true, webSocketConnection: action.payload, connectionError: null};
        case "MESSAGE_RECEIVED":
            return messageReceived(state, action.payload); 
        case "DISCONNECTED":
            return {...state, connecting: false, connected: false, connectionError: action.payload};
        default:
            throw new Error("Invalid reducer usage");
    }
};

