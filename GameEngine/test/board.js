const assert = require('assert');
import { Board } from '../src/Board';

describe('Board', () => {
    it('should be empty', () => {
        const board = new Board();
        assert(board.cells.every(row => row.every(cell => cell === '')));
    })
})