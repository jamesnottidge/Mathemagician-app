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

export const initializer = () => ({
    id: null,
    sign: null,
    firstNum: null,
    secondNum: null,
    skipUse: 0,
    CAL: 0,
    requestState: {
        inFlight: false,
        error: null
    }
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
        default:
            throw new Error("Invalid gameplay reducer usage");
    }
};
