import {Piece} from "./Piece";

const NB_BACKPIECES = 20;

export class Player {
    constructor(color)
    {
        this.backpieces = NB_BACKPIECES;
        this.color = color;
        this.score = 0;
    }
}
