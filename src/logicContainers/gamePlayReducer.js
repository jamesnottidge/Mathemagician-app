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

export const initializer = () => ({
    playerId: null,
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

const setRequestState = (state, requestState) => {
    // console.log("James the flyer");
   return {...state,
    requestState: requestState};
};

const createGame = (state, gameObject) => ({
    ...state,
    id: gameObject.id,
    sign: gameObject.nextExpression.operator,
    firstNum: gameObject.nextExpression.lhs,
    secondNum: gameObject.nextExpression.rhs,
    skipUse: gameObject.skipsRemaining,
    CAL: gameObject.nextExpression.correctAnswerLength
});
const answerGame = (state, gameObject) => ({
    ...state,
    firstNum: gameObject.game.nextExpression.lhs,
    secondNum: gameObject.game.nextExpression.rhs,
    sign: gameObject.game.nextExpression.operator,
    skipUse: gameObject.game.skipsRemaining,
    CAL: gameObject.game.nextExpression.correctAnswerLength
});

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

export const reducer = (state, action) => {
    switch (action.type) {
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
            throw new Error("Invalid gameplay reducer usage");
    }
};
