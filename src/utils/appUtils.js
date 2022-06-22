let count = 0;
export const changeRounds = (newRounds) => ({
    type: "changeRounds",
    payload: newRounds
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

export const initializer = () => ({
    rounds: 3,
    count: 1,
    gameState: "start",
    time: null,
    memory: [],
    storage: {}
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
    gameState: newGameState
});

const setTime = (state) => ({
    ...state,
    time: Date.now()
});

const updateMemory = (state, memoryObject) => ({
    ...state,
    memory: state.memory.concat([{...memoryObject}])
});

const clearMemory = (state) => ({
    ...state,
    memory: []
});

const updateStorage = (state, newArray) => {
    count++;
    const key = `game${count}`;
    console.log(state.storage);
    return {
    ...state,
    storage: {
        ...state.storage,
        [key]: newArray
    }
    };
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "changeRounds":
            return setRounds(state, action.payload);
        case "changeCount":
            return setCount(state, action.payload);
        case "changeGameState":
            return setGameState(state, action.payload);
        case "startTime":
            return setTime(state);
        case "changeMemory": 
            return updateMemory(state, action.payload);
        case "changeStorage":
            return updateStorage(state, action.payload);
        case "resetMemory":
            return clearMemory(state);
        default:
            throw new Error("Invalid App reducer Usage");
    }
};