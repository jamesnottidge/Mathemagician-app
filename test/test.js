const assert = require('chai').assert;
const jsdom = require('global-jsdom/register');
import {render, screen} from '@testing-library/react';
import { App } from '../src/App';
import { History } from '../src/components/History';
import { Gameplay } from '../src/screens/Gameplay';
import { Gameover } from '../src/screens/Gameover';
import { GameStart } from '../src/screens/GameStart';


describe('App', () => {
    it('renders App component', () => {
        render(<App />);

        screen.debug();
    });
});

describe('History', () => {
    it('renders History component', () => {
        render(<History />);

        screen.debug();
    });
});

describe('Gameplay', () => {
    it('renders Gameplay screen', () => {
        render(<Gameplay />);

        screen.debug();
    });
});

describe('GameStart', () => {
    it('renders Gamestart screen', () => {
        render(<GameStart />);

        screen.debug();
    });
});


describe('Gameover', () => {
    it('renders Gameover screen', () => {
        render(<Gameover />);

        screen.debug();
    });
});

