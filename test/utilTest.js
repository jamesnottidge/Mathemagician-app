import { expect } from "chai";
import { evaluate } from "../src/utils/signs";

describe('evaluate', () => {
    it( 'Evaluates some things', () => {
        expect(evaluate(3, 5, "+")).to.equal(8);
        expect(evaluate(3, 5, "-")).to.equal(-2);
        expect(evaluate(3, 5, "*")).to.equal(15);
        expect(evaluate(10, 5, "/")).to.equal(2);
    }
    );
} );