
export class Board {
    constructor() {
        this.SIZE = Board.BOARD_SIZE;
        this.cells = new Array(Board.BOARD_SIZE);
        for (let i = 0; i < Board.BOARD_SIZE; i++)
        {
            this.cells[i] = new Array(Board.BOARD_SIZE);
            this.cells[i].fill('');
        }
    }
}

Board.BOARD_SIZE = 5;