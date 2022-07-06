import { reducer, toggleRequest } from "../src/logicContainers/gamePlayReducer";
import { initializer } from "../src/logicContainers/gamePlayReducer";
const setSign = () => initializer();
const setFirstNum = jest.fn();
const setSecondNum = jest.fn();
const setSkipuse = jest.fn();
const createGame = jest.fn();


describe('gamePlay reducer testing...', () => {
    it( 'returns a function based on action.type', () => {
        expect(reducer(initializer(), {type: "changeSign", payload: null})).toEqual(initializer());
    });

    it( 'returns a function based on action.type', () => {
        expect(reducer(initializer(), {type: "changeFirstNum", payload: null})).toEqual(initializer());
    });

    it( 'returns a function based on action.type', () => {
        expect(reducer(initializer(), {type: "changeSecondNum", payload: null})).toEqual(initializer());
    });

    it( 'returns a function based on action.type', () => {
        expect(reducer(initializer(), {type: "changeSkipUse", payload: 0})).toEqual(initializer());
    });
}

);