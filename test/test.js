// const assert = require('chai').assert;
// const jsdom = require('global-jsdom/register');
import {render, screen} from '@testing-library/react';
import { App } from '../src/App';
import { History } from '../src/components/History';
import { Gameplay } from '../src/screens/Gameplay';
import { Gameover } from '../src/screens/Gameover';
import { GameStart } from '../src/screens/GameStart';
import { initializer } from '../src/logicContainers/appReducer';
import { createServer } from '../src/FakeServerAPI';
import { ServerContext } from '../src/ServerContext';

describe('App', () => {
    it('renders App component', () => {
        render(<App />);

        // screen.debug();
    });
});

describe('History', () => {
    it('renders History component', () => {
        render(<History />);

        // screen.debug();
    });
});

describe('Gameplay', () => {
    it('renders Gameplay screen', () => {
        render( 
        <ServerContext.Provider value={createServer()}>
            <Gameplay state={initializer()} setCount={jest.fn()} setGameState={jest.fn()} setStorage={jest.fn()} setMemory={jest.fn()}/>
        </ServerContext.Provider>
        );

       // screen.debug();
    });
});

describe('GameStart', () => {
    it('renders Gamestart screen', () => {
        render(<GameStart state={initializer()}/>);

        // screen.debug();
    });
});


describe('Gameover', () => {
    it('renders Gameover screen', () => {
        render(<Gameover state={initializer()} setCount={jest.fn()} setGameState={jest.fn()}
         setStorage={jest.fn()} clearMemory={jest.fn()} setTime={jest.fn()} />);

       // screen.debug();
    });
});

