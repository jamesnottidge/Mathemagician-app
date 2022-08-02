/* eslint-disable prefer-const */
let lastId = 0;

let errorOnActions = null;
const maybeError = (successReturnValue) =>
    errorOnActions ? Promise.reject(errorOnActions) : Promise.resolve(successReturnValue);

const createGame = () => {
    const returnValue = { 
        id: lastId.toString,
        type: 'mathemagician',
        status: 'waiting_for_move',
        nextExpression: { lhs: 2, rhs: 11, operator: '*', correctAnswerLength: 2 },
        skipsRemaining: 0 
    };
    lastId++;
    return maybeError(returnValue);
};

// const answerGame = () => {
//     const returnValue = {
//         move: { timeSpentMillis: 5310, correct: true, skipped: false },
//         game: {
//           id: lastId.toString,
//           type: 'mathemagician',
//           status: 'waiting_for_move',
//           nextExpression: { lhs: 0, rhs: 15, operator: '*', correctAnswerLength: 1 },
//           skipsRemaining: 0
//         }
//     };
//     return maybeError(returnValue);
// };

export const createServer = () => {
    return {
        createGame,
        // answerGame
    };
};