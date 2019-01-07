const BOARD_SIZE = 5;

export class Board {
    constructor() {
        this.SIZE = BOARD_SIZE;
        this.cells = new Array(BOARD_SIZE);
        for (let i = 0; i < BOARD_SIZE; i++)
        {
            this.cells[i] = new Array(BOARD_SIZE);
            this.cells[i].fill('');
        }
    }
}