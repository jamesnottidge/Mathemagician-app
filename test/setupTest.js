import { expect } from "chai";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
  });
  
  
import { createGame, answerGame } from "../src/ServerAPI.js";

it("returns a game", async () => {
    fetch.mockResponseOnce(JSON.stringify({ 
        id: 'bb1bb040-44d2-4705-810c-e42fb68daf06',
        type: 'mathemagician',
        status: 'waiting_for_move',
        nextExpression: { lhs: 2, rhs: 11, operator: '*', correctAnswerLength: 2 },
        skipsRemaining: 0 
    }));

    const response = await createGame("mathemag", 5);
    expect(response.type).to.equal("mathemagician");

} );


it("answers a game", async () => {
    fetch.mockResponseOnce(JSON.stringify({
        move: { timeSpentMillis: 5310, correct: true, skipped: false },
        game: {
          id: '6435a631-cb13-4583-a295-f1da5e999c24',
          type: 'mathemagician',
          status: 'waiting_for_move',
          nextExpression: { lhs: 0, rhs: 15, operator: '*', correctAnswerLength: 1 },
          skipsRemaining: 0
        }
      }));

    const response = await answerGame(2, 20);
    expect(response.game.status).to.equal("waiting_for_move");

} );
