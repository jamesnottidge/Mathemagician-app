import {Display} from "./display";
import {sum} from "./sum";

export const gamePlay = (fly) => {
    const valA = Math.floor(Math.random() * 10);
    const valB = Math.floor(Math.random() * 10);
    Display.create(valA, valB, fly);
    return sum(valA, valB);
};