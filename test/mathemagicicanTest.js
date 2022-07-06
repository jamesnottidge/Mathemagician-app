import React from "react";
import { render, cleanup,waitFor, getByText } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import { createServer } from "../src/FakeServerAPI";
import { ServerContext } from "../src/ServerContext";
import { App} from "../src/App"; 
// import fetch from "node-fetch";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

describe('play the Game', () => {
//   const scope = () => nock("http://localhost:8081").persist().post("/games").reply(201, fakeGameObject);


    afterEach(cleanup);

    describe('when', () => {
       
        it('user types a round', async () => {
            fetch.mockResponseOnce(JSON.stringify({ 
                id: 'bb1bb040-44d2-4705-810c-e42fb68daf06',
                type: 'mathemagician',
                status: 'waiting_for_move',
                nextExpression: { lhs: 2, rhs: 11, operator: '*', correctAnswerLength: 2 },
                skipsRemaining: 0 
            }));
            const user = userEvent.setup();
            const { getByRole, getByText, queryByRole } = render(<App />);
            await user.clear(getByRole('spinbutton'));
            expect(getByRole('spinbutton')).toHaveValue(null);
            await user.type(getByRole('spinbutton'), '4');
            expect(getByRole('spinbutton')).toHaveValue(4);
            await user.click(getByRole('button',{name: "Start"}));
            expect(getByText('2 * 11')).toBeInTheDocument();
            fetch.resetMocks();
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
            await user.type(getByRole('spinbutton'), '45');
            expect(getByText('0 * 15')).toBeInTheDocument();
            fetch.resetMocks();
            fetch.mockResponseOnce(JSON.stringify({
                move: { timeSpentMillis: 5310, correct: true, skipped: false },
                game: {
                  id: '6435a631-cb13-4583-a295-f1da5e999c24',
                  type: 'mathemagician',
                  status: 'waiting_for_move',
                  nextExpression: null,
                  skipsRemaining: 0
                }
            }));
            await user.type(getByRole('spinbutton'), '45');
            expect(getByRole('button', {name: "Play again?"})).toBeInTheDocument();
            fetch.resetMocks();
            fetch.mockResponseOnce(JSON.stringify({ 
                id: 'bb1bb040-44d2-4705-810c-e42fb68daf06',
                type: 'mathemagician',
                status: 'waiting_for_move',
                nextExpression: { lhs: 2, rhs: 11, operator: '*', correctAnswerLength: 2 },
                skipsRemaining: 1 
            }));
            await user.clear(getByRole('spinbutton'));
            expect(getByRole('spinbutton')).toHaveValue(null);
            await user.type(getByRole('spinbutton'), '4');
            expect(getByRole('spinbutton')).toHaveValue(4);
            await user.click(getByRole('button',{name: "Play again?"}));
            expect(getByText('2 * 11')).toBeInTheDocument();
            fetch.resetMocks();
            fetch.mockResponseOnce(JSON.stringify({
                move: { timeSpentMillis: 5310, correct: true, skipped: false },
                game: {
                  id: '6435a631-cb13-4583-a295-f1da5e999c24',
                  type: 'mathemagician',
                  status: 'waiting_for_move',
                  nextExpression: { lhs: 2, rhs: 11, operator: '*', correctAnswerLength: 2 },
                  skipsRemaining: 0
                }
            }));
            await user.click(getByRole('button',{name: "Skip"}));
            expect(queryByRole('button',{name: "Skip"})).not.toBeInTheDocument();
            fetch.resetMocks();
            fetch.mockResponseOnce(JSON.stringify({
                move: { timeSpentMillis: 5310, correct: true, skipped: false },
                game: {
                id: '6435a631-cb13-4583-a295-f1da5e999c24',
                type: 'mathemagician',
                status: 'waiting_for_move',
                nextExpression: null,
                skipsRemaining: 0
                }
            }));
            await user.type(getByRole('spinbutton'), '45');
            expect(getByRole('button', {name: "Play again?"})).toBeInTheDocument();
    });
    });
});