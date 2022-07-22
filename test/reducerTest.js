import { reducer, toggleRequest , initializer } from "../src/logicContainers/gamePlayReducer";
import {reducer as appReducer, initializer as appInitializer} from "../src/logicContainers/appReducer";

describe('gamePlay reducer testing...', () => {
   const state = initializer();
    it( 'returns a function or an object based on action.type', () => {
        expect(reducer(initializer(), {type: "changeSign", payload: null})).toEqual(initializer());
    });

    it( 'returns a function or an object based on action.type', () => {
        expect(reducer(initializer(), {type: "changeFirstNum", payload: null})).toEqual(initializer());
    });

    it( 'returns a function or an object based on action.type', () => {
        expect(reducer(initializer(), {type: "changeSecondNum", payload: null})).toEqual(initializer());
    });

    it( 'returns a function or an object based on action.type', () => {
        expect(reducer(initializer(), {type: "changeSkipUse", payload: 0})).toEqual(initializer());
    });

    it( 'returns a function or an object based on action.type', () => {
        expect(reducer(state, {type: "MESSAGE_RECEIVED", payload: {eventName: 'online-players', payload: "James"}})).
        toEqual({...state, data: "James"});
    });
    it( 'returns a function or an object based on action.type', () => {
        expect(reducer(state, {type: "MESSAGE_RECEIVED", payload: {eventName: 'connection:accepted', payload: {playerId: "1"}}})).
        toEqual({...state, playerId: "1"});
    });
    it( 'returns a function or an object based on action.type', () => {
        expect(() => {
            reducer(initializer(), {type: "wrongTypelol", payload: 0});
        }).toThrowError(new Error("Invalid gameplay reducer usage"));
    });
    it( 'returns a function or an object based on action.type', () => {
        expect(reducer(state, { type: "CONNECTED", payload: null })).
        toEqual({...state, connected: true, connecting: false});
    });
    it( 'returns a function or an object based on action.type', () => {
        expect(reducer(state, { type: "DISCONNECTED", payload: null })).
        toEqual({...state, connected: false, connecting: false, connectionError: null});
    });
    

});

describe('app reducer testing...', () => {
    const state = appInitializer();

    it( 'returns a function or an object based on action.type', () => {
        expect(appReducer(appInitializer(), {type: "changeName", payload: "James"})).toEqual({...state, name: "James"});
    });

    it( 'returns a function or an object based on action.type', () => {
        expect(() => {
            appReducer(appInitializer(), {type: "wrongTypelol", payload: 0});
        }).toThrowError(new Error("Invalid App reducer Usage"));
    });

});

